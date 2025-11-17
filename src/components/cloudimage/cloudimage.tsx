//TODO: remaster lazy loading

import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import useElementSizes from '../../hooks/use-element-sizes';
import { getURLParamsString } from './cloudimage.utils';
import { useState, type FC } from 'react';
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
  const [ref, containerWidth, containerHeight] =
    useElementSizes<HTMLImageElement>();

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);

  const imageVisibility = isImageLoading ? 'hidden' : 'visible';

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
