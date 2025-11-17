import { useEffect, useRef, useState, type RefObject } from 'react'; //TODO: consider using useLayoutEffect

export default function useElementSizes<
  T extends HTMLElement = HTMLDivElement,
>(): [RefObject<T | null>, number, number] {
  const ref = useRef<T | null>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

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
  }, []);

  return [ref, width, height];
}
