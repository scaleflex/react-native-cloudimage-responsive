import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import { getURLParamsString } from './cloudimage.utils';
import { useState, type FC } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Placeholder from '../placeholder/placeholder';
import ImageWrapper from './image-wrapper';
import { styles } from './cloudimage.styles';

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

  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);
  const isContainerValid = containerWidth * containerHeight > 0;
  const shouldLoadImage = isContainerValid || !lazyLoading;

  const handleLayoutChange = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout;

    setContainerHeight(height);
    setContainerWidth(width);
  };

  return (
    <View onLayout={handleLayoutChange} style={styles.imageContainer}>
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
