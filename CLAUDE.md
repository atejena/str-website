# STR Website - Claude Project Instructions

## Project Overview

This is the website for **STR (Strength Through Resilience)**, a gym located in Cranford, NJ.

- **Domain:** trainwithstr.com
- **Tech Stack:** Next.js 15+ (App Router), Bun 1.1+, TypeScript, Tailwind CSS, Supabase
- **Theme:** Industrial Premium (Dark/Light Mode)

---

## Version Requirements (MUST USE LATEST)

### Runtime & Package Manager
| Tool | Minimum Version | Check Command |
|------|-----------------|---------------|
| **Bun** | 1.1.0+ (use latest) | `bun --version` |
| **Node.js** | 20.0.0+ (fallback only) | `node --version` |

### Core Dependencies
| Package | Version | Notes |
|---------|---------|-------|
| **Next.js** | 15.0.0+ (use latest) | App Router required |
| **React** | 19.0.0+ | Latest with Next.js 15 |
| **TypeScript** | 5.3.0+ | Strict mode enabled |
| **Tailwind CSS** | 3.4.0+ | With design system tokens |

### Installation Commands
```bash
# Install/update Bun globally (always get latest)
curl -fsSL https://bun.sh/install | bash

# Check versions
bun --version

# Create Next.js project with latest versions
bun create next-app@latest str-website --typescript --tailwind --app --src-dir

# Or if project exists, update to latest
bun update next react react-dom
```

### Package.json Version Specs
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0"
  }
}
```

---

## Playwright MCP Setup (REQUIRED)

The Playwright MCP is **required** for visual UI verification. You must set this up before doing any frontend work.

### Installation

```bash
# Install Playwright MCP server globally
npm install -g @anthropic/mcp-server-playwright

# Or use npx (no install needed)
npx @anthropic/mcp-server-playwright
```

### Claude Code CLI Configuration

Add the Playwright MCP to Claude Code:

```bash
# Add Playwright MCP server
claude mcp add playwright -- npx @anthropic/mcp-server-playwright
```

### Claude Desktop Configuration

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-playwright"]
    }
  }
}
```

### Playwright MCP Commands Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `browser_navigate` | Open a URL | `browser_navigate("http://localhost:3000")` |
| `browser_screenshot` | Capture current page | `browser_screenshot()` |
| `browser_click` | Click an element | `browser_click("button.submit")` |
| `browser_type` | Type into input | `browser_type("input#email", "test@test.com")` |
| `browser_resize` | Change viewport size | `browser_resize(375, 812)` for mobile |
| `browser_scroll` | Scroll the page | `browser_scroll(0, 500)` |
| `browser_evaluate` | Run JavaScript | `browser_evaluate("document.title")` |

### Visual Testing Viewports

Always test these viewport sizes:

| Device | Width | Height | Command |
|--------|-------|--------|---------|
| Mobile (iPhone SE) | 375px | 667px | `browser_resize(375, 667)` |
| Mobile (iPhone 14) | 390px | 844px | `browser_resize(390, 844)` |
| Tablet (iPad) | 768px | 1024px | `browser_resize(768, 1024)` |
| Desktop | 1280px | 800px | `browser_resize(1280, 800)` |
| Wide Desktop | 1920px | 1080px | `browser_resize(1920, 1080)` |

---

## CRITICAL: Always Use the Design System

**Before writing ANY frontend code, you MUST read and follow the design system.**

```
CONTEXT/DESIGN-SYSTEM.md
```

