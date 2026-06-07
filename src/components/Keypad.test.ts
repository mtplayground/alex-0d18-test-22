import { describe, expect, it } from 'vitest';
import { keypadButtons } from './keypadConfig';

describe('keypad button configuration', () => {
  it('includes all digit buttons', () => {
    const digits = keypadButtons.flatMap((button) =>
      button.action.type === 'digit' ? [button.action.digit] : [],
    );

    expect(digits.sort()).toEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ]);
  });

  it('includes all arithmetic operation buttons', () => {
    const operations = keypadButtons.flatMap((button) =>
      button.action.type === 'operation' ? [button.action.operation] : [],
    );

    expect(operations.sort()).toEqual([
      'add',
      'divide',
      'multiply',
      'subtract',
    ]);
  });

  it('includes decimal, sign, percentage, clear, and evaluate controls', () => {
    const actionTypes = keypadButtons.map((button) => button.action.type);

    expect(actionTypes).toContain('decimal');
    expect(actionTypes).toContain('toggle-sign');
    expect(actionTypes).toContain('percentage');
    expect(actionTypes).toContain('clear-entry');
    expect(actionTypes).toContain('clear-all');
    expect(actionTypes).toContain('evaluate');
  });

  it('keeps the responsive grid at five complete rows', () => {
    expect(keypadButtons).toHaveLength(20);
  });
});
