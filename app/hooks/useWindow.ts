import { createContext, useContext } from 'react';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const Context = createContext(canUseDOM ? window : undefined);

export const WindowProvider = Context.Provider;

/**
 * The document "window" placed in React context. Helpful for determining
 * SSR context, or when rendering into an iframe.
 *
 * @returns the current window
 */
export default function useWindow() {
  return useContext(Context);
}
