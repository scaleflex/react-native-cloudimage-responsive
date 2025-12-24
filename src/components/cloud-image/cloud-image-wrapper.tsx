import type { ImageWrapperPropsInterface } from './cloud-image.interface';
import { useEffect, useState, type FC } from 'react';
import { Image } from 'react-native';

const CloudImageWrapper: FC<ImageWrapperPropsInterface> = (props) => {
  const { src, style } = props;

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
      {...props}
      source={{ uri: src, width, height }}
      style={{ ...style, width, height }}
    />
  );
};

export default CloudImageWrapper;
