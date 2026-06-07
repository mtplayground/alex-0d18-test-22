import type { CalculatorAction } from '../engine';
import { keypadButtons, type KeypadButtonVariant } from './keypadConfig';

export interface KeypadProps {
  onAction: (action: CalculatorAction) => void;
  disabled?: boolean;
  className?: string;
}

const BUTTON_BASE_CLASS =
  'flex aspect-square min-h-14 items-center justify-center rounded-lg border text-xl font-semibold leading-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-16 sm:text-2xl';

const BUTTON_VARIANT_CLASSES: Record<KeypadButtonVariant, string> = {
  digit:
    'border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100',
  operation:
    'border-amber-500 bg-amber-500 text-white shadow-sm hover:bg-amber-400 active:bg-amber-600',
  utility:
    'border-slate-300 bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 active:bg-slate-400',
  evaluate:
    'border-emerald-600 bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700',
};

export function Keypad({ onAction, disabled = false, className }: KeypadProps) {
  return (
    <div
      className={joinClassNames('grid grid-cols-4 gap-2 sm:gap-3', className)}
      role="group"
      aria-label="Calculator keypad"
    >
      {keypadButtons.map((button) => (
        <button
          key={button.id}
          type="button"
          className={joinClassNames(
            BUTTON_BASE_CLASS,
            BUTTON_VARIANT_CLASSES[button.variant],
          )}
          aria-label={button.ariaLabel}
          data-keypad-button={button.id}
          disabled={disabled}
          onClick={() => onAction(button.action)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(' ');
}
