import { type CloudImageFunctionType } from './cloudimage.interface';
import { constructImageSource } from '../../general.utils';
import { constructURLParamsFromProps } from './cloudimage.utils';

const CloudImage: CloudImageFunctionType = (props) => {
  const { src: imageSrc, style, alt } = props;

  const searchParams = constructURLParamsFromProps(props);
  const src = constructImageSource(imageSrc, searchParams);

  console.log(src); //TODO: remove

  return <img src={src} style={style} alt={alt ? alt : src} />;
};

export default CloudImage;
