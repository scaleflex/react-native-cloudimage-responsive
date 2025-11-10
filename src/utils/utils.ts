import {
  type ConstructImageSourceFunctionType,
  type InstallPluginFunctionType,
} from './utils.interface';

const POSSIBLE_DOMAINS: string[] = ['scaleflex'];

export let globalDomain: string = '';

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

export const constructImageSource: ConstructImageSourceFunctionType = (
  props
) => {
  const { src, width, height, func } = props;
  const url = new URL(src, globalDomain);
  const params = url.searchParams;

  if (width) {
    params.set('w', width.toString());
  }

  if (height) {
    params.set('h', height.toString());
  }

  if (func) {
    params.set('func', func);
  }

  return url.toString();
};

export const installCloudImage: InstallPluginFunctionType = ({
  domain: newDomain,
}) => {
  if (!checkDomain(newDomain)) {
    throw new Error('Invalid domain!');
  }

  globalDomain = newDomain;
};
