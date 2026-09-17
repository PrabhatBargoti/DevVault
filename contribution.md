# Contribution Guide

Thanks for your interest in contributing to DevVault.

This project is still evolving, so contributions should stay simple, consistent, and aligned with the current app structure.

## Project Principles

- Keep the user experience clean and developer-focused
- Prefer consistent styling over custom one-off UI patterns
- Reuse existing components before creating new ones
- Keep changes small and easy to review
- Respect the current dark theme and purple accent system

## Before You Start

1. Fork the repository or create a branch from the latest `main` branch.
2. Make sure your local environment is working.
3. Read the current structure in `src/Pages`, `src/Components`, and `src/Layouts` so your work matches the project patterns.

## Code Style Guidelines

- Use React functional components.
- Follow the project’s existing naming conventions.
- Prefer Tailwind utility classes for styling.
- Use semantic, reusable names for new helper functions and components.
- Keep route names and page structure consistent with the existing app.
- Reuse current design elements like `Logo`, `ButtonDark`, `ButtonPurple`, and similar components before creating new button variants.

## UI and Layout Rules

- Match the existing dark visual language.
- Maintain accessibility with readable contrast and proper focus states.
- Keep layout spacing consistent with the current design system.
- Avoid introducing unnecessary dependencies or large design rewrites in small PRs.

## Route and Page Rules

- Add pages in the appropriate directory under `src/Pages`.
- Keep route names consistent with the existing app (`/Login`, `/Signup`, `/Home`, etc.).
- Add or update the `SEO` metadata when introducing a new public page.
- If a feature is incomplete, clearly mark the work as a draft or placeholder instead of shipping broken functionality.

## Pull Request Rules

- Open a focused PR for one concern at a time.
- Include a short summary of what changed and why.
- Mention any UI updates or route changes clearly.
- Ensure the project still builds successfully before submitting.

## Verification Checklist

Before opening a PR, run:

```bash
npm install
npm run build
```

If your PR changes frontend behavior, include a brief note describing the expected outcome.

## Good Contribution Examples

- Fixing a broken login page layout
- Improving spacing and responsiveness
- Reusing existing components for consistent styling
- Adding missing page metadata or navigation behavior
- Cleaning up small UI issues without redesigning the app surface

## Bad Contribution Examples

- Creating duplicate button components when existing ones already do the job
- Adding heavy dependencies without discussion
- Breaking route structure or changing screen naming unexpectedly
- Mixing unrelated changes in one PR
- Introducing large visual redesigns without reviewing the project’s existing style

## Communication

Keep discussions respectful and concise. If you are unsure about a pattern, ask before making a large rewrite.

We appreciate well-scoped, maintainable contributions that help DevVault grow into a polished developer tool.
