# Custom Tailwind Shadcn Themes

Shared Tailwind v4 and shadcn-compatible theme tokens for my apps.

## Repo layout

```txt
packages/
  themes/        # published theme package
apps/
  theme-lab/     # SPA playground for building and validating themes
```

Only `packages/themes` is intended to be consumed by other apps. The theme lab is a private workspace app, so its future dependencies do not bloat consuming applications.

## Install from GitHub

The package lives in `packages/themes`, but pnpm/npm git dependencies cannot
target a subdirectory of a repo. To work around that, CI mirrors the built
package to the **`pkg` branch** (where `package.json` sits at the root), and
consumers install from there:

```sh
pnpm add github:iPior/custom-tailwind-shadcn-themes#pkg
```

In `package.json` this resolves to:

```jsonc
"@ipior/custom-tailwind-shadcn-themes": "github:iPior/custom-tailwind-shadcn-themes#pkg"
```

The `pkg` branch is regenerated automatically by
[`.github/workflows/publish-pkg-branch.yml`](.github/workflows/publish-pkg-branch.yml)
on every push to `main` that touches `packages/themes`. Because lockfiles pin
the resolved commit, run `pnpm update @ipior/custom-tailwind-shadcn-themes` in a
consumer to pull the latest.

> **Heads up:** Do **not** use `#main` or a `#path:` fragment — `#main` resolves
> to the workspace root (which has no package entry) and the `#path:` syntax is
> not supported by pnpm. Once this package is published to npm, switch consumers
> to a version range (`"^0.1.0"`) and the `pkg` branch can be retired.

## Usage

Import the theme CSS after Tailwind in your app stylesheet:

```css
@import "tailwindcss";
@import "@ipior/custom-tailwind-shadcn-themes/styles.css";
```

Wrap your React app with the provider:

```tsx
import { ThemeProvider } from '@ipior/custom-tailwind-shadcn-themes';

export function App() {
  return (
    <ThemeProvider>
      {/* app */}
    </ThemeProvider>
  );
}
```

Use the theme hook when you need to render a theme picker:

```tsx
import { useTheme } from '@ipior/custom-tailwind-shadcn-themes';

export function ThemePicker() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)}>
      {themes.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
```

Themes are applied with `data-theme` on the document root.

## Development

```sh
pnpm install
pnpm build
pnpm typecheck
```

The root scripts target the published theme package. The private lab can be developed with:

```sh
pnpm dev:theme-lab
```
