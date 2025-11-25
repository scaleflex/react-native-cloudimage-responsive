import { type PlaceholderPropsInterface } from './placeholder.interface';
import { type FC } from 'react';
import { View } from 'react-native';

const Placeholder: FC<PlaceholderPropsInterface> = (props) => {
  const { width, height, placeholderContent } = props;

  try {
    new URL(placeholderContent);
    return <img src={placeholderContent} width={width} height={height} />;
  } catch (e) {}

  return (
    <View
      style={{
        minWidth: width,
        minHeight: height,
        backgroundColor: placeholderContent,
      }}
    />
  );
};

export default Placeholder;
