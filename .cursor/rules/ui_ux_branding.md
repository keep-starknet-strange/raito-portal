# Raito Web Portal

### Branding, Style, UI & UX Guidelines

*(design-system handbook, v0.1)*

---

## 1. Brand Essence

| Element                 | Definition                                                                      |
| ----------------------- | ------------------------------------------------------------------------------- |
| **Tag-line**            | **“Don’t trust, verify — with STARK proofs.”**                                  |
| **Tone**                | Confident • Technical • Minimal • Futuristic                                    |
| **Visual Metaphors**    | 🔒 Padlock (verification) • ⚡ Lightning (speed) • 🟧 Bitcoin block (digital gold) |
| **Aesthetic Reference** | *mempool.space*’s block stream + noir cyber-terminal vibes + neon highlights    |

---

## 2. Color System

| Token            | Usage                 | Hex         | Tailwind key (`theme.colors`) |
| ---------------- | --------------------- | ----------- | ----------------------------- |
| `primary`        | Core accent, CTAs     | **#F7931A** | `bitcoin`                     |
| `primary-dark`   | Hover, focus ring     | #d67d15     | `bitcoin-dark`                |
| `bg-base`        | App background        | **#0D0D0D** | `bg-base`                     |
| `surface`        | Cards, tables         | #131313     | `surface`                     |
| `surface-alt`    | Raised surfaces       | #1C1C1C     | `surface-alt`                 |
| `text-primary`   | Headlines             | #FFFFFF     | `text-primary`                |
| `text-secondary` | Body copy             | #C7C7C7     | `text-secondary`              |
| `success`        | Verified state        | #00D26A     | `success`                     |
| `danger`         | Error / invalid proof | #FF5470     | `danger`                      |

<details>
<summary>Tailwind `tailwind.config.mjs` <small>(palette excerpt)</small></summary>

```ts
import { slate, orange } from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        bitcoin: '#F7931A',
        'bitcoin-dark': '#d67d15',
        'bg-base': '#0D0D0D',
        surface: '#131313',
        'surface-alt': '#1C1C1C',
        'text-primary': '#FFFFFF',
        'text-secondary': '#C7C7C7',
        success: '#00D26A',
        danger: '#FF5470',
        // greys
        ...slate,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 6px 0 rgba(0,0,0,0.55)',
        glow: '0 0 16px 0 rgba(247,147,26,0.6)',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      keyframes: {
        'block-stream': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'block-stream': 'block-stream 45s linear infinite',
      },
    },
  },
}
```

</details>

---

## 3. Typography

| Level         | Font           | Weight | Size (rem) | Tailwind class                |
| ------------- | -------------- | ------ | ---------- | ----------------------------- |
| H1 hero       | Inter          | 800    | 3.75       | `text-6xl lg:text-7xl`        |
| H2 section    | Inter          | 700    | 2.25       | `text-4xl`                    |
| H3 card title | Inter          | 600    | 1.5        | `text-2xl`                    |
| Body-lg       | Inter          | 400    | 1.125      | `text-base lg:text-lg`        |
| Body-sm       | Inter          | 400    | 0.875      | `text-sm`                     |
| Code / hashes | JetBrains Mono | 500    | inherit    | `font-mono text-sm break-all` |

* **Letter-spacing:**

  * Headlines: `tracking-tight`
  * Mono code: `tracking-normal`
* **Line-height:**

  * Headings: `leading-tight`
  * Body: `leading-relaxed`

---

## 4. Spacing & Layout

| Token     | px  |
| --------- | --- |
| `space-1` | 4   |
| `space-2` | 8   |
| `space-3` | 12  |
| `space-4` | 16  |
| `space-5` | 20  |
| `space-6` | 24  |
| `space-7` | 32  |
| `space-8` | 40  |

* **Grid:** 12-column flex grid with `max-w-screen-xl` (1280 px) container.
* **Card Padding:** `p-6 md:p-8`.
* **Section Vertical Rhythm:** `py-12 md:py-20`.

---

## 5. Iconography & Illustration

