import { type CloudImagePropsInterface } from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import { getURLParamsString } from './cloudimage.utils';
import { useEffect, useRef, useState, type FC } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Placeholder from '../placeholder/placeholder';
import ImageWrapper from './image-wrapper';
import { Dimensions } from 'react-native';
import { styles } from './cloudimage.styles';

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const {
    limitFactor: globalLimitFactor,
    lazyLoading,
    placeholderBackground: globalPlaceholderBackground,
    lazyInterval: globalLazyInterval,
  } = config;

  const {
    src: imageSrc,
    style,
    alt,
    referrerPolicy = 'strict-origin-when-cross-origin',
    crossOrigin = 'anonymous',
    placeholderBackground = globalPlaceholderBackground,
    lazyInterval = globalLazyInterval,
  } = props;

  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isVisible, setVisibility] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('oleg');
      const { height: windowHeight, width: windowWidth } =
        Dimensions.get('window');

      ref.current?.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          const rectTop = pageY;
          const rectBottom = pageY + height;
          const rectWidth = pageX + width;

          const isRectVisible =
            rectBottom !== 0 &&
            rectTop >= 0 &&
            rectBottom <= windowHeight &&
            rectWidth > 0 &&
            rectWidth <= windowWidth;

          if (isRectVisible) {
            setVisibility(true);
            clearInterval(interval);
          }
        }
      );
    }, lazyInterval);

    return () => {
      clearInterval(interval);
    };
  }, [lazyInterval]);

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);
  const isContainerValid = containerWidth * containerHeight > 0;
  const shouldLoadImage = (isVisible && isContainerValid) || !lazyLoading;

  const handleLayoutChange = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout;

    setContainerHeight(height);
    setContainerWidth(width);
  };

  return (
    <View onLayout={handleLayoutChange} style={styles.imageContainer} ref={ref}>
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
