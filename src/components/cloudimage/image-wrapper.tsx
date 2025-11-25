import { type ImageWrapperPropsInterface } from './cloudimage.interface';
import { useEffect, useState, type FC } from 'react';
import { Image } from 'react-native';

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

  const finalStyle = { ...style, width, height };

  return (
    <Image
      referrerPolicy={referrerPolicy}
      crossOrigin={crossOrigin}
      source={{ uri: src, width, height }}
      onLoad={onLoad}
      style={finalStyle}
      alt={alt ?? src}
    />
  );
};

export default ImageWrapper;
