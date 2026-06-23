# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at localhost:3000
npm run build      # Production build
npm test           # Jest test runner (watch mode)
npm run deploy     # Build + push to GitHub Pages (kefoto.github.io/p5landing)
```

## Architecture

This is a React + p5.js kinetic typography interactive website. All state lives in `Dashboard`, which passes a single `formData` object down to `Setting` (for editing) and `P5Canvas` (for rendering).

### Data flow

`Dashboard` (`src/layout/Dashboard.js`) owns `formData` and passes:
- `formData` + `onFormDataChange` → `Setting` (the control panel)
- `formData` → `P5Canvas` (the p5.js canvas)

### P5Canvas and the `dataRef` pattern

`P5Canvas` (`src/components/elements/P5Canvas.js`) runs a p5.js sketch that must not be restarted on every prop change. To avoid this:
- `dataRef` is a mutable ref that always holds the latest `formData`
- The p5 sketch reads from `dataRef.current` at draw time, never from closed-over props
- Separate `useEffect` hooks (keyed on specific props) handle side effects that require p5 API calls (tile grid rebuilds, graphics buffer redraws, click handler swaps)
- The main sketch `useEffect` only re-runs when `importData.text`, `importData.url`, or `isImage` changes — these require tearing down and recreating the p5 instance

### Tile system

`Tile` (`src/utils/Tile.js`) is a plain class (no React) representing one grid cell. Each tile tracks source (`sx/sy/sw/sh`) and destination (`dx/dy/dw/dh`) regions within a p5 offscreen graphics buffer (`pg`). Per-frame:
1. `update()` — repulsion physics: tiles within `radius` of the mouse are pushed away with velocity that decays by `friction` and springs back to origin by `ease`
2. `update2()` — drag physics: tiles near the cursor inherit mouse movement velocity
3. `wave()` — adds sinusoidal offsets to tile dimensions based on the active wave array
4. `p.copy()` — copies the tile's source region from the offscreen `pg` to its destination on the main canvas

### Setting panel

`Setting` (`src/layout/Setting.js`) drives its UI from `inputSectionMap` (sections → input descriptors) and `inputButtonModuleMap` (section → button type). Adding a new control means adding an entry to `inputSectionMap` with a matching `type` handled in `renderInput`.

### Styling

Tailwind CSS for layout/utility classes + MUI (Joy + Material) for interactive components (sliders, switches, icon buttons). `CollapseWrapper` and `CollapseWidthWrapper` in `src/components/wrapper/` are thin wrappers around MUI `Collapse`.
