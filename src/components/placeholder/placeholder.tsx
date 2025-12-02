import { type PlaceholderPropsInterface } from './placeholder.interface';
import { type FC } from 'react';
import { View, Image } from 'react-native';

const Placeholder: FC<PlaceholderPropsInterface> = (props) => {
  const { width, height, placeholderContent } = props;

  try {
    const contentURL = new URL(placeholderContent);

    return (
      <Image
        source={{ uri: contentURL.toString(), width, height }}
        style={{ width, height }}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
