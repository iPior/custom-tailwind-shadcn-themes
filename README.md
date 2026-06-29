# Custom Tailwind Shadcn Themes

Shared Tailwind v4 and shadcn-compatible theme tokens for Pior apps.

## Usage

Import the theme CSS after Tailwind in your app stylesheet:

```css
@import "tailwindcss";
@import "@ipior/custom-tailwind-shadcn-themes/styles.css";
```

Import the optional effect helpers only in apps that want shared glass, mesh,
grain, motion, and accent-surface utility classes:

```css
@import "@ipior/custom-tailwind-shadcn-themes/effects.css";
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
