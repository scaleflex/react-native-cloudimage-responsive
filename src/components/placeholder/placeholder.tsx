import { type PlaceholderPropsInterface } from './placeholder.interface';
import { type FC } from 'react';

const Placeholder: FC<PlaceholderPropsInterface> = (props) => {
  const { width, height, placeholderContent } = props;

  try {
    new URL(placeholderContent);
    return <img src={placeholderContent} width={width} height={height} />;
  } catch (e) {}

  return (
    <div
      style={{
        minWidth: width,
        minHeight: height,
        backgroundColor: placeholderContent,
      }}
    />
  );
};

export default Placeholder;
