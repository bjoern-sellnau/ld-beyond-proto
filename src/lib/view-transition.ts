import * as React from "react";

type ViewTransitionProps = {
  children?: React.ReactNode;
  name?: string;
  enter?: string;
  exit?: string;
  update?: string;
  share?: string;
  default?: string;
};

/**
 * React's <ViewTransition> wird von Next.js' gebundeltem React-Build
 * exportiert (aktiviert via experimental.viewTransition), ist aber noch
 * nicht in den stabilen @types/react enthalten – daher dieser Typ-Shim.
 */
export const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<ViewTransitionProps>;
  }
).ViewTransition;
