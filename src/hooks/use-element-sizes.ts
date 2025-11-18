import { useEffect, useRef, useState, type RefObject } from 'react';
const DEFAULT_STATE_VALUE: number = 50;

export default function useElementSizes<T extends Element = HTMLDivElement>(): [
  RefObject<T | null>,
  number,
  number,
] {
  const ref = useRef<T | null>(null);

  const [width, setWidth] = useState<number>(DEFAULT_STATE_VALUE);
  const [height, setHeight] = useState<number>(DEFAULT_STATE_VALUE);

  if (typeof window === 'undefined') {
    return [ref, width, height];
  }

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setWidth(width);

        setHeight(height);
      }
    });

    const element = ref.current?.parentElement;

    if (!element) {
      return;
    }

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [window, ref]);

  return [ref, width, height];
}
