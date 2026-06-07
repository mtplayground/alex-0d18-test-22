# alex-0d18-test-22

React SPA scaffolded with Vite and TypeScript.

## Scripts

- `npm run dev` starts the development server on `0.0.0.0:8080`.
- `npm run build` type-checks the app and writes the static build to `dist/`.
- `npm run lint` checks TypeScript and React code with ESLint.
- `npm run format` formats the project with Prettier.
- `npm run format:check` verifies Prettier formatting.
- `npm run preview` serves the static build locally on `0.0.0.0:8080`.

## Production Static Build

Run `npm run build` to type-check the app and write static files to `dist/`.
The Vite build uses relative asset paths, so the `dist/` directory can be served
from a domain root or from a subdirectory.

To serve the production build locally:

```bash
npm run build
npm run preview
```

You can also serve the directory with any static file server:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```
