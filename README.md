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
│   ├── introduction/        01 · Introduction: Introduction.tsx, SiteIndex.tsx
│   ├── concept/             02 · Concept: Concept.tsx (text and public vs. private table)
│   ├── development/         03 · Development: Development.tsx, RecordFlow.tsx (diagram)
│   ├── example/             04 · Example: Example.tsx, TraceActivity.tsx (find the changed record)
│   ├── benefits/            05 · Benefits & Limitations: Benefits.tsx
│   ├── glossary/            06 · Glossary: Glossary.tsx (search + "appears in" links)
│   ├── faq/                 07 · FAQ: Faq.tsx (questions that open and close)
│   ├── contact/             08 · Contact: Contact.tsx, ContactForm.tsx (opens the email app)
│   └── footer/              Footer.tsx, footer.css
│
├── components/              Reusable pieces, used by more than one section
│   ├── Section/             Wrapper for every section: number, header, and container
│   ├── SectionHeader/       Big number + label + title (used by Section)
│   ├── ArticleLayout/       Text with a side column of fields and an illustration
│   ├── Fields/              Label + value list (manifest fields)
│   ├── ExternalLink/        Link that opens in a new tab, with ↗ and a screen reader note
│   ├── SectionPlaceholder/  Empty reserved section, for a new section that is not written yet
│   ├── Term/                Glossary word inside a paragraph (links to #term-{id})
│   ├── Barcode/             Barcode drawn from a hash or generated from a seed
│   ├── Logo/                ChainLedger mark
│   ├── icons/               Icons: animated arrows and close (@animateicons/react), accessibility symbol
│   ├── BackToTop/           Floating "back to the top" button
│   ├── chatbot/             "Ask Blocky" chatbot and the Blocky mascot
│   ├── illustrations/       Illustrations: image + animated SVG layer (ledger, crate, envelope, nodes, mangoes, scale, bubbles).
│   │                        The new ones are PNG at 3x; their SVG sources are in src/assets/illustrations/source/
│   ├── FloatingButton/      Shared styles for the floating buttons
│   └── accessibility/       Accessibility panel, reading guide/mask, voice reader hooks
│
├── lib/                     Logic without UI
│   ├── hash.ts              Short hash + block chaining for the demo
│   ├── chatbot.ts           Finds the best chatbot answer (keywords, no AI)
│   ├── a11y.ts              Accessibility settings (state, saving, applying)
│   └── voiceReader.ts       Read-aloud with the browser voice
│
├── data/site.ts             Sections, project info, authors, and group email
├── data/glossary.ts         The ten glossary words
├── data/chatKnowledge.ts    Chatbot questions and answers (add new ones here)
└── styles/                  tokens.css (design variables) and global.css (base styles)
```

Every file starts with a `@file` comment that explains what it does, and every
component and function has JSDoc with its parameters.

## Sections

| # | Section | Writer | Status |
|---|---|---|---|
| 01 | Introduction | José Alfredo Medrano Saravia | Done |
| 02 | Concept | Didier Aarón Mayorga Hernández | Done |
| 03 | Development | José Alfredo Medrano Saravia | Done |
| 04 | Example | Didier Aarón Mayorga Hernández | Done |
| 05 | Benefits & Limitations | Didier Aarón Mayorga Hernández | Done |
| 06 | Glossary | José Alfredo Medrano Saravia | Done |
| 07 | FAQ | Didier Aarón Mayorga Hernández | Done |
| 08 | Contact | José Alfredo Medrano Saravia | Done |

## Filling a reserved section

1. Create `src/sections/<name>/<Name>.tsx` and `<name>.css`.
2. Wrap it in `<Section id="<id>" title="…">`. It adds the section number, the
   header, and the container. For text with a side column, use `<ArticleLayout>`;
   for label + value data, use `<Fields>`.
3. Import it in `App.tsx` and replace its `<SectionPlaceholder id="…" />` with your component.

The menu, the site index, and the footer already link to it, because they read the
list in `src/data/site.ts`.

For glossary words inside a text, use `<Term id="hash">hash</Term>`. In the Glossary
section, give each definition the matching id (`id="term-hash"`).
