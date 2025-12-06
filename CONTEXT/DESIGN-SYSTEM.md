# Design System: Strength Through Resilience (STR)

**Version:** 1.1
**Theme:** Industrial Premium (Dark/Light Mode)
**Inspiration:** Allegiate Gym / King Strength Performance
**Core Philosophy:** Unyielding, Structured, Accessible, High-Contrast.

---

## 1. Brand Identity & Visual Language

The STR visual identity combines the raw grit of a performance facility with the polish of a high-end lifestyle brand. The interface should feel "heavy" yet fast.

* **Visual Metaphor:** The "Iron Fortress." Solid blocks, sharp angles (triangles), and high-contrast lighting.
* **The "Dark Mode" Default:** To convey premium intensity and reduce glare in gym environments, the site defaults to a dark theme.

---

## 2. Color System

**Accessibility Note:** We strictly adhere to WCAG 2.1 AA standards.

### Critical Rules
- **NEVER** use White text on Gold backgrounds.
- **NEVER** use Gold text on White backgrounds.

### Primary Palette

| Color Name | Hex Code | Usage | Text Pairing |
| :--- | :--- | :--- | :--- |
| **STR Gold** | `#fcb040` | CTA Buttons, Borders, Icons, Highlights | **STR Black** (Must use dark text) |
| **STR Black** | `#15151d` | Global Background, Footer, Button Text | **White** or **STR Gold** |
| **Pure White** | `#FFFFFF` | Primary Headings, Body Text | **STR Black** or **Iron Gray** |

### Utility & UI Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Iron Gray** | `#2A2A35` | Card backgrounds, Form fields, Section dividers |
| **Concrete** | `#E5E5E5` | Secondary text (dates, metadata) |
| **Focus Blue** | `#4D90FE` | Keyboard focus rings (Accessibility requirement) |
| **Success** | `#27AE60` | Form success states |
| **Error** | `#E74C3C` | Form error states |

### Tailwind CSS Color Configuration

```javascript
// tailwind.config.ts colors extension
colors: {
  'str-gold': '#fcb040',
  'str-black': '#15151d',
  'iron-gray': '#2A2A35',
  'concrete': '#E5E5E5',
  'focus-blue': '#4D90FE',
  'success': '#27AE60',
  'error': '#E74C3C',
}
```

---

## 2.1 Light Mode Color System

While dark mode is the default (premium gym aesthetic), light mode provides accessibility and user preference options.

### Light Mode Palette

| Color Name | Dark Mode | Light Mode | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#15151d` | `#F8F9FA` | Page background |
| **Surface** | `#2A2A35` | `#FFFFFF` | Cards, modals |
| **Surface Alt** | `#1E1E26` | `#F1F3F4` | Alternate sections |
| **Text Primary** | `#FFFFFF` | `#15151d` | Headings, body |
| **Text Secondary** | `#E5E5E5` | `#5F6368` | Muted text, captions |
| **Border** | `#444444` | `#DADCE0` | Dividers, input borders |
| **STR Gold** | `#fcb040` | `#fcb040` | Accent (unchanged) |

### Light Mode Specific Rules

**Accessibility Note:** In light mode, ensure sufficient contrast:
- Gold buttons: Use `#15151d` (STR Black) text on gold backgrounds
- Gold text: Only use on dark backgrounds, never on white/light gray

### CSS Variables (Theme-Aware)

```css
/* Dark Mode (Default) */
:root {
  --color-bg: #15151d;
  --color-surface: #2A2A35;
  --color-surface-alt: #1E1E26;
  --color-text-primary: #ffffff;
  --color-text-secondary: #E5E5E5;
  --color-border: #444444;
  --color-primary: #fcb040;
  --color-primary-text: #15151d;  /* Text on gold buttons */

  /* Shadows - more prominent in dark mode */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.5);
  --shadow-elevated: 0 8px 30px rgba(0, 0, 0, 0.6);
}

/* Light Mode */
[data-theme="light"] {
  --color-bg: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F1F3F4;
  --color-text-primary: #15151d;
  --color-text-secondary: #5F6368;
  --color-border: #DADCE0;
  --color-primary: #fcb040;
  --color-primary-text: #15151d;

  /* Shadows - softer in light mode */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* System preference detection */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --color-bg: #F8F9FA;
    --color-surface: #FFFFFF;
    --color-surface-alt: #F1F3F4;
    --color-text-primary: #15151d;
    --color-text-secondary: #5F6368;
    --color-border: #DADCE0;
    --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}
```

