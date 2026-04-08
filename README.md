<div align="center">

# 📅 Wall Calendar

**A highly interactive, aesthetically refined digital wall calendar that captures the nostalgic feel of a physical calendar — built with modern web technology.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo]: https://calendar-6k9l.vercel.app/

</div>

---

## ✨ Feature Highlights

### 🔄 Dynamic Page-Flip Animation
Navigate between months with a realistic **3D page-turn effect** — directional too. Flipping forward rotates the page upward; flipping backward rotates it downward — just like turning a physical wall calendar.

### 🎨 Seasonal Image-Based Theme Switching
Every month automatically applies a **unique color palette** derived from its hero photograph. Winter months shift cool and icy; summer months go warm and saturated. Accent colors, range highlights, weekend markers, and the shell background all update seamlessly as you navigate — no manual theme selection needed.

### 🗓 Intuitive Day Range Selector
Select a date range with two clicks:
- **First click** sets the start date (highlighted in the accent color)
- **Hover** shows a live preview of the range as you move your cursor
- **Second click** confirms the end date (highlighted in the contrast color)
- The range displays in a badge with a clear label and a one-click reset button

### 🏷️ Per-Day Emoji Marks
Annotate any date with an emoji to visually flag it at a glance:
- **Desktop:** Right-click any day cell to open the emoji picker
- **Mobile:** Long-press (500 ms) any day to trigger the picker
- Choose from **16 curated emojis** covering celebrations, reminders, travel, health, and more
- The emoji appears as a small badge in the top-right corner of the day cell with a satisfying bounce animation
- Marks are saved to **`localStorage`** — they persist across page refreshes and browser sessions
- Remove a mark at any time by opening the picker and clicking "✕ Remove mark"

```
🎉  🎂  ⭐  ❤️  🔥  ✅  📌  🏖️
💡  ⚠️  🏃  💊  ✈️  🎵  📞  💼
```

### 📝 Integrated Monthly Notes Panel
Each month has its own dedicated notes section:
- Freeform text area styled as **ruled paper**
- Auto-saves to `localStorage` as you type — no save button needed
- Quick-insert toolbar with **8 emoji stamps** (⭐ ✅ 🔥 📌 💡 ⚠️ 🎉 🏖️)
- When a date range is selected, the notes panel displays it as a contextual tag
- Character counter with a warning state at 85% capacity

### 🌙 Dark Mode
Toggle between light and dark themes via the moon/sun button in the navigation bar. Dark mode overrides CSS variables globally — the seasonal accent colors still apply on top of the dark palette.

### 🗺️ Holiday Markers
US public holidays are pre-loaded and displayed with an italic style and an amber dot indicator. Hover over a marked day to see the holiday name in a tooltip.

### 📱 Fully Responsive Layout

| Breakpoint | Layout |
|---|---|
| Mobile (< 820px) | Single column — image stacked above grid, notes below |
| Desktop (≥ 820px) | Two-column — grid on the left, notes panel on the right |
| Wide (≥ 1100px) | Wider card with more breathing room |

### 🖨️ Print-Ready
CSS print styles automatically hide navigation controls, the binding, and interactive hints — producing a clean, ink-friendly calendar view.

---

## 🛠️ Tech Stack

| Category | Tools |
|---|---|
| **Framework** | React 18 (Vite) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Lucide React, Shadcn UI |
| **State / Data** | TanStack React Query, Zod |
| **Forms** | React Hook Form |
| **Testing** | Vitest, Playwright |
| **Fonts** | Playfair Display (display) + DM Sans (body) |

---

## 📦 Installation & Setup

**Prerequisites:** Node.js 16+

```bash
# 1. Clone the repository
git clone [repository-url]
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → http://localhost:8080
```

**Build for production:**
```bash
npm run build
# Output in /dist — ready to deploy
```

**Preview the production build:**
```bash
npm run preview
```

---

## 🧪 Testing

```bash
# Unit tests (Vitest)
npm run test

# Unit tests in watch mode
npm run test:watch

# Linting
npm run lint

# End-to-end tests (Playwright)
npx playwright test
```

The test suite covers component rendering, date range selection logic, localStorage persistence, and keyboard/touch interactions.

---

## 🗂️ Project Structure

```
src/
├── main.tsx                    ← ReactDOM entry point
├── App.tsx                     ← Root component
├── index.css                   ← Global CSS variables, keyframes, 3D perspective
│
├── hooks/
│   └── useCalendar.ts          ← All calendar state & logic (custom hook)
│                                  Handles: navigation, range selection,
│                                  emoji marks, notes, theme switching
│
└── components/
    ├── WallCalendar.tsx        ← Main container — assembles all parts
    ├── WallCalendar.css        ← Card, binding, dark mode, responsive grid
    │
    ├── CalendarHeader.tsx      ← Hero image + directional flip + nav bar
    ├── CalendarHeader.css      ← flip-next / flip-prev 3D keyframes
    │
    ├── CalendarGrid.tsx        ← Date grid, range states, emoji picker popup
    ├── CalendarGrid.css        ← All day cell visual states + picker styles
    │
    ├── NotesPanel.tsx          ← Ruled-paper textarea + emoji stamp toolbar
    └── NotesPanel.css
```

---

## 🎨 Customization

### Change a month's theme palette
Open `src/hooks/useCalendar.ts` and edit the `theme` object on any entry in `MONTH_IMAGES`:

```ts
{
  url: 'https://...',
  label: 'Summer beach',
  theme: {
    accent:      '#2AADDB',   // primary color (buttons, range start, today)
    accentDark:  '#1A7A9E',   // nav bar background
    accentLight: '#E0F5FC',   // range highlight background
    weekend:     '#DB7B2A',   // Saturday / Sunday + range end color
    shell:       '#FDF6E8',   // page background
  }
}
```

### Add or change holidays
In `src/hooks/useCalendar.ts`, find the `HOLIDAYS` object and add entries in `"M-D"` format:

```ts
const HOLIDAYS = {
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  // ...
}
```

### Adjust animation speed
In `src/index.css`, change the duration on the flip keyframes:
```css
/* Increase value for a slower, more dramatic flip */
.cal-hero.flip-next { animation: flipNext 0.42s ...; }
```

### Swap the emoji mark palette
In `src/components/CalendarGrid.tsx`, edit the `MARK_EMOJIS` array:
```ts
const MARK_EMOJIS = ['🎉', '🎂', '⭐', '❤️', '🔥', '✅', ...]
```

---

## 🏗️ Architecture Notes

- **All logic in one hook** — `useCalendar.ts` owns every piece of state. Components are purely presentational, making them easy to test in isolation.
- **CSS variables for theming** — a single `useEffect` in the hook writes the month's palette to `document.documentElement`. Every component reacts automatically without prop drilling.
- **localStorage for persistence** — notes and emoji marks survive page refreshes with no backend, no auth, and no API calls needed.
- **Range selection model** — two-click with hover preview. The `getDayStatus()` function is the single source of truth for every cell's visual state.
- **Directional flip** — `flipDirection` state (`'next'` | `'prev'`) determines which CSS class is applied, enabling physically correct forward/backward page turns.

---

## 🚀 Deployment

Deploy the `/dist` output to any static host:

| Platform | Steps |
|---|---|
| **Vercel** | `vercel --prod` or connect your GitHub repo at vercel.com |
| **Netlify** | Drag and drop the `/dist` folder to netlify.com/drop |
| **GitHub Pages** | `gh-pages -d dist` |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using React · TypeScript · Tailwind CSS

</div>
