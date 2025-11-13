import { type InstallPluginFunctionType } from './general.interface';

//token.cloudimg.io/original_image_url?operations&filters&watermarks //TODO: check url format
//TODO: Check image format as well https://docs.cloudimage.io/transformations/input-formats

const POSSIBLE_DOMAINS: string[] = ['scaleflex']; //TODO: -__-

export let globalDomain: string = '';
export let globalStep: number = 0;

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

export const installCloudImage: InstallPluginFunctionType = (props) => {
  const { domain, step = 20 } = props;

  if (!checkDomain(domain)) {
    throw new Error('Invalid domain!');
  }

  globalDomain = domain;
  globalStep = step;
};