| Symbol               | Meaning                | Component    | Color                  |
| -------------------- | ---------------------- | ------------ | ---------------------- |
| **🔒 Padlock-Closed** | Verified (proof valid) | `LockIcon`   | `success` or `bitcoin` |
| 🔓 Padlock-Open       | Unverified / unknown   | `UnlockIcon` | `danger`               |
| ⚡ Lightning          | Speed / fast sync      | `FlashIcon`  | `bitcoin`              |
| ⛓ Linked Squares     | Chain continuity       | custom SVG   | subtle slate-600       |

**Source:** Prefer Lucide-React or Heroicons, overridden with Tailwind color utilities.
All icons should be stroke-only (`stroke-2`) for clarity against dark background.

---

## 6. Component Library (shadcn/ui variants)

> **Notation:** `⧉ className` shows Tailwind overrides to apply on top of shadcn defaults.
> Every component **MUST** respect dark theme (BG `surface`, text `text-primary`) by default.

### 6.1 Buttons

| Variant     | Purpose             | Base                         | Extra classes                                               |
| ----------- | ------------------- | ---------------------------- | ----------------------------------------------------------- |
| `primary`   | Main CTA            | `Button`                     | `⧉ bg-bitcoin text-black hover:bg-bitcoin-dark shadow-glow` |
| `secondary` | Less important      | `Button variant="secondary"` | `⧉ bg-surface-alt text-text-primary hover:bg-slate-800`     |
| `ghost`     | Minimal icon button | `Button variant="ghost"`     | `⧉ text-text-secondary hover:bg-slate-800/40`               |

### 6.2 Cards

```
<Card className="bg-surface rounded-xl shadow-card border border-slate-800" />
```

* Use `CardHeader` for title (`font-semibold text-text-primary`)
* `CardContent` uses body-sm with `text-text-secondary`.

### 6.3 Table Rows (Block list)

```
<tr className="hover:bg-surface-alt/60 transition-colors">
  <td className="px-6 py-4 font-mono text-bitcoin">#810000</td>
  <td className="truncate max-w-[9rem]">000000...abcd</td>
  ...
  <td><LockIcon className="text-success" /></td>
</tr>
```

* Striped effect via `odd:bg-surface`, `even:bg-surface-alt/40`.
* Mobile: use `hidden md:table-cell` to hide non-essential columns.

### 6.4 Inputs

```
<Input className="bg-surface-alt border border-slate-700 focus:border-bitcoin focus:ring-bitcoin placeholder:text-slate-500" />
```

Add `aria-invalid="true"` style: outline danger, text-danger.

### 6.5 Alert / Result Badge

```
<div className="flex items-start gap-3 px-4 py-3 rounded-lg border"
     data-state="success"
     className-data-state-success="border-success/30 bg-success/10 text-success"
     className-data-state-error="border-danger/30 bg-danger/10 text-danger">
 ...
</div>
```

---

## 7. Motion & Micro-Interactions

| Effect                      | Usage                    | Technique                                                                                  |
| --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| **Block-stream background** | Explorer header bar      | `@keyframes block-stream` (translateX) running on a long, repeating SVG sprite of squares. |
| **Hash flicker**            | On hover over any hash   | CSS `animation: text scramble` for 0.6 s; JS optional for random chars.                    |
| **Padlock lock-in**         | After local verification | Animate `scale(0.8→1)` & opacity; then color from slate→success in 0.4 s.                  |
| Button hover glow           | Primary buttons          | `transition-shadow` + increase `shadow-glow`.                                              |

<details>
<summary>CSS snippet — block-stream effect</summary>

```css
.block-stream-bg {
  background-image: url('/img/block-squares.svg'); /* 600×80 svg sprite */
  background-repeat: repeat-x;
  animation: block-stream 45s linear infinite;
  opacity: 0.06;            /* subtle */
  pointer-events: none;
}
```

Place as absolute overlay inside explorer hero:

```html
<section class="relative py-12">
  <div class="block-stream-bg absolute inset-0" />
  <div class="relative z-10 ...">...</div>
</section>
```

</details>

---

## 8. Accessibility

