import { type InstallPluginFunctionType } from './general.interface';

//token.cloudimg.io/original_image_url?operations&filters&watermarks //TODO: check url format
//TODO: Check image format as well https://docs.cloudimage.io/transformations/input-formats

const POSSIBLE_DOMAINS: string[] = ['scaleflex'];

export let globalDomain: string = ''; //TODO: -__-

export const checkDomain = (domain: string): boolean => {
  let result: boolean = false;

  for (let possibleDomain of POSSIBLE_DOMAINS) {
    if (domain.includes(possibleDomain)) {
      result = true;
      break;
    }
  }

  return result;
};

export const constructImageSource = (
  src: string,
  searchParams: URLSearchParams = new URLSearchParams()
) => {
  const url = new URL(src, globalDomain);

  return url.toString() + '?' + searchParams.toString();
};

export const installCloudImage: InstallPluginFunctionType = ({
  domain: newDomain,
}) => {
  if (!checkDomain(newDomain)) {
    throw new Error('Invalid domain!');
  }

  globalDomain = newDomain;
};