### Theme Toggle Implementation

```typescript
// src/hooks/useTheme.ts
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Get saved preference or default to system
    const saved = localStorage.getItem('str-theme') as Theme | null
    if (saved) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', systemDark ? 'dark' : 'light')
      setResolvedTheme(systemDark ? 'dark' : 'light')
    } else {
      root.setAttribute('data-theme', theme)
      setResolvedTheme(theme)
    }

    localStorage.setItem('str-theme', theme)
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      setResolvedTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  return { theme, setTheme, resolvedTheme }
}
```

### Theme Toggle Component

```tsx
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <button
      onClick={() => {
        const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
        setTheme(next)
      }}
      className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="w-5 h-5 text-str-gold" />
      ) : (
        <Sun className="w-5 h-5 text-str-gold" />
      )}
    </button>
  )
}
```

### Tailwind Dark Mode Configuration

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  // ... rest of config
}
```

### Component Theme Examples

```tsx
// Theme-aware component example
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]
               border border-[var(--color-border)] rounded-md p-6
               shadow-[var(--shadow-card)]">
  <h3 className="text-str-gold">Card Title</h3>
  <p className="text-[var(--color-text-secondary)]">Card content</p>
</div>

// Or using Tailwind dark: modifier
<div className="bg-white dark:bg-iron-gray text-str-black dark:text-white
               border border-gray-200 dark:border-gray-700 rounded-md p-6">
  <h3 className="text-str-gold">Card Title</h3>
  <p className="text-gray-600 dark:text-concrete">Card content</p>
