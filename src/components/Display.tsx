import type { CalculatorError, Operation } from '../engine';
import {
  formatDisplayValue,
  getDisplayTextSizeClass,
  getOperationSymbol,
} from './displayFormat';

export interface DisplayProps {
  value: string;
  error?: CalculatorError | null;
  accumulatedValue?: number | null;
  pendingOperation?: Operation | null;
  label?: string;
  className?: string;
}

export function Display({
  value,
  error = null,
  accumulatedValue = null,
  pendingOperation = null,
  label = 'Calculator display',
  className,
}: DisplayProps) {
  const displayValue = formatDisplayValue(value, error);
  const textSizeClass = getDisplayTextSizeClass(displayValue);
  const pendingLabel = getPendingLabel(accumulatedValue, pendingOperation);

  return (
    <section
      className={joinClassNames(
        'rounded-lg bg-slate-950 p-4 text-right text-white shadow-inner shadow-black/30',
        className,
      )}
      aria-label={label}
    >
      <p className="min-h-5 truncate text-xs font-semibold uppercase tracking-wider text-slate-400">
        {error ? 'Error' : pendingLabel}
      </p>
      <output
        className={joinClassNames(
          'block min-h-16 overflow-hidden text-ellipsis whitespace-nowrap font-semibold leading-tight tabular-nums tracking-normal',
          textSizeClass,
        )}
        aria-live="polite"
        title={displayValue}
      >
        {displayValue}
      </output>
    </section>
  );
}

function getPendingLabel(
  accumulatedValue: number | null,
  pendingOperation: Operation | null,
): string {
  if (accumulatedValue === null || pendingOperation === null) {
    return 'Current value';
  }

  return `${formatDisplayValue(String(accumulatedValue))} ${getOperationSymbol(
    pendingOperation,
  )}`;
}

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(' ');
}
