//TODO: monitor viewport for lazyloading
//TODO: width value - "auto";
//TODO: update placeholder

import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, globalStep } from '../../general.utils';
import { constructURLParamsFromProps } from './cloudimage.utils';
import { useState, type FC, useRef, useEffect } from 'react';

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const { src: imageSrc, style, alt, step = globalStep } = props;

  const [isImageLoading, setImageLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const ref = useRef<null | HTMLImageElement>(null);

  const searchParams = constructURLParamsFromProps(props);
  const src = constructImageSource(imageSrc, searchParams);
  const imageVisibility = isImageLoading ? 'hidden' : 'visible';
  const placeholdeDisplay = isImageLoading ? 'inline' : 'none';

  const handleContainerResize = (prevValue: number, value: number): number => {
    const hasExceededStep = Math.abs(prevValue - value) > step;

    return hasExceededStep ? value : prevValue;
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setContainerWidth((prevWidth) => {
          return handleContainerResize(prevWidth, width);
        });

        setContainerHeight((prevHeight) => {
          return handleContainerResize(prevHeight, height);
        });
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

  if (isImageLoading) {
    console.log('Loading image: ' + src + '.');
  }

  console.log('Container width: ', containerWidth);
  console.log('Container height: ', containerHeight);

  return (
    <>
      <div style={{ display: placeholdeDisplay }}>Placeholder</div>
      <img
        ref={ref}
        src={src}
        style={{ ...style, visibility: imageVisibility }}
        alt={alt ? alt : src}
        onLoad={() => {
          console.log('Loading of an image: ' + src + ' has finished'); //TODO: remove

          setImageLoading(false);
        }}
      />
    </>
  );
};

export default CloudImage;
