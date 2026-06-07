import type { CalculatorAction, CalculatorState, Digit } from './types';

export const initialCalculatorState: CalculatorState = {
  currentOperand: '0',
  accumulatedValue: null,
  pendingOperation: null,
  shouldReplaceCurrentOperand: false,
};

export function createInitialCalculatorState(): CalculatorState {
  return { ...initialCalculatorState };
}

export function inputDigit(
  state: CalculatorState,
  digit: Digit,
): CalculatorState {
  if (state.shouldReplaceCurrentOperand) {
    return {
      ...state,
      currentOperand: digit,
      shouldReplaceCurrentOperand: false,
    };
  }

  if (state.currentOperand === '0') {
    return {
      ...state,
      currentOperand: digit,
    };
  }

  if (state.currentOperand === '-0') {
    return {
      ...state,
      currentOperand: `-${digit}`,
    };
  }

  return {
    ...state,
    currentOperand: `${state.currentOperand}${digit}`,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.shouldReplaceCurrentOperand) {
    return {
      ...state,
      currentOperand: '0.',
      shouldReplaceCurrentOperand: false,
    };
  }

  if (state.currentOperand.includes('.')) {
    return state;
  }

  return {
    ...state,
    currentOperand: `${state.currentOperand}.`,
  };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  if (state.currentOperand.startsWith('-')) {
    return {
      ...state,
      currentOperand: state.currentOperand.slice(1),
      shouldReplaceCurrentOperand: false,
    };
  }

  return {
    ...state,
    currentOperand: `-${state.currentOperand}`,
    shouldReplaceCurrentOperand: false,
  };
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
  }
}