| Check          | Guideline                                                                     |
| -------------- | ----------------------------------------------------------------------------- |
| Color contrast | WCAG AA (≥4.5:1) for all text vs background. Primary orange on dark is ≥ 5.7. |
| Focus states   | Add ring `focus:ring-bitcoin` (\~3 px) on interactive components.             |
| Icon labels    | Provide `aria-label` or `title` on lock icons.                                |
| Keyboard       | Ensure `Tab` order flows logically through hero → nav → content.              |

---

## 9. Responsive Breakpoints

| Tailwind prefix | Min width | Key layout changes                    |
| --------------- | --------- | ------------------------------------- |
| `sm`            | 640 px    | Nav converts to burger menu           |
| `md`            | 768 px    | Hash columns visible, tables used     |
| `lg`            | 1024 px   | Two-column block-detail layout        |
| `xl`            | 1280 px   | Container capped at `max-w-screen-xl` |

---

## 10. Example Component Builds

### 10.1 Primary CTA

```tsx
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <Button
      className="bg-bitcoin text-black font-semibold shadow-glow
                 hover:bg-bitcoin-dark focus:ring-4 focus:ring-bitcoin/40">
      Explore Blocks
      <LockIcon className="ml-2 h-5 w-5" />
    </Button>
  )
}
```

### 10.2 Block Card miniature (Explorer hero)

```tsx
export const MiniBlock = ({ height }: { height: number }) => (
  <div className="flex flex-col items-center justify-center w-16 h-16
                  bg-surface-alt border border-slate-700 rounded-lg
                  text-text-primary font-mono text-xs">
    #{height}
  </div>
)
```

Place these in a horizontally scrolling container w/ `animate-[block-stream]`.

---

## 11. Tailwind Plugins & Utilities

| Need                                    | Plugin / Utility                                               |
| --------------------------------------- | -------------------------------------------------------------- |
| Typography for docs pages               | `@tailwindcss/typography` – restricted to `/developers` routes |
| Aspect-ratio (if video/gif backgrounds) | `@tailwindcss/aspect-ratio`                                    |
| Safelist (dynamic classes for status)   | Add `data-state-(success,error)` classes to safely purge list  |

---

## 12. Shadcn Theme Tokens

Add the following to `components.json` when configuring shadcn CLI:

```jsonc
{
  "theme": {
    "radius": "0.75rem",
    "primary": "bitcoin",
    "secondary": "surface-alt",
    "destructive": "danger",
    "success": "success",
    "muted": "surface"
  }
}
```

---

## 13. Do / Don’t Cheatsheet

| ✅ Do                                                                  | ❌ Don’t                                        |
| --------------------------------------------------------------------- | ---------------------------------------------- |
| Use **jet-black backgrounds** with neon orange glows                  | Use pure white backgrounds                     |
| Truncate long hashes (`truncate max-w-[9rem]`) and show full on hover | Wrap long hashes across lines                  |
| Animate verification states — reinforce “trustless” moment            | Hide verification feedback in plain text       |
| Keep content density low; rely on cards & grids                       | Cram full-node-level data tables into one view |
| Use **monospaced** font for all cryptographic strings                 | Mix serif/sans with hex data                   |

---

## 14. Deliverable Assets

* **SVG assets**

  * `/public/img/block-squares.svg` (repeatable sprite)
  * `/public/img/raito-logo.svg` (monochrome & color variants)
* **Favicon / Logo**

  * 32×32, 192×192, 512×512 PNG
* **Lock icons** packaged as React components (`LockIcon.tsx`, `UnlockIcon.tsx`)
* **Design tokens** exported in `tailwind.config.mjs`

---

### ✨  End-goal Experience

Users land in a pitch-black interface alive with subtle, drifting Bitcoin-orange squares (symbolising mined blocks). Immersed in a *"terminal noir"* mood, they scan a list of blocks glowing with **green-locked** verification icons. A click dives into a carded detail view; one tap of **“Verify Locally”** triggers a short animation — a lock snaps shut, a flash of lightning arcs behind, and the message **“Proof verified successfully!”** pulses in vibrant orange.

Everything — fonts, motion, palette, micro-copy — proclaims: **Raito means trustless, blazing-fast Bitcoin validation.**
