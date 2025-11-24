import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import useElementObserver from '../../hooks/use-element-observer';
import { getURLParamsString } from './cloudimage.utils';
import { useState, type FC } from 'react';
import { View } from 'react-native';
import Placeholder from '../placeholder/placeholder';
import ImageWrapper from './image-wrapper';

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
    referrerPolicy = 'strict-origin-when-cross-origin',
    crossOrigin = 'anonymous',
    placeholderBackground = globalPlaceholderBackground,
  } = props;

  const [ref, containerWidth, containerHeight, isVisible] =
    useElementObserver<any>(); //TODO: get rid of any
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);
  const shouldLoadImage = isVisible || !lazyLoading;

  return (
    <View ref={ref}>
      {!isLoaded && (
        <Placeholder
          placeholderContent={placeholderBackground}
          width={containerWidth}
          height={containerHeight}
        />
      )}

      {shouldLoadImage && (
        <ImageWrapper
          onLoad={() => {
            setLoaded(true);
          }}
          referrerPolicy={referrerPolicy}
          crossOrigin={crossOrigin}
          src={src}
          style={style}
          alt={alt ?? src}
        />
      )}
    </View>
  );
};

export default CloudImage;
