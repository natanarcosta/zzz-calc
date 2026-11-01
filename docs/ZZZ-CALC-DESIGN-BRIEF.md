# ZZZ Calc — Design System & UI Redesign Brief

## 1. Objective

Redesign the existing ZZZ Calc frontend into a polished resource-management dashboard inspired by the visual language of **Zenless Zone Zero (ZZZ)**.

The result should feel like a compact in-universe resource terminal: bold graphic hierarchy, high-contrast surfaces, expressive typography, angular details, and restrained orange/yellow accents. It must remain a practical calculator first: information-dense, fast to use, responsive, and easy to scan.

**This is a visual and UX refactor, not a rewrite of the application logic.** Preserve current calculations, selection behavior, local persistence, data structures, and existing workflows unless a change is necessary and explicitly justified.

## 2. Existing project context

- App name: `zzz-calc`
- Stack: React 19, TypeScript, Vite
- Styling: Tailwind CSS 3.4 is installed; existing CSS conventions should be inspected before choosing how to implement styles.
- Icons: `lucide-react` is installed.
- No backend is required. The app stores calculator data locally.
- Existing source structure:

```text
src/
├── assets/
│   └── images/
│       ├── char_portrait/
│       ├── class_elements/
│       └── materials/
├── components/
│   ├── character-selector/
│   ├── layout/
│   ├── progress-dashboard/
│   └── resource-input/
├── contexts/
├── data/
├── hooks/
├── lib/
└── types/
```

The repository's actual implementation is authoritative. Inspect the app before editing and adapt this brief to the code that exists.

## 3. Design direction

### Core principles

1. **ZZZ-inspired, not a direct copy:** draw from the game's graphic language—bold labels, editorial typography, sharp contrast, playful geometric framing, layered panels, and orange accents—without trying to reproduce every detail of the game's UI.
2. **Dark neutral foundation:** most of the interface should be dark graphite, with light text and occasional pale panels for contrast.
3. **Accent restraint:** orange is for primary actions, active states, progress, and important shortages. Acid yellow is a secondary accent used sparingly.
4. **Readable at a glance:** quantities, missing materials, and progress must be easier to scan than decorative details.
5. **Assets first:** reuse the project's existing character portraits, material icons, and class/element images wherever appropriate. Do not replace existing game assets with generic placeholders if suitable assets already exist.
6. **Consistent behavior:** controls need clear hover, focus, active, disabled, and selected states.
7. **Responsive layout:** desktop is the main target, but the UI must remain usable on narrow windows and mobile widths.
8. **Minimal dependencies:** prefer the existing React, CSS/Tailwind, and `lucide-react` stack. Do not add a UI framework or animation library without a concrete need.

### Suggested color tokens

Treat these as initial values; adjust if the existing assets and real screens call for better contrast.

| Token | Initial value | Purpose |
|---|---|---|
| `--color-bg` | `#111214` | App background |
| `--color-surface` | `#1C1D21` | Cards and panels |
| `--color-surface-hover` | `#27282D` | Hovered surfaces |
| `--color-surface-raised` | `#303137` | Elevated or nested panels |
| `--color-accent` | `#FF6B35` | Primary ZZZ-inspired orange |
| `--color-accent-hover` | `#FF8254` | Hover state for primary accent |
| `--color-secondary` | `#F5E642` | Occasional yellow accent |
| `--color-text` | `#F4F2EC` | Main text |
| `--color-text-secondary` | `#A3A4AA` | Secondary text |
| `--color-text-muted` | `#74767E` | Muted labels |
| `--color-success` | `#77D6A0` | Completed / sufficient |
| `--color-warning` | `#F5C451` | Warning / nearly complete |
| `--color-danger` | `#FF646B` | Missing / error |
| `--border-subtle` | `#FFFFFF12` | Subtle border |
| `--border-default` | `#FFFFFF24` | Standard border |

Create a central token file (for example `src/styles/tokens.css`) and load it globally. Avoid scattering raw color values across components. If the project already has a token/theme convention, extend that instead of duplicating it.

### Shape, spacing, and typography

- Prefer compact spacing and a clear spacing scale (e.g. 4, 8, 12, 16, 24, 32 px).
- Use small radii for most panels (approximately 4–8 px); reserve larger radii for major containers.
- Use strong, condensed or editorial-looking headings paired with a highly readable body font. If adding a remote font, provide sensible system fallbacks and ensure the app remains usable offline. Prefer a locally available or already configured font when possible.
- Use uppercase micro-labels sparingly for metadata, section identifiers, and category labels.
- Use angled cuts, offset borders, dividers, and small graphic accents selectively. Do not overuse gradients, glows, blur, or neon effects.
- Keep animations subtle and brief (roughly 120–200 ms); respect `prefers-reduced-motion`.

## 4. Suggested app shell

Build on the existing layout components instead of introducing a parallel app structure.

### Desktop

- A compact left sidebar for primary navigation, if multiple existing views justify it.
- A top bar for the app identity and useful global controls.
- A main content area with a consistent maximum width and spacing.
- Clear active navigation state using the orange accent.
- Avoid wasting large amounts of vertical space: the calculator should show useful information without excessive scrolling.

### Small screens

- Collapse the sidebar into a compact menu or bottom navigation, whichever fits the current app architecture.
- Avoid horizontal overflow.
- Keep primary actions and quantity controls comfortably tappable.
- Allow card grids to collapse naturally to one column.
- Ensure dialogs, popovers, and dropdowns fit inside the viewport.

Do not add navigation destinations or features that do not exist. If the app currently has one screen, prefer a compact header and clear content sections over a fake multi-page sidebar.

