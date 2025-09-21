import { useEffect } from 'react';

/**
 * Custom hook that triggers a callback when a click is detected outside of the passed ref.
 * @param {React.RefObject} ref - The ref of the element to detect outside clicks for.
 * @param {Function} handler - The callback function to execute on an outside click.
 */
export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}
