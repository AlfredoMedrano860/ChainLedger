# ChainLedger

Private Blockchain for Corporate Auditing and Inventory.

Student microsite for **TM-6300 Grammar and Composition I**, Universidad de Costa Rica.
Authors: Didier Aarón Mayorga Hernández and José Alfredo Medrano Saravia.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Built with React, TypeScript, and Vite. The visual rules (colors, fonts, components)
are in [`DESIGN.md`](DESIGN.md).

## Project structure

```
src/
├── main.tsx                 Entry point: global styles + mounts <App />
├── App.tsx                  Page layout: header, sections in order, footer
│
├── sections/                One folder per section of the page
│   ├── header/              Header.tsx, header.css, useActiveSection.ts
│   ├── hero/                Hero.tsx, LedgerChain.tsx (interactive chain), ledgerData.ts
│   ├── introduction/        Introduction.tsx (01 · More Than Bitcoin), SiteIndex.tsx
│   └── footer/              Footer.tsx, footer.css
│
├── components/              Reusable pieces, used by more than one section
│   ├── SectionHeader/       Big number + label + title for every section
│   ├── Term/                Glossary word inside a paragraph (links to #term-{id})
│   ├── Barcode/             Barcode drawn from a hash
│   ├── Logo/                ChainLedger mark
│   ├── icons/               Arrow, close, and accessibility icons
│   ├── BackToTop/           Floating "back to the top" button
│   ├── FloatingButton/      Shared styles for the floating buttons
│   └── accessibility/       Accessibility panel, reading guide/mask, voice reader hooks
│
├── lib/                     Logic without UI
│   ├── hash.ts              Short hash + block chaining for the demo
│   ├── a11y.ts              Accessibility settings (state, saving, applying)
│   └── voiceReader.ts       Read-aloud with the browser voice
│
├── data/site.ts             Sections, project info, and authors (edit texts here)
└── styles/                  tokens.css (design variables) and global.css (base styles)
```

Every file starts with a `@file` comment that explains what it does, and every
component and function has JSDoc with its parameters.

## Adding a new section

1. Create `src/sections/<name>/<Name>.tsx` and `<name>.css`.
2. Wrap it in `<section id="<id>" className="sec">` and start with
   `<SectionHeader number={…} label="…" title="…" titleId="…" />`.
3. Import it in `App.tsx` and place it inside `<main>` in order.

The menu, the site index, and the footer already link to it, because they read the
list in `src/data/site.ts`.

For glossary words inside a text, use `<Term id="hash">hash</Term>`. In the Glossary
section, give each definition the matching id (`id="term-hash"`).