</div>
```

---

## 3. Typography

**Font Pairing:** A massive, condensed display font for impact vs. a geometric sans-serif for readability.

### Primary Font (Headings): **Oswald** (Google Fonts)

* **Style:** Bold (700) & Regular (400)
* **Transform:** Uppercase for H1 and H2.
* **Letter Spacing:** `0.05em` (Slightly tracking out caps makes them look more premium).

### Secondary Font (Body): **Inter** (Google Fonts)

* **Style:** Regular (400) & Bold (700)
* **Why:** High x-height makes it readable on mobile screens while moving.

### Type Scale (Responsive)

| Element | Desktop Size | Mobile Size | Weight | Style | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | 72px (4.5rem) | 42px (2.625rem) | Bold (700) | Uppercase | White |
| **H2 (Section)** | 48px (3rem) | 32px (2rem) | SemiBold (600) | Uppercase | Gold or White |
| **H3 (Cards)** | 32px (2rem) | 24px (1.5rem) | Medium (500) | Title Case | White |
| **H4 (Subheads)** | 24px (1.5rem) | 20px (1.25rem) | Medium (500) | Title Case | White |
| **Body Lead** | 20px (1.25rem) | 18px (1.125rem) | Regular (400) | Normal | Concrete |
| **Body Standard** | 16px (1rem) | 16px (1rem) | Regular (400) | Normal | Concrete |
| **Button Text** | 16px (1rem) | 16px (1rem) | Bold (700) | Uppercase | STR Black |
| **Caption/Meta** | 14px (0.875rem) | 14px (0.875rem) | Regular (400) | Normal | Concrete |

### Next.js Font Implementation

```typescript
// src/app/layout.tsx
import { Oswald, Inter } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
  display: 'swap',
})
```

---

## 4. UI Components & Elements

### Buttons

Buttons must look like physical objects—solid and tactile.

#### Primary CTA (Join/Sign Up)

```css
.btn-primary {
  background-color: var(--color-primary);     /* STR Gold */
  color: var(--color-bg);                      /* STR Black */
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 16px 32px;
  min-height: 44px;                            /* Accessibility */
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}
```

#### Secondary CTA (Learn More)

```css
.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--color-primary);      /* STR Gold */
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 14px 30px;
  min-height: 44px;
  transition: all 0.2s ease-in-out;
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-bg);
}
```

### Cards (Classes, Coaches, Pricing)

To create depth on a dark background without using borders everywhere:

```css
.card {
  background-color: var(--color-surface);      /* Iron Gray #2A2A35 */
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.card--highlighted {
  border-top: 4px solid var(--color-primary);  /* Gold accent strip */
}
```

### Navigation (Sticky)

```css
.nav {
  position: sticky;
  top: 0;
  background-color: rgba(21, 21, 29, 0.95);    /* STR Black 95% */
  backdrop-filter: blur(5px);
  z-index: 50;
}
```

**Layout:** Logo Left | Links Center | CTA Button Right
**Mobile:** Hamburger menu icon must be **White** (not Gold) for maximum visibility.

### Forms (Lead Gen)

```css
.form-input {
  background-color: var(--color-surface);      /* Iron Gray */
  color: var(--color-text-main);               /* White */
  border: 1px solid #444;
  border-radius: 2px;
  padding: 16px;
  min-height: 44px;
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  border-color: var(--color-primary);          /* STR Gold */
  outline: 2px solid var(--color-focus);       /* Focus Blue */
  outline-offset: 2px;
}

.form-input--error {
  border-color: var(--color-error);
}

.form-input--success {
  border-color: var(--color-success);
}
```

**Labels:** Must remain visible (floating labels recommended) for accessibility.

---

## 5. Imagery & Textures

Inspired by *Allegiate*, imagery is treated as part of the architecture.

### Photography Style

* High contrast, "In the Trenches"
* Subjects should look sweaty and focused
* Real gym moments, not stock photos

### Color Grading

* Desaturate blues/greens
* Push contrast on blacks
* Slightly crushed shadows

### The "Triangle" Mask

Use the triangle shape from the logo to:
* Mask images
* Create diagonal section breaks
* Add decorative elements

### Image Overlays

Images used as backgrounds **must** have a black overlay:

```css
.hero-image {
  position: relative;
}

.hero-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(21, 21, 29, 0.6),
    rgba(21, 21, 29, 0.8)
  );
}
```

---

## 6. Spacing System

Based on 8px grid system:

| Token | Value | Usage |
| :--- | :--- | :--- |
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Compact elements |
| `space-3` | 12px | Default gaps |
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Large card padding |
| `space-10` | 40px | Section gaps |
| `space-16` | 64px | Section padding (mobile) |
| `space-20` | 80px | Section padding (desktop) |

---

## 7. Accessibility & UX Requirements (Mandatory)

### 1. Focus States

All interactive elements must have a visible outline when selected via keyboard.

```css
:focus-visible {
  outline: 2px solid var(--color-focus);       /* Focus Blue #4D90FE */
  outline-offset: 2px;
}
```

**Do NOT** remove CSS `outline` without replacing it.

### 2. Touch Targets

All clickable areas must be at least **44x44px**.

```css
.interactive {
  min-width: 44px;
  min-height: 44px;
}
```

### 3. Color Blindness

**Never** rely on color alone to convey state:
* Error: Red text **AND** error icon
* Success: Green text **AND** checkmark icon
* Active: Gold color **AND** visual indicator

### 4. Semantic HTML

Use proper landmark elements:
* `<header>` for site header
* `<nav>` for navigation
* `<main>` for main content
* `<section>` with `aria-labelledby` for sections
* `<footer>` for site footer
* Proper `<h1>` through `<h6>` hierarchy

### 5. Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Animation Guidelines

### Timing

* **Fast (interactions):** 150-200ms
* **Normal (reveals):** 300ms
* **Slow (page transitions):** 500ms

### Easing

* **Ease-out:** For elements entering
* **Ease-in:** For elements leaving
* **Ease-in-out:** For state changes

### Recommended Animations

```css
/* Button hover lift */
.btn:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-out;
}

