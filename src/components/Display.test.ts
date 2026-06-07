import { describe, expect, it } from 'vitest';
import {
  formatDisplayValue,
  getDisplayTextSizeClass,
  getOperationSymbol,
} from './displayFormat';

describe('display formatting', () => {
  it('groups standard numeric values without dropping decimal entry text', () => {
    expect(formatDisplayValue('1234567.')).toBe('1,234,567.');
    expect(formatDisplayValue('-1234567.50')).toBe('-1,234,567.50');
  });

  it('uses compact notation for values that would overflow the display', () => {
    expect(formatDisplayValue('12345678901234567890')).toBe('1.23456789e+19');
  });

  it('renders calculator error states as readable display text', () => {
    expect(formatDisplayValue('Error', 'division-by-zero')).toBe(
      'Cannot divide by zero',
    );
    expect(formatDisplayValue('Error', 'invalid-number')).toBe('Invalid input');
  });

  it('maps operations to display symbols', () => {
    expect(getOperationSymbol('add')).toBe('+');
    expect(getOperationSymbol('subtract')).toBe('-');
    expect(getOperationSymbol('multiply')).toBe('×');
    expect(getOperationSymbol('divide')).toBe('÷');
  });

  it('returns smaller text classes for long values', () => {
    expect(getDisplayTextSizeClass('123456789012345')).toContain('text-3xl');
    expect(getDisplayTextSizeClass('Cannot divide by zero')).toContain(
      'text-3xl',
    );
  });
});
