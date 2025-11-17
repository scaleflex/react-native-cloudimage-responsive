//TODO: remaster lazy loading
//TODO: create custom hook and move some code there

import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import { getURLParamsString } from './cloudimage.utils';
import { useState, type FC, useRef, useEffect } from 'react';
import Placeholder from '../placeholder/placeholder';

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const {
    limitFactor: globalLimitFactor,
    lazyLoading,
    placeholderBackground: globalPlaceholderBackground,
  } = config;

  const {
    src: imageSrc,
    style,
    alt,
    className = '',
    placeholderBackground = globalPlaceholderBackground,
  } = props;

  const [isImageLoading, setImageLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0); //TODO
  const [containerHeight, setContainerHeight] = useState<number>(0); //TODO
  const ref = useRef<null | HTMLImageElement>(null);

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);

  const imageVisibility = isImageLoading ? 'hidden' : 'visible';

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setContainerWidth(width);

        setContainerHeight(height);
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
    console.log('Loading image: ' + src);
  }

  return (
    <>
      <Placeholder
        placeholderContent={placeholderBackground}
        isResourceLoading={isImageLoading}
        width={containerWidth}
        height={containerHeight}
      />
      <img
        className={className}
        ref={ref}
        src={src}
        style={{ ...style, visibility: imageVisibility }}
        alt={alt ?? src}
        loading={lazyLoading ? 'lazy' : 'eager'}
        onLoad={() => {
          setImageLoading(false);
        }}
      />
    </>
  );
};

export default CloudImage;
