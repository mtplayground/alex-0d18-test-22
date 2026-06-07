import type {
  CalculatorAction,
  CalculatorError,
  CalculatorState,
  Digit,
  Operation,
} from './types';

const RESULT_PRECISION = 12;

export const initialCalculatorState: CalculatorState = {
  currentOperand: '0',
  accumulatedValue: null,
  pendingOperation: null,
  shouldReplaceCurrentOperand: false,
  error: null,
};

export function createInitialCalculatorState(): CalculatorState {
  return { ...initialCalculatorState };
}

function parseOperand(operand: string): number | null {
  const parsed = Number(operand);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatResult(result: number): string {
  if (Object.is(result, -0)) {
    return '0';
  }

  return Number(result.toPrecision(RESULT_PRECISION)).toString();
}

function withCalculationError(error: CalculatorError): CalculatorState {
  return {
    ...initialCalculatorState,
    currentOperand: 'Error',
    shouldReplaceCurrentOperand: true,
    error,
  };
}

function applyOperation(
  leftOperand: number,
  rightOperand: number,
  operation: Operation,
): number | CalculatorError {
  let result: number;

  switch (operation) {
    case 'add':
      result = leftOperand + rightOperand;
      break;
    case 'subtract':
      result = leftOperand - rightOperand;
      break;
    case 'multiply':
      result = leftOperand * rightOperand;
      break;
    case 'divide':
      if (rightOperand === 0) {
        return 'division-by-zero';
      }

      result = leftOperand / rightOperand;
      break;
  }

  return Number.isFinite(result) ? result : 'invalid-number';
}

export function inputDigit(
  state: CalculatorState,
  digit: Digit,
): CalculatorState {
  if (state.error) {
    return inputDigit(createInitialCalculatorState(), digit);
  }

  if (state.shouldReplaceCurrentOperand) {
    return {
      ...state,
      currentOperand: digit,
      shouldReplaceCurrentOperand: false,
      error: null,
    };
  }

  if (state.currentOperand === '0') {
    return {
      ...state,
      currentOperand: digit,
      error: null,
    };
  }

  if (state.currentOperand === '-0') {
    return {
      ...state,
      currentOperand: `-${digit}`,
      error: null,
    };
  }

  return {
    ...state,
    currentOperand: `${state.currentOperand}${digit}`,
    error: null,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.error) {
    return inputDecimal(createInitialCalculatorState());
  }

  if (state.shouldReplaceCurrentOperand) {
    return {
      ...state,
      currentOperand: '0.',
      shouldReplaceCurrentOperand: false,
      error: null,
    };
  }

  if (state.currentOperand.includes('.')) {
    return state;
  }

  return {
    ...state,
    currentOperand: `${state.currentOperand}.`,
    error: null,
  };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  if (state.error) {
    return toggleSign(createInitialCalculatorState());
  }

  if (state.currentOperand.startsWith('-')) {
    return {
      ...state,
      currentOperand: state.currentOperand.slice(1),
      shouldReplaceCurrentOperand: false,
      error: null,
    };
  }

  return {
    ...state,
    currentOperand: `-${state.currentOperand}`,
    shouldReplaceCurrentOperand: false,
    error: null,
  };
}

export function selectOperation(
  state: CalculatorState,
  operation: Operation,
): CalculatorState {
  if (state.error) {
    return state;
  }

  const currentValue = parseOperand(state.currentOperand);

  if (currentValue === null) {
    return withCalculationError('invalid-number');
  }

  if (state.accumulatedValue === null) {
    return {
      ...state,
      accumulatedValue: currentValue,
      pendingOperation: operation,
      shouldReplaceCurrentOperand: true,
      error: null,
    };
  }

  if (state.pendingOperation === null || state.shouldReplaceCurrentOperand) {
    return {
      ...state,
      pendingOperation: operation,
      shouldReplaceCurrentOperand: true,
      error: null,
    };
  }

  const result = applyOperation(
    state.accumulatedValue,
    currentValue,
    state.pendingOperation,
  );

  if (typeof result === 'string') {
    return withCalculationError(result);
  }

  return {
    ...state,
    currentOperand: formatResult(result),
    accumulatedValue: result,
    pendingOperation: operation,
    shouldReplaceCurrentOperand: true,
    error: null,
  };
}

export function evaluate(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }

  if (state.accumulatedValue === null || state.pendingOperation === null) {
    return {
      ...state,
      shouldReplaceCurrentOperand: true,
      error: null,
    };
  }

  const currentValue = parseOperand(state.currentOperand);

  if (currentValue === null) {
    return withCalculationError('invalid-number');
  }

  const result = applyOperation(
    state.accumulatedValue,
    currentValue,
    state.pendingOperation,
  );

  if (typeof result === 'string') {
    return withCalculationError(result);
  }

  return {
    ...state,
    currentOperand: formatResult(result),
    accumulatedValue: null,
    pendingOperation: null,
    shouldReplaceCurrentOperand: true,
    error: null,
  };
}

export function inputPercentage(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }

  const currentValue = parseOperand(state.currentOperand);

  if (currentValue === null) {
    return withCalculationError('invalid-number');
  }

  return {
    ...state,
    currentOperand: formatResult(currentValue / 100),
    shouldReplaceCurrentOperand: true,
    error: null,
  };
}

export function clearEntry(state: CalculatorState): CalculatorState {
  if (state.error) {
    return createInitialCalculatorState();
  }

  return {
    ...state,
    currentOperand: '0',
    shouldReplaceCurrentOperand: false,
    error: null,
  };
}

export function clearAll(): CalculatorState {
  return createInitialCalculatorState();
}

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'digit':
      return inputDigit(state, action.digit);
    case 'decimal':
      return inputDecimal(state);
    case 'toggle-sign':
      return toggleSign(state);
    case 'operation':
      return selectOperation(state, action.operation);
    case 'evaluate':
      return evaluate(state);
    case 'percentage':
      return inputPercentage(state);
    case 'clear-entry':
      return clearEntry(state);
    case 'clear-all':
      return clearAll();
  }
}
