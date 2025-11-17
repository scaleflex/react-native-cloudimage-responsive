import { type PlaceholderPropsInterface } from './placeholder.interface';
import { type FC } from 'react';

const Placeholder: FC<PlaceholderPropsInterface> = (props) => {
  const { isResourceLoading, width, height, placeholderContent } = props;

  if (!isResourceLoading) {
    return;
  }

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