/* Card hover scale */
.card:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease-out;
}

/* Fade in on scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 9. Responsive Design System

Full mobile-first responsive design ensuring optimal experience across all devices.

### 9.1 Breakpoint System

| Breakpoint | Name | Width | Target Devices |
|------------|------|-------|----------------|
| `xs` | Extra Small | < 480px | Small phones (iPhone SE, older Android) |
| `sm` | Small | 480px - 639px | Standard phones (iPhone, Pixel) |
| `md` | Medium | 640px - 767px | Large phones, small tablets |
| `lg` | Large | 768px - 1023px | Tablets (iPad Mini, iPad) |
| `xl` | Extra Large | 1024px - 1279px | Laptops, iPad Pro |
| `2xl` | 2X Large | 1280px+ | Desktops, large monitors |

### Tailwind Breakpoint Config

```typescript
// tailwind.config.ts
screens: {
  'xs': '480px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### 9.2 Mobile-First Approach

Always write styles for mobile first, then add complexity for larger screens:

```tsx
// CORRECT: Mobile-first
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-3xl md:text-5xl lg:text-7xl">
    Strength Through Resilience
  </h1>
</div>

// INCORRECT: Desktop-first (avoid)
<div className="px-16 md:px-8 sm:px-4">
```

### 9.3 Container & Layout

```css
/* Container widths per breakpoint */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: 1rem;   /* 16px */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;  /* 24px */
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding-left: 2rem;    /* 32px */
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

### 9.4 Navigation Responsive Behavior

#### Mobile (< 768px)
- Hamburger menu icon (white, 44x44px touch target)
- Full-screen overlay menu
- Stacked navigation links
- CTA button full-width at bottom
- Logo centered or left-aligned

#### Tablet (768px - 1023px)
- Condensed horizontal nav
- May use hamburger or horizontal links
- CTA button visible

#### Desktop (1024px+)
- Full horizontal navigation
- Logo left | Links center | CTA right
- Sticky header with backdrop blur

```tsx
// Navigation responsive structure
<nav className="fixed top-0 w-full z-50 bg-str-black/95 backdrop-blur-sm">
  <div className="container flex items-center justify-between h-16 md:h-20">
    {/* Logo */}
    <Link href="/" className="flex-shrink-0">
      <Image src="/images/str-logo.webp" alt="STR"
             className="h-10 md:h-12 w-auto" />
    </Link>

    {/* Desktop Nav - Hidden on mobile */}
    <div className="hidden lg:flex items-center gap-8">
      <NavLinks />
    </div>

    {/* CTA - Hidden on mobile, shown on tablet+ */}
    <div className="hidden md:block">
      <Button>Join Now</Button>
    </div>

    {/* Mobile Menu Button - Shown only on mobile/tablet */}
    <button className="lg:hidden p-2 min-w-[44px] min-h-[44px]">
      <Menu className="w-6 h-6 text-white" />
    </button>
  </div>
</nav>
```

### 9.5 Grid Systems

#### Card Grids (Classes, Trainers, etc.)

```tsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile | 1 | 16px |
| sm (480px+) | 2 | 16px |
| lg (768px+) | 3 | 24px |
| xl (1024px+) | 4 | 32px |

#### Pricing Cards (Special Treatment)

```tsx
// Pricing grid - keeps cards readable
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
  <PricingCard tier="Basic" />
  <PricingCard tier="Premium" highlighted />
  <PricingCard tier="Elite" />
</div>
```

### 9.6 Typography Responsive Scale

Already defined with `clamp()` for fluid scaling:

```css
/* Fluid typography - automatically scales */
--text-h1: clamp(2.625rem, 5vw, 4.5rem);   /* 42px → 72px */
--text-h2: clamp(2rem, 4vw, 3rem);         /* 32px → 48px */
--text-h3: clamp(1.5rem, 3vw, 2rem);       /* 24px → 32px */
--text-h4: clamp(1.25rem, 2vw, 1.5rem);    /* 20px → 24px */
```

### 9.7 Touch-Friendly Spacing

#### Mobile Touch Targets

All interactive elements must meet minimum 44x44px:

```tsx
// Button with proper touch target
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Click Me
</button>

