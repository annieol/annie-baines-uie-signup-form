# Sign-Up Form

A sign-up form for receiving marketing updates, built with Angular 22. Requires Requires Node 20.11 or later.

## Getting started

```bash
npm install
npm start
```

Navigate to `http://localhost:4200/`.

## Running tests

```bash
npm test
```

## Mock API

The sign-up endpoint (`POST /api/sign-ups`) is mocked with MSW and returns a `200` response after a short delay, so the pending state is visible. The mock only runs in development (`src/mocks/`) and isn't included in production builds. You can see the request in the browser's Network tab.

## Decisions

- **Signal forms** - less boilerplate than reactive forms, error messages are coupled with validators, and signals are the modern approach to reactivity in Angular.
- **MSW (Mock Service Worker)** - intercepts requests at the network level, so the service and HttpClient work exactly as they would against a real API, without needing a separate server. The user runs `npm start` and everything works.
- **BEM** - although Angular encapsulates component styles, BEM provides readable class names and reduces the risk of clashes with global styles if the app is extended.
- **Accessibility** - fields have associated labels, error messages are linked with `aria-describedby` and `aria-invalid`. On an invalid submit, focus moves to the first invalid field, so screen readers announce its label and error. On a successful submit, focus moves to the confirmation heading. Tested with VoiceOver.
- **Extensibility** - fields are rendered from a config array, so adding a question means adding a config entry and a validator.
- **Responsive design** - I took a mobile first approach with a single desktop breakpoint at 1024px.

## Assumptions

- All fields are required.
- The form is a single page with no routing needed.
- Marketing consent (e.g. a checkbox with legal wording) would be required before launch — listed as a next step rather than assuming the wording.

## AI use

I used Claude to help plan the project, define the accessibility requirements and decide what to test. I also used it to review my code after writing it. Where it drafted code, including some of the tests, I reviewed and adapted it myself.

## Next steps

- Marketing consent checkbox with legal wording
- Reusable field component per input type
- Routing and additional pages
- Move form schema to a separate file
- Playwright end-to-end tests
