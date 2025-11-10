import { type CloudImageFunctionType } from './cloudimage.interface';
import { constructImageSource } from '../../utils/utils';

const CloudImage: CloudImageFunctionType = (props) => {
  const { style, alt } = props;

  const src = constructImageSource(props);

  return <img src={src} style={style} alt={alt ? alt : src} />;
};

export default CloudImage;