// Icon button
<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center">
  <Icon className="w-5 h-5" />
</button>

// List item / Nav link
<a className="block py-3 px-4 min-h-[44px]">
  Navigation Link
</a>
```

#### Spacing Adjustments

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section padding (vertical) | 48px | 64px | 80px |
| Section padding (horizontal) | 16px | 24px | 32px |
| Card padding | 20px | 24px | 32px |
| Button padding | 14px 24px | 16px 32px | 16px 32px |
| Input padding | 14px | 16px | 16px |
| Gap between cards | 16px | 20px | 24px |

```tsx
// Section with responsive padding
<section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
  {/* content */}
</section>
```

### 9.8 Image Responsive Behavior

```tsx
// Hero image - full width, aspect ratio maintained
<div className="relative w-full h-[50vh] md:h-[70vh] lg:h-screen">
  <Image
    src="/images/hero.jpg"
    alt="STR Gym"
    fill
    className="object-cover"
    sizes="100vw"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-str-black/60 to-str-black/80" />
</div>

// Card image - responsive aspect ratio
<div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm">
  <Image
    src={image}
    alt={alt}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>
```

### 9.9 Form Responsive Layout

```tsx
// Contact form - stacked on mobile, side-by-side on desktop
<form className="space-y-4 md:space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="First Name" />
    <Input label="Last Name" />
  </div>
  <Input label="Email" type="email" />
  <Input label="Phone" type="tel" />
  <Textarea label="Message" rows={4} className="md:rows-6" />
  <Button type="submit" className="w-full md:w-auto">
    Send Message
  </Button>
</form>
```

### 9.10 Mobile Menu Implementation

```tsx
// Full-screen mobile menu
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 min-w-[44px] min-h-[44px]"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-str-black/98 backdrop-blur-lg
          transition-opacity duration-300
          lg:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {['Classes', 'Trainers', 'Pricing', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-2xl md:text-3xl font-display uppercase text-white
                         hover:text-str-gold transition-colors
                         min-h-[44px] flex items-center"
            >
              {item}
            </a>
          ))}
          <Button size="lg" className="mt-8 w-full max-w-xs">
            Join Now
          </Button>
        </nav>
      </div>
    </>
  )
}
```

### 9.11 Responsive Component Examples

#### Hero Section

```tsx
<section className="relative min-h-[80vh] md:min-h-screen flex items-center">
  {/* Background */}
  <div className="absolute inset-0">
    <Image src="/hero.jpg" alt="" fill className="object-cover" priority />
    <div className="absolute inset-0 bg-gradient-to-b from-str-black/60 to-str-black/90" />
  </div>

  {/* Content */}
  <div className="relative container text-center md:text-left">
    <h1 className="text-h1 font-display uppercase text-white mb-4 md:mb-6">
      Strength Through<br className="hidden md:block" /> Resilience
    </h1>
    <p className="text-body-lg text-concrete max-w-xl mx-auto md:mx-0 mb-6 md:mb-8">
      Transform your body and mind at Cranford's premier strength and conditioning facility.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <Button size="lg">Start Training</Button>
      <Button variant="secondary" size="lg">View Classes</Button>
    </div>
  </div>
</section>
```

#### Class Card

```tsx
<article className="group bg-[var(--color-surface)] rounded-sm overflow-hidden
                    shadow-card hover:shadow-elevated transition-shadow">
  {/* Image */}
  <div className="relative aspect-[4/3] overflow-hidden">
    <Image
      src={classImage}
      alt={className}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
    <span className="absolute top-3 left-3 px-3 py-1 bg-str-gold text-str-black
                     text-sm font-bold uppercase rounded-sm">
      {difficulty}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 md:p-6">
    <h3 className="text-h4 font-display text-[var(--color-text-primary)] mb-2">
      {className}
    </h3>
    <p className="text-[var(--color-text-secondary)] text-sm md:text-base mb-4 line-clamp-2">
      {description}
    </p>
    <div className="flex items-center justify-between">
      <span className="text-concrete text-sm">{duration}</span>
      <Button variant="secondary" size="sm">Learn More</Button>
    </div>
  </div>
