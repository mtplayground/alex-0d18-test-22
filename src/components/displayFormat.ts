import type { CalculatorError, Operation } from '../engine';

const MAX_STANDARD_DISPLAY_LENGTH = 18;
const COMPACT_SIGNIFICANT_DIGITS = 8;

const ERROR_MESSAGES: Record<CalculatorError, string> = {
  'division-by-zero': 'Cannot divide by zero',
  'invalid-number': 'Invalid input',
};

const OPERATION_SYMBOLS: Record<Operation, string> = {
  add: '+',
  subtract: '-',
  multiply: '×',
  divide: '÷',
};

export function getOperationSymbol(operation: Operation): string {
  return OPERATION_SYMBOLS[operation];
}

export function formatDisplayValue(
  value: string,
  error: CalculatorError | null = null,
): string {
  if (error) {
    return ERROR_MESSAGES[error];
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return '0';
  }

  const parsedValue = Number(trimmedValue);

  if (!Number.isFinite(parsedValue)) {
    return trimmedValue;
  }

  if (usesScientificNotation(trimmedValue)) {
    return formatCompactValue(parsedValue);
  }

  const formattedValue = groupStandardNumericValue(trimmedValue);

  if (formattedValue.length > MAX_STANDARD_DISPLAY_LENGTH) {
    return formatCompactValue(parsedValue);
  }

  return formattedValue;
}

export function getDisplayTextSizeClass(displayValue: string): string {
  if (displayValue.length > 22) {
    return 'text-xl sm:text-2xl';
  }

  if (displayValue.length > 14) {
    return 'text-3xl sm:text-4xl';
  }

  return 'text-5xl';
}

function usesScientificNotation(value: string): boolean {
  return value.toLowerCase().includes('e');
}

function groupStandardNumericValue(value: string): string {
  const sign = value.startsWith('-') ? '-' : '';
  const unsignedValue = sign ? value.slice(1) : value;
  const [integerPart = '0', fractionPart] = unsignedValue.split('.');
  const normalizedInteger = integerPart.replace(/^0+(?=\d)/, '') || '0';
  const groupedInteger = normalizedInteger.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  if (fractionPart === undefined) {
    return `${sign}${groupedInteger}`;
  }

  return `${sign}${groupedInteger}.${fractionPart}`;
}

function formatCompactValue(value: number): string {
  if (Object.is(value, -0) || value === 0) {
    return '0';
  }

  return value.toExponential(COMPACT_SIGNIFICANT_DIGITS).replace(/\.?0+e/, 'e');
}
