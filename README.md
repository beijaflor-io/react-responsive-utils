# react-responsive-utils
Responsive utilities for React.js and Browsers, with support for the server.

Expects `process.env.IS_BROWSER` to be defined as true when on a browser
environment.

## Exported Utilities
- `MediaQuery` from `react-responsive`
- Helpers following _foundation_ breakpoints
  - `MediaSmall`
  - `MediaMedium`
  - `MediaLarge`
- Functions for the breakpoints
  - `isSmall`
  - `isMedium`
  - `isLarge`
- Constants for the breakpoints
  - `large`
  - `medium`
  - `small`
- `mediaQuery` builder
  - Composes multiple queries onto one
- `mountResponsive(store)`
  - Plants `redux-mediaquery` onto a redux store
- `responsiveReducer` is `redux-mediaquery`'s reducer

## License
MIT
