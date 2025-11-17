//TODO: update placeholder
//TODO: remaster lazy loading
//TODO: create custom hook and move some code there

import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import { getURLParamsString } from './cloudimage.utils';
import { useState, type FC, useRef, useEffect } from 'react';

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const { limitFactor: globalLimitFactor, lazyLoading } = config;
  const { src: imageSrc, style, alt, className = '' } = props;

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
  const placeholdeDisplay = isImageLoading ? 'inline' : 'none';

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
      <div style={{ display: placeholdeDisplay }}>Placeholder</div>
      <img
        className={className}
        ref={ref}
        src={src}
        style={{ ...style, visibility: imageVisibility }}
        alt={alt ? alt : src}
        loading={lazyLoading ? 'lazy' : 'eager'}
        onLoad={() => {
          setImageLoading(false);
        }}
      />
    </>
  );
};

export default CloudImage;
