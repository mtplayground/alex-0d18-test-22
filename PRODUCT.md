# alex-0d18-test-22

## What It Is

`alex-0d18-test-22` is a static React single-page calculator app built with Vite and TypeScript.

## What It Does

- Provides an on-page calculator with display and keypad controls.
- Supports digit entry, decimal entry, sign toggle, percentage, `C`, `AC`, add, subtract, multiply, divide, and equals.
- Evaluates chained operations left-to-right.
- Handles division by zero and invalid/non-finite arithmetic results as displayable error states instead of throwing.
- Supports keyboard input for digits, decimal, operations, equals, percentage, clear, clear-all, and sign toggle via `F9`.

## Architecture

- `src/App.tsx` owns calculator state with `useReducer`, wires `Display` and `Keypad`, and registers keyboard input.
- `src/engine/` contains the pure calculator state model, typed actions, reducer, and arithmetic behavior.
- `src/components/Display.tsx` renders formatted calculator output with overflow-aware sizing.
- `src/components/Keypad.tsx` renders a responsive 4-column keypad from typed button configuration.
- `src/keyboard.ts` maps browser key values to calculator actions.

## Tooling And Quality

- Styling uses Tailwind CSS through the Vite plugin.
- ESLint and Prettier are configured for linting and formatting.
- Vitest covers calculator engine behavior, display formatting, keypad configuration, and keyboard mapping.
- Playwright covers a browser E2E flow for chained calculation and divide-by-zero display.

## Build And Serving

- `npm run dev` starts Vite on `0.0.0.0:8080`.
- `npm run build` type-checks and writes the static production build to `dist/`.
- The Vite build uses relative asset paths, so `dist/` can be served from a domain root or a subdirectory.
- Vite preview is configured to allow the deployed Sprite and mctai hostnames used for this app.
- Serve locally with `npm run preview` after building, or with any static file server such as `python3 -m http.server 8080 --directory dist`.
