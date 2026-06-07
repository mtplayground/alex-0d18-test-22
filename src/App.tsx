import { useCallback, useEffect, useReducer } from 'react';
import { Display, Keypad } from './components';
import {
  calculatorReducer,
  createInitialCalculatorState,
  type CalculatorAction,
} from './engine';
import { getKeyboardAction } from './keyboard';

export default function App() {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    undefined,
    createInitialCalculatorState,
  );

  const handleAction = useCallback((action: CalculatorAction) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const action = getKeyboardAction(event.key);

      if (!action) {
        return;
      }

      event.preventDefault();
      dispatch(action);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main
      className="grid min-h-screen place-items-center bg-slate-100 px-4 py-8 text-slate-900"
      aria-labelledby="app-title"
    >
      <section className="w-full max-w-sm">
        <header className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Calculator
          </p>
          <h1 id="app-title" className="mt-1 text-2xl font-bold leading-tight">
            alex-0d18-test-22
          </h1>
        </header>
        <div className="rounded-lg border border-slate-200 bg-slate-100 p-3 shadow-2xl shadow-slate-950/10">
          <Display
            value={state.currentOperand}
            error={state.error}
            accumulatedValue={state.accumulatedValue}
            pendingOperation={state.pendingOperation}
          />
          <Keypad className="mt-3" onAction={handleAction} />
        </div>
      </section>
    </main>
  );
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}
