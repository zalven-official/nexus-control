Here is the revised version of the documentation for the **Nexus** project:

---

### Project: Nexus

#### Description:
Nexus AI

#### Versions:
- **Node.js:** v22.13.1
- **pnpm:** 10.2.1
- **Python:** 3.12.2 (managed with conda)

#### Scripts:
- **Development:**
  - **Frontend:** `pnpm run dev:frontend` (watches and builds frontend; refresh the desktop app by pressing `Ctrl + R` to reflect changes).
  - **Backend:** `pnpm run dev:backend` (runs the Python server; restart the backend by closing and reopening it to apply changes).

- **Build:**
  - **General:** `pnpm run build` (automatically builds both frontend and backend).
  - **Backend-specific Builds:**
    - macOS: `pnpm run build:backend:macos`
    - Windows: `pnpm run build:backend:windows`

- **Post-Install:** Installs dependencies for both client and server:
  - `pnpm run postinstall`

