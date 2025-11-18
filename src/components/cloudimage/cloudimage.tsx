import {
  type CloudImagePropsInterface,
  type ImageWrapperPropsInterface,
} from './cloudimage.interface';
import { constructImageSource, config } from '../../general.utils';
import useElementSizes from '../../hooks/use-element-sizes';
import { getURLParamsString } from './cloudimage.utils';
import { useEffect, useState, type FC } from 'react';
import { Image } from 'react-native';
import Placeholder from '../placeholder/placeholder';

const ImageWrapper: FC<ImageWrapperPropsInterface> = (props) => {
  const {
    src,
    referrerPolicy,
    crossOrigin,
    style,
    alt,
    onLoad = () => {},
  } = props;

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    Image.getSize(
      src,
      (imageWidth, imageHeight) => {
        setHeight(imageHeight);
        setWidth(imageWidth);
      },
      (error) => {
        throw new Error(`Error getting image size: ${error}`);
      }
    );
  }, [src]);

  if (width === 0 || height === 0) {
    return;
  }

  return (
    <Image
      referrerPolicy={referrerPolicy}
      crossOrigin={crossOrigin}
      source={{ uri: src, width, height }}
      onLoad={() => {
        onLoad();
        console.log(src);
      }}
      style={style}
      alt={alt ?? src}
    />
  );
};

const CloudImage: FC<CloudImagePropsInterface> = (props) => {
  const {
    limitFactor: globalLimitFactor,
    //lazyLoading,
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

  const [ref, containerWidth, containerHeight] =
    useElementSizes<HTMLDivElement>();
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const searchParamsString = getURLParamsString({
    containerHeight,
    containerWidth,
    limitFactor: globalLimitFactor,
    ...props,
  });

  const src = constructImageSource(imageSrc, searchParamsString);

  return (
    <div ref={ref}>
      {!isLoaded && (
        <Placeholder
          placeholderContent={placeholderBackground}
          width={containerWidth}
          height={containerHeight}
        />
      )}

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
    </div>
  );
};

export default CloudImage;