## 5. Main dashboard UX

Adapt the existing dashboard to provide the following hierarchy, using real application data:

1. **Overview**
   - Number of selected characters/targets, if supported by current state.
   - Number of distinct materials still needed, if this can be calculated accurately from current logic.
   - Overall completion percentage, only if the current data model supports a meaningful calculation.
2. **Selected targets**
   - Character portrait, name, and relevant progression summary.
   - Visible progress and a clear route to edit or remove the target, using existing behavior.
3. **Material requirements**
   - Materials grouped by category where supported by existing data.
   - Owned quantity, required quantity, and shortage/surplus.
   - Strong visual distinction between incomplete and completed requirements.
4. **Inventory / resource input**
   - Make quantity editing easy to find and operate.
   - Keep values readable and controls consistent.
   - Clearly indicate when an amount is sufficient, missing, or exceeds the target.

Do not invent statistics or show placeholder values in the finished app. If a metric cannot be derived correctly, omit it rather than displaying misleading numbers. Avoid duplicate cards that merely repeat the same information.

## 6. Shared UI primitives

Create or standardize reusable primitives only where they reduce duplication. Potential components include:

- `Button` / `IconButton`
- `Card` / `Panel`
- `Badge` / status label
- `ProgressBar`
- `SectionHeader`
- Consistent input/number-input styling
- Empty state and confirmation feedback, if needed by existing workflows

Use clear component APIs and semantic HTML. Avoid building an elaborate abstraction layer for simple one-off elements. Reuse the existing `lucide-react` icons and keep icon sizes and stroke weights consistent.

## 7. Existing asset usage

Inspect the contents and current import patterns for:

- `src/assets/images/char_portrait/`
- `src/assets/images/class_elements/`
- `src/assets/images/materials/`

Use the real assets in their intended contexts. Preserve aspect ratios, use `object-fit` appropriately, and provide useful alt text where images convey meaning. Avoid stretching icons or portraits. Use fallbacks for missing assets only when necessary.

## 8. Technical constraints and preservation requirements

- Keep React + TypeScript + Vite.
- Keep the existing local persistence mechanism and its data format unless a migration is necessary. Do not silently clear or reset user data.
- Preserve existing calculation rules and selection semantics.
- Do not introduce a backend, authentication, analytics, or cloud sync.
- Do not add dependencies unless they materially improve the result; explain any proposed dependency before adding it.
- Avoid broad refactors unrelated to the redesign.
- Avoid `any` and unnecessary type assertions.
- Keep components reasonably focused and avoid duplicating business logic in the UI.
- Ensure keyboard accessibility: visible focus states, semantic buttons/inputs, labels, and sensible tab order.
- Do not communicate state using color alone; include text, icons, or other visual cues.
- Check color contrast, particularly for muted text and small labels.
- Respect reduced-motion preferences.
- Do not add fake data, fake buttons, or nonfunctional interactions.

## 9. Implementation plan

Work in small, verifiable stages:

### Stage 1 — Inspect and baseline

1. Read `package.json`, Vite/Tailwind configuration, entry points, global CSS, and all relevant layout/dashboard/selector/resource-input components.
2. Trace state and persistence: identify contexts, hooks, calculation utilities, and local-storage or other browser-storage code.
3. Run the existing build and lint commands to identify pre-existing errors before changing code.
4. Record the current important interactions and ensure they remain supported.

### Stage 2 — Foundation

1. Add or update design tokens and global styles.
2. Establish typography, background, text, borders, focus rings, and selection styles.
3. Style base controls consistently.
4. Confirm the app still builds.

### Stage 3 — Layout and dashboard

1. Update the existing layout components to match the design direction.
2. Redesign the dashboard using actual state and existing calculations.
3. Reuse existing portraits and material assets.
4. Improve hierarchy, density, spacing, and responsive behavior.

### Stage 4 — Selectors and inputs

1. Apply the visual system to character selection and resource input.
2. Improve selected, disabled, hover, focus, and validation states.
3. Ensure editing quantities and selecting/removing targets still work as before.

### Stage 5 — Verification and polish

1. Run `npm run build`.
2. Run `npm run lint`.
3. Fix new errors introduced by the redesign.
4. Test at wide desktop, typical laptop, and narrow/mobile widths.
5. Verify there is no horizontal overflow and all controls remain usable.
6. Verify existing saved data survives reloads and that calculations still produce the same results for the same inputs.
7. Summarize changed files, key design decisions, verification results, and any known limitations.

If a command fails because of a pre-existing issue, distinguish it from issues introduced by this work.

## 10. Definition of done

The work is complete when:

- The app has a coherent ZZZ-inspired visual identity across all existing screens.
- Colors, spacing, typography, borders, and controls are consistent.
- Existing character portraits and material assets are reused appropriately.
- Progress and shortages are easy to scan.
- All existing calculator features and local persistence continue to work.
- The layout works on desktop and narrow screens without horizontal overflow.
- Keyboard focus and accessible labels are present.
- `npm run build` and `npm run lint` pass, or any pre-existing failures are documented accurately.
- No fake metrics, placeholder content, dead controls, or unnecessary dependencies remain.

## 11. Agent working instructions

Before editing, inspect the actual source code. Do not assume component names, routes, state shape, or persistence implementation based only on the folder tree.

Make the redesign directly in the project, preserving business logic. Prefer incremental changes over replacing many files at once. After each stage, verify the build where practical. If an architectural choice is ambiguous, choose the least disruptive option and document it in the final summary.

**Expected deliverable:** a working visual redesign in the existing repository—not just a mockup, screenshots, or a proposal.
