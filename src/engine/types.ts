export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface CalculatorState {
  currentOperand: string;
  accumulatedValue: number | null;
  pendingOperation: Operation | null;
  shouldReplaceCurrentOperand: boolean;
}

export type CalculatorAction =
  | { type: 'digit'; digit: Digit }
  | { type: 'decimal' }
  | { type: 'toggle-sign' };
