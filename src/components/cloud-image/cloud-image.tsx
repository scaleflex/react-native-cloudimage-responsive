import type { CloudImagePropsInterface } from './cloud-image.interface';
import { constructImageSource, config } from '../../general.utils';
import { getURLParamsString } from './cloud-image.utils';
import { useEffect, useRef, useState, type FC } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Placeholder from '../../components/placeholder/placeholder';
import CloudImageWrapper from './cloud-image-wrapper';
import { Dimensions } from 'react-native';
import { styles } from './cloud-image.styles';

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const {
    limitFactor: globalLimitFactor,
    lazyLoading,
    placeholderBackground: globalPlaceholderBackground,
    lazyInterval,
    lazyThreshold,
  } = config;

  const {
    src: imageSrc,
    style,
    alt,
    placeholderBackground = globalPlaceholderBackground,
    wrapperStyle,
    onLoad = () => {},
  } = props;

  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isVisible, setVisibility] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
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
          const rectTop = pageY - lazyThreshold;
          const rectBottom = pageY + height + lazyThreshold;
          const rectWidth = pageX + width + lazyThreshold;

          const isRectVisible =
            rectBottom >= 0 &&
            rectTop <= windowHeight &&
            rectWidth > 0 &&
            rectWidth <= windowWidth + 2 * lazyThreshold;

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
  }, [lazyInterval, lazyThreshold]);

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
    <View
      onLayout={handleLayoutChange}
      style={{ ...styles.wrapper, ...wrapperStyle }}
      ref={ref}
    >
      {!isLoaded && (
        <Placeholder
          placeholderContent={placeholderBackground}
          width={containerWidth}
          height={containerHeight}
        />
      )}

      {shouldLoadImage && (
        <CloudImageWrapper
          {...props}
          onLoad={(event) => {
            setLoaded(true);
            onLoad(event);
          }}
          src={src}
          style={style}
          alt={alt ?? src}
        />
      )}
    </View>
  );
};

export default CloudImage;