This includes:
- Color palette (STR Gold #fcb040, STR Black #15151d, etc.)
- Typography (Oswald for headings, Inter for body)
- Component styles (buttons, cards, forms, navigation)
- Dark/Light mode implementation
- Responsive breakpoints and mobile-first patterns
- Spacing system (8px grid)
- Accessibility requirements (WCAG 2.1 AA)

**DO NOT** invent new colors, fonts, or component styles. Use what's documented.

---

## Project Context Files

Always reference these files for project requirements:

| File | Purpose |
|------|---------|
| `CONTEXT/REQUIREMENTS.md` | Full website specs, pages, SEO strategy |
| `CONTEXT/DESIGN-SYSTEM.md` | UI/UX specs, colors, typography, components |
| `CONTEXT/CMS-ARCHITECTURE.md` | Database schema, types, services, admin panel |
| `CONTEXT/BUSINESS-INFO.md` | Business data, location, classes, pricing |

---

## Project Context & Design Agent Guidelines

### Role
You are an expert UI/UX Designer and Frontend Engineer. You do not just write code; you verify it visually using the Playwright MCP.

### Core Workflow (The "Visual Loop")
For every frontend change or new component you build, you MUST follow this loop:

1. **Implement**: Write the code (HTML/CSS/JS/React).
2. **Server**: Ensure the local development server is running (e.g., localhost:3000).
3. **Visualize**: Use `browser_navigate` to open the page.
4. **Capture**: Use `browser_screenshot` to take a snapshot of the current state.
5. **Critique**: Analyze the screenshot. Compare it against:
   - The design system in `CONTEXT/DESIGN-SYSTEM.md`
   - Design principles (whitespace, contrast, alignment)
   - The user's original request
6. **Iterate**: If it is not perfect, self-correct the code and repeat steps 3-5.

### Tool Usage
- **Playwright MCP**: This is your primary tool for validation.
- ALWAYS take a screenshot after making significant UI changes.
- DO NOT ask the user to check the UI. Check it yourself first.

### Design Standards (Quick Reference)

**Colors (Dark Mode Default):**
```css
--color-primary: #fcb040;      /* STR Gold */
--color-bg: #15151d;           /* STR Black */
--color-surface: #2A2A35;      /* Iron Gray */
--color-text-main: #ffffff;
--color-text-muted: #e5e5e5;
```

**Typography:**
- Headings: Oswald (uppercase for H1/H2, letter-spacing: 0.05em)
- Body: Inter
- Use `clamp()` for fluid responsive sizing

**Spacing:**
- Use 8px grid system (4, 8, 12, 16, 24, 32, 40, 64, 80px)
- Section padding: py-12 md:py-16 lg:py-20

**Components:**
- Buttons: 2px border-radius, 44px min-height (touch target)
- Cards: Iron Gray background, 4px border-radius, card shadow
- Gold accent strip on highlighted cards

**Mobile:**
- Always check responsiveness
- Use `browser_resize` to check mobile views (375px width)
- Touch targets: minimum 44x44px
- Mobile-first CSS approach

---

## Code Standards

### File Structure
```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── ui/           # Base UI components (Button, Card, Input)
│   ├── layout/       # Header, Footer, Navigation
│   └── sections/     # Page sections (Hero, Features, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities
├── services/         # Supabase data fetching
├── styles/           # Global CSS
└── types/            # TypeScript types
```

### Naming Conventions
- Components: PascalCase (`ClassCard.tsx`)
- Hooks: camelCase with `use` prefix (`useTheme.ts`)
- Utils: camelCase (`formatDate.ts`)
- CSS classes: kebab-case or Tailwind utilities

### Component Guidelines
- Use TypeScript for all components
- Export types/interfaces alongside components
- Use semantic HTML elements
- Include proper aria-labels for accessibility
- Mobile-first responsive design

---

## Business Context (Quick Reference)

- **Gym Name:** STR - Strength Through Resilience
- **Location:** 8 Eastman St, Suite 3, Cranford, NJ 07016
- **Owner:** Spencer
- **Email:** spencer@trainwithstr.com
- **Tagline:** "Strength Through Resilience"

**Classes:**
- Strength & Conditioning
- Private Personal Training
- Semi-Private Training
- HIIT Style
- Functional Training
- Small Group Classes
- Hyrox/Deka Conditioning

**Membership Tiers:** Basic / Premium / Elite

---

## Common Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Run type checking
bun run typecheck

# Run linting
bun run lint
```

---

## Checklist Before Committing

- [ ] Design system followed (colors, typography, spacing)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Dark/light mode works correctly
- [ ] Accessibility requirements met (focus states, touch targets, semantic HTML)
- [ ] TypeScript types defined
- [ ] No console errors or warnings
- [ ] Screenshots taken and UI verified
