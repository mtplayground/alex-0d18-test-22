import type { CalculatorAction, Digit } from './engine';

export function getKeyboardAction(key: string): CalculatorAction | null {
  if (isDigitKey(key)) {
    return { type: 'digit', digit: key };
  }

  switch (key) {
    case '.':
      return { type: 'decimal' };
    case '+':
      return { type: 'operation', operation: 'add' };
    case '-':
      return { type: 'operation', operation: 'subtract' };
    case '*':
    case 'x':
    case 'X':
      return { type: 'operation', operation: 'multiply' };
    case '/':
      return { type: 'operation', operation: 'divide' };
    case '=':
    case 'Enter':
      return { type: 'evaluate' };
    case '%':
      return { type: 'percentage' };
    case 'Backspace':
    case 'Delete':
      return { type: 'clear-entry' };
    case 'Escape':
      return { type: 'clear-all' };
    case 'F9':
      return { type: 'toggle-sign' };
    default:
      return null;
  }
}

function isDigitKey(key: string): key is Digit {
  return key.length === 1 && key >= '0' && key <= '9';
}
