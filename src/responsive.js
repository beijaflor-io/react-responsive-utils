/* eslint-disable react/prop-types */
import MediaQuery from 'react-responsive';
import React from 'react';
import matchMediaModule from 'matchmedia';
import {reducer as responsiveReducer, mediaQueryTracker} from './responsive/redux-mediaquery';

let matchMedia;
if (!process.env.IS_BROWSER) {
  matchMedia = function server$matchMedia() {
    return {
      matches: false,
    };
  };
} else {
  matchMedia = matchMediaModule;
}
global.matchMedia = matchMediaModule;

export {MediaQuery};
export {matchMedia};
export {responsiveReducer};

export const large = '(min-width: 64.063em)';
export const medium = '(min-width: 40.063em)';
export const small = '(max-width: 40.063em)';

export function mountResponsive(store) {
  if (process.env.IS_BROWSER) {
    const tracker = mediaQueryTracker({
      isPhone: small,
      isTablet: medium,
      isDesktop: large,
      isSmall: small,
      isMedium: medium,
      isLarge: large,
      innerWidth: true,
      innerHeight: true,
    });

    const dispatch = store.dispatch.bind(store);
    store.dispatch(() => {
      return tracker(dispatch);
    });
  }
}

export function mediaQuery(...queries) {
  return queries.filter(x => x).join(' and ');
}

export function isSmall() {
  return matchMedia(small).matches &&
    !matchMedia(medium).matches;
}

export function isMedium() {
  return matchMedia(medium).matches &&
    !matchMedia(large).matches;
}

export function isLarge() {
  return matchMedia(large).matches;
}

export function MediaSmall(props) {
  if (!process.env.IS_BROWSER) {
    return null;
  }

  return (
    <MediaQuery query={mediaQuery(small, props.query)}>
      {props.children}
    </MediaQuery>
  );
}

export function MediaMedium(props) {
  if (!process.env.IS_BROWSER) {
    return <div>{props.children}</div>;
  }

  return (
    <MediaQuery query={mediaQuery(medium, props.query)}>
      {props.children}
    </MediaQuery>
  );
}

export function MediaLarge(props) {
  if (!process.env.IS_BROWSER) {
    return <div>{props.children}</div>;
  }

  return (
    <MediaQuery query={mediaQuery(large, props.query)}>
      {props.children}
    </MediaQuery>
  );
}
