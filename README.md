# Custom Tailwind Shadcn Themes

Shared Tailwind v4 and shadcn-compatible theme tokens for Pior apps.

## Install from GitHub

```sh
pnpm add github:iPior/custom-tailwind-shadcn-themes
```

For repeatable installs, prefer a tag once one exists:

```sh
pnpm add github:iPior/custom-tailwind-shadcn-themes#v0.1.0
```

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

