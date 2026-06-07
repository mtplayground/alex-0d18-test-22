import type { CalculatorAction } from '../engine';

export type KeypadButtonVariant =
  | 'digit'
  | 'operation'
  | 'utility'
  | 'evaluate';

export interface KeypadButtonDefinition {
  id: string;
  label: string;
  ariaLabel: string;
  action: CalculatorAction;
  variant: KeypadButtonVariant;
}

export const keypadButtons = [
  {
    id: 'clear-all',
    label: 'AC',
    ariaLabel: 'Clear all',
    action: { type: 'clear-all' },
    variant: 'utility',
  },
  {
    id: 'clear-entry',
    label: 'C',
    ariaLabel: 'Clear current entry',
    action: { type: 'clear-entry' },
    variant: 'utility',
  },
  {
    id: 'toggle-sign',
    label: '±',
    ariaLabel: 'Toggle sign',
    action: { type: 'toggle-sign' },
    variant: 'utility',
  },
  {
    id: 'percentage',
    label: '%',
    ariaLabel: 'Percentage',
    action: { type: 'percentage' },
    variant: 'utility',
  },
  {
    id: 'digit-7',
    label: '7',
    ariaLabel: 'Seven',
    action: { type: 'digit', digit: '7' },
    variant: 'digit',
  },
  {
    id: 'digit-8',
    label: '8',
    ariaLabel: 'Eight',
    action: { type: 'digit', digit: '8' },
    variant: 'digit',
  },
  {
    id: 'digit-9',
    label: '9',
    ariaLabel: 'Nine',
    action: { type: 'digit', digit: '9' },
    variant: 'digit',
  },
  {
    id: 'divide',
    label: '÷',
    ariaLabel: 'Divide',
    action: { type: 'operation', operation: 'divide' },
    variant: 'operation',
  },
  {
    id: 'digit-4',
    label: '4',
    ariaLabel: 'Four',
    action: { type: 'digit', digit: '4' },
    variant: 'digit',
  },
  {
    id: 'digit-5',
    label: '5',
    ariaLabel: 'Five',
    action: { type: 'digit', digit: '5' },
    variant: 'digit',
  },
  {
    id: 'digit-6',
    label: '6',
    ariaLabel: 'Six',
    action: { type: 'digit', digit: '6' },
    variant: 'digit',
  },
  {
    id: 'multiply',
    label: '×',
    ariaLabel: 'Multiply',
    action: { type: 'operation', operation: 'multiply' },
    variant: 'operation',
  },
  {
    id: 'digit-1',
    label: '1',
    ariaLabel: 'One',
    action: { type: 'digit', digit: '1' },
    variant: 'digit',
  },
  {
    id: 'digit-2',
    label: '2',
    ariaLabel: 'Two',
    action: { type: 'digit', digit: '2' },
    variant: 'digit',
  },
  {
    id: 'digit-3',
    label: '3',
    ariaLabel: 'Three',
    action: { type: 'digit', digit: '3' },
    variant: 'digit',
  },
  {
    id: 'subtract',
    label: '-',
    ariaLabel: 'Subtract',
    action: { type: 'operation', operation: 'subtract' },
    variant: 'operation',
  },
  {
    id: 'digit-0',
    label: '0',
    ariaLabel: 'Zero',
    action: { type: 'digit', digit: '0' },
    variant: 'digit',
  },
  {
    id: 'decimal',
    label: '.',
    ariaLabel: 'Decimal point',
    action: { type: 'decimal' },
    variant: 'digit',
  },
  {
    id: 'evaluate',
    label: '=',
    ariaLabel: 'Equals',
    action: { type: 'evaluate' },
    variant: 'evaluate',
  },
  {
    id: 'add',
    label: '+',
    ariaLabel: 'Add',
    action: { type: 'operation', operation: 'add' },
    variant: 'operation',
  },
] as const satisfies readonly KeypadButtonDefinition[];