</article>
```

### 9.12 Testing Checklist

#### Devices to Test

| Device | Screen Size | Notes |
|--------|-------------|-------|
| iPhone SE | 375 x 667 | Smallest common phone |
| iPhone 14 | 390 x 844 | Standard phone |
| iPhone 14 Pro Max | 430 x 932 | Large phone |
| iPad Mini | 768 x 1024 | Small tablet |
| iPad Pro 11" | 834 x 1194 | Standard tablet |
| iPad Pro 12.9" | 1024 x 1366 | Large tablet |
| Laptop | 1366 x 768 | Common laptop |
| Desktop | 1920 x 1080 | Standard desktop |
| Ultrawide | 2560 x 1440 | Large monitor |

#### Responsive QA Checklist

- [ ] Navigation collapses properly to hamburger menu
- [ ] Touch targets are 44x44px minimum on mobile
- [ ] Text is readable without zooming
- [ ] Images don't overflow containers
- [ ] Forms are usable on mobile (inputs not too small)
- [ ] Horizontal scrolling is prevented
- [ ] Cards stack properly on mobile
- [ ] Buttons are full-width or appropriately sized on mobile
- [ ] Spacing reduces appropriately on smaller screens
- [ ] Hero section is impactful on all sizes
- [ ] Footer is navigable on mobile
- [ ] Modal/dialogs work on mobile
- [ ] Theme toggle is accessible on all devices

---

## 10. CSS Variables (Complete)

```css
:root {
  /* --- COLORS --- */
  --color-primary: #fcb040;      /* STR Gold */
  --color-bg: #15151d;           /* STR Black */
  --color-surface: #2A2A35;      /* Iron Gray */
  --color-text-main: #ffffff;    /* White */
  --color-text-muted: #e5e5e5;   /* Concrete */
  --color-focus: #4D90FE;        /* Focus Blue */
  --color-success: #27AE60;
  --color-error: #E74C3C;

  /* --- TYPOGRAPHY --- */
  --font-display: var(--font-oswald), 'Oswald', sans-serif;
  --font-body: var(--font-inter), 'Inter', sans-serif;

  /* --- TYPE SCALE --- */
  --text-h1: clamp(2.625rem, 5vw, 4.5rem);    /* 42-72px */
  --text-h2: clamp(2rem, 4vw, 3rem);          /* 32-48px */
  --text-h3: clamp(1.5rem, 3vw, 2rem);        /* 24-32px */
  --text-h4: clamp(1.25rem, 2vw, 1.5rem);     /* 20-24px */
  --text-body-lg: clamp(1.125rem, 1.5vw, 1.25rem);  /* 18-20px */
  --text-body: 1rem;                          /* 16px */
  --text-sm: 0.875rem;                        /* 14px */

  /* --- SPACING --- */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */

  /* --- LAYOUT --- */
  --container-max: 1280px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;

  /* --- SHADOWS --- */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.5);
  --shadow-elevated: 0 8px 30px rgba(0, 0, 0, 0.6);

  /* --- TRANSITIONS --- */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

---

## 10. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'str-gold': '#fcb040',
        'str-black': '#15151d',
        'iron-gray': '#2A2A35',
        'concrete': '#E5E5E5',
        'focus-blue': '#4D90FE',
        'success': '#27AE60',
        'error': '#E74C3C',
      },
      fontFamily: {
        display: ['var(--font-oswald)', 'Oswald', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['clamp(2.625rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        'h2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'h3': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        'h4': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'elevated': '0 8px 30px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

*Document Version: 1.1*
*Last Updated: December 2024*

**Changelog:**
- v1.1: Added Light Mode color system with theme toggle implementation (Section 2.1), Added comprehensive Responsive Design System (Section 9)
- v1.0: Initial design system
