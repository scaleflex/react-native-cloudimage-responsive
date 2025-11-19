import { useEffect, useRef, useState, type RefObject } from 'react';
const DEFAULT_STATE_VALUE: number = 50;

export default function useElementObserver<
  T extends Element = HTMLDivElement,
>(): [RefObject<T | null>, number, number, boolean] {
  const ref = useRef<T | null>(null);

  const [width, setWidth] = useState<number>(DEFAULT_STATE_VALUE);
  const [height, setHeight] = useState<number>(DEFAULT_STATE_VALUE);
  const [isVisible, setVisibility] = useState<boolean>(false);

  if (typeof window === 'undefined') {
    return [ref, width, height, isVisible];
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setWidth(width);

        setHeight(height);
      }
    });

    const intersectoinObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisibility(true);
        }
      }
    });

    const element = ref.current?.parentElement;

    if (!element) {
      return;
    }

    resizeObserver.observe(element);
    intersectoinObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();

      intersectoinObserver.unobserve(element);
      intersectoinObserver.disconnect();
    };
  }, [window, ref]);

  return [ref, width, height, isVisible];
}
