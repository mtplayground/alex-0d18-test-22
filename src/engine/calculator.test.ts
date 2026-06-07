import { describe, expect, it } from 'vitest';
import {
  calculatorReducer,
  clearAll,
  createInitialCalculatorState,
  type CalculatorAction,
  type CalculatorState,
} from './index';

function runActions(...actions: CalculatorAction[]): CalculatorState {
  return actions.reduce(calculatorReducer, createInitialCalculatorState());
}

type DigitAction = Extract<CalculatorAction, { type: 'digit' }>;

function digit(digit: DigitAction['digit']) {
  return { type: 'digit', digit } as const;
}

describe('calculator engine entry model', () => {
  it('accumulates digits and replaces a leading zero', () => {
    const state = runActions(digit('0'), digit('7'), digit('5'));

    expect(state.currentOperand).toBe('75');
    expect(state.accumulatedValue).toBeNull();
    expect(state.pendingOperation).toBeNull();
    expect(state.error).toBeNull();
  });

  it('keeps one decimal point while preserving decimal entry text', () => {
    const state = runActions(
      digit('1'),
      { type: 'decimal' },
      digit('2'),
      { type: 'decimal' },
      digit('3'),
    );

    expect(state.currentOperand).toBe('1.23');
  });

  it('starts decimal entry from zero', () => {
    const state = runActions({ type: 'decimal' }, digit('5'));

    expect(state.currentOperand).toBe('0.5');
  });

  it('toggles the sign of the current operand', () => {
    const negative = runActions(digit('4'), { type: 'toggle-sign' });
    const positive = calculatorReducer(negative, { type: 'toggle-sign' });

    expect(negative.currentOperand).toBe('-4');
    expect(positive.currentOperand).toBe('4');
  });
});

describe('calculator engine arithmetic', () => {
  it.each([
    ['add', '12'],
    ['subtract', '4'],
    ['multiply', '32'],
    ['divide', '2'],
  ] as const)('evaluates %s', (operation, expected) => {
    const state = runActions(
      digit('8'),
      { type: 'operation', operation },
      digit('4'),
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe(expected);
    expect(state.accumulatedValue).toBeNull();
    expect(state.pendingOperation).toBeNull();
    expect(state.shouldReplaceCurrentOperand).toBe(true);
    expect(state.error).toBeNull();
  });

  it('evaluates chained operations left to right', () => {
    const state = runActions(
      digit('2'),
      { type: 'operation', operation: 'add' },
      digit('3'),
      { type: 'operation', operation: 'multiply' },
      digit('4'),
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe('20');
  });

  it('lets a later operation replace a pending operation', () => {
    const state = runActions(
      digit('9'),
      { type: 'operation', operation: 'add' },
      { type: 'operation', operation: 'subtract' },
      digit('4'),
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe('5');
  });

  it('stores division by zero as an error state without throwing', () => {
    const state = runActions(
      digit('8'),
      { type: 'operation', operation: 'divide' },
      digit('0'),
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe('Error');
    expect(state.error).toBe('division-by-zero');
    expect(state.accumulatedValue).toBeNull();
    expect(state.pendingOperation).toBeNull();
    expect(state.shouldReplaceCurrentOperand).toBe(true);
  });

  it('starts a new entry after an error when a digit is entered', () => {
    const errorState = runActions(
      digit('8'),
      { type: 'operation', operation: 'divide' },
      digit('0'),
      { type: 'evaluate' },
    );

    const recovered = calculatorReducer(errorState, digit('3'));

    expect(recovered.currentOperand).toBe('3');
    expect(recovered.error).toBeNull();
    expect(recovered.accumulatedValue).toBeNull();
    expect(recovered.pendingOperation).toBeNull();
  });
});

describe('calculator engine percentage and clear behavior', () => {
  it('converts the current entry to a percentage', () => {
    const state = runActions(digit('5'), digit('0'), { type: 'percentage' });

    expect(state.currentOperand).toBe('0.5');
    expect(state.shouldReplaceCurrentOperand).toBe(true);
  });

  it('applies percentage to the current entry during a pending operation', () => {
    const state = runActions(
      digit('2'),
      digit('0'),
      digit('0'),
      { type: 'operation', operation: 'add' },
      digit('1'),
      digit('0'),
      { type: 'percentage' },
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe('200.1');
  });

  it('clears only the current entry with C', () => {
    const state = runActions(
      digit('1'),
      digit('2'),
      { type: 'operation', operation: 'add' },
      digit('9'),
      { type: 'clear-entry' },
      digit('3'),
      { type: 'evaluate' },
    );

    expect(state.currentOperand).toBe('15');
  });

  it('clears all calculator state with AC', () => {
    const dirtyState = runActions(
      digit('1'),
      digit('2'),
      { type: 'operation', operation: 'multiply' },
      digit('3'),
    );

    expect(calculatorReducer(dirtyState, { type: 'clear-all' })).toEqual(
      clearAll(),
    );
  });
});
