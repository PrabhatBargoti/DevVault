# DevVault

DevVault is a developer-first knowledge vault built to help you store, organize, and revisit code snippets, commands, notes, and technical solutions in one place.

The project is currently built as a React + Vite application with a dark UI and route-based page structure, and is designed to evolve into a more complete personal knowledge base for developers.

## Highlights

- Save and organize reusable developer knowledge in a clean UI
- Landing page marketing experience for the product
- Auth flow pages for login and signup
- Route-based structure for app pages like Home, Snippets, Tags, Categories, and Settings
- SEO metadata support for public pages
- Open-source friendly project structure for contributors

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- React Helmet Async
- Lucide icons

## Project Status

This repository is in an early product stage. The landing page and authentication screens are implemented, while several app pages are scaffolded and ready for feature development.

## Project Structure

```text
devvault/
├── public/
│   ├── Logo.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── Components/
│   │   ├── BigDarkBtn.jsx
│   │   ├── BigPurpleBtn.jsx
│   │   ├── ButtonDark.jsx
│   │   ├── ButtonPurple.jsx
│   │   ├── Logo.jsx
│   │   └── SEO.jsx
│   ├── Layouts/
│   │   └── LandingPage.jsx
│   ├── Pages/
│   │   ├── Categorie.jsx
│   │   ├── ForgetPass.jsx
│   │   ├── Home.jsx
│   │   ├── LandingPage/
│   │   ├── Login.jsx
│   │   ├── Page404.jsx
│   │   ├── Setting.jsx
│   │   ├── SignUp.jsx
│   │   ├── Snippet.jsx
│   │   └── Tags.jsx
│   └── Utils/
│       └── NavItem.jsx
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── vercel.json
└── contribution.md
```

## Main Routes

The app currently includes the following route structure:

- `/` — landing page
- `/Login` — login screen
- `/Signup` — signup screen
- `/Home` — home dashboard placeholder
- `/Snippet` — snippet page
- `/Tags` — tags page
- `/Categorie` — categories page
- `/Setting` — settings page
- `/forgot-password` — forgot password page
- `*` — 404 page

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Development Notes

- Styling is handled with Tailwind utility classes.
- Reusable UI patterns live in the Components folder.
- SEO metadata is centralized through the `SEO` component.
- The project uses a dark, developer-focused design language with purple accent colors.

## Contribution

Please read [CONTRIBUTION.md](contribution.md) before opening a pull request.

## License

This project currently does not specify a license file. If you plan to distribute or reuse this project publicly, add a proper open-source license before release.

## About the Project

DevVault aims to become a personal and team-ready vault for code snippets, system commands, technical notes, and reusable development knowledge. It is intentionally designed with a clean, minimal, and focused interface so developers can quickly capture and retrieve important information without friction.
