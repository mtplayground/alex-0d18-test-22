import { describe, expect, it } from 'vitest';
import { getKeyboardAction } from './keyboard';

describe('keyboard input mapping', () => {
  it('maps digit keys to digit actions', () => {
    expect(getKeyboardAction('7')).toEqual({ type: 'digit', digit: '7' });
  });

  it('maps operation keys to operation actions', () => {
    expect(getKeyboardAction('+')).toEqual({
      type: 'operation',
      operation: 'add',
    });
    expect(getKeyboardAction('-')).toEqual({
      type: 'operation',
      operation: 'subtract',
    });
    expect(getKeyboardAction('*')).toEqual({
      type: 'operation',
      operation: 'multiply',
    });
    expect(getKeyboardAction('/')).toEqual({
      type: 'operation',
      operation: 'divide',
    });
  });

  it('maps evaluation, decimal, percentage, sign, and clear keys', () => {
    expect(getKeyboardAction('Enter')).toEqual({ type: 'evaluate' });
    expect(getKeyboardAction('=')).toEqual({ type: 'evaluate' });
    expect(getKeyboardAction('.')).toEqual({ type: 'decimal' });
    expect(getKeyboardAction('%')).toEqual({ type: 'percentage' });
    expect(getKeyboardAction('F9')).toEqual({ type: 'toggle-sign' });
    expect(getKeyboardAction('Backspace')).toEqual({ type: 'clear-entry' });
    expect(getKeyboardAction('Delete')).toEqual({ type: 'clear-entry' });
    expect(getKeyboardAction('Escape')).toEqual({ type: 'clear-all' });
  });

  it('ignores unrelated keys', () => {
    expect(getKeyboardAction('Tab')).toBeNull();
    expect(getKeyboardAction('a')).toBeNull();
  });
});
