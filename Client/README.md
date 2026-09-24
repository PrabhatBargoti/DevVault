# DevVault

DevVault is a developer-focused knowledge vault for storing and revisiting code snippets, commands, notes, and technical solutions.

## Tech stack

- React 19 and Vite
- Tailwind CSS
- React Router DOM
- React Helmet Async

## Getting started

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run preview` to serve it locally.

## Project structure

```text
src/
+-- Components/       Reusable UI and shared concerns (buttons, logo, SEO)
+-- Layouts/          Route-level page composition
+-- Pages/            Screen content grouped by feature
¦   +-- Homepage/     Dashboard states
¦   +-- LandingPage/  Landing-page sections
+-- hooks/            Reusable React behavior
+-- Utils/            Shared static data
+-- App.jsx           Route definitions
+-- index.css         Global styles and Tailwind entry point
+-- main.jsx          Application bootstrap
```

### Where to add code

- Add shared visual elements to `src/Components`.
- Add route composition to `src/Layouts`.
- Add screen-specific content to `src/Pages`, creating a feature folder when several files belong together.
- Add reusable React behavior to `src/hooks`. `useScrollToSection` owns the landing-page smooth-scroll behavior.
- Keep static shared arrays and constants in `src/Utils`.

This separation keeps route composition, page content, reusable UI, and reusable behavior easy to find.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page |
| `/Login`, `/Signup`, `/forgot-password` | Authentication screens |
| `/Home` | Workspace shell |
| `/Snippet`, `/Tags`, `/Categorie`, `/Setting` | Application placeholders |
| `*` | Not-found page |

## UI conventions

- Use Tailwind utility classes for styling.
- Start with mobile styles, then add `sm:`, `md:`, or `lg:` enhancements as needed.
- Prefer the shared button components for in-app actions.
- Keep pages responsive without fixed widths or fixed viewport heights that can clip content.
- Use the `SEO` component for route metadata.

## Checks

```bash
npm run lint
npm run build
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
