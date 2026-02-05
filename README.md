# Portfolio

Portfolio for **Aditya Dinesh Rajput** built with React, Vite, and Tailwind CSS.

## Commands supported
- `help` – list commands
- `ls` – list sections
- `cd <section>` – navigate to a section (about, projects, skills, experience, blog, resume, contact)
- `open <item>` – open a project/blog (use slug) or `open resume`
- `clear` – clear the terminal
- `whoami` – short about summary
- `toggle bg` – switch dark/light background
- `toggle text` – rotate accent color
- `history` – show command history

Arrow ↑/↓ walks through previous commands. Items are clickable and keyboard focusable.

## Deploying to GitHub Pages
1) Set the repo name as the Vite `base` if needed (current config uses `./` for easier GitHub Pages hosting).
2) Build: `npm run build`
3) Publish the `dist` folder to GitHub Pages (e.g., via the Pages settings or `gh-pages` branch). With `base: './'`, assets resolve correctly from the repository subpath.

## Tech stack
- React + Vite
- Tailwind CSS
