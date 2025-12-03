import {
  type InstallPluginFunctionType,
  type ConfigurationConfigInterface,
} from './general.interface';

export let config: ConfigurationConfigInterface = {
  token: '',
  placeholderBackground: '#000000',
  domain: 'cloudimage.io',
  baseUrl: '/',
  limitFactor: 100,
  lazyLoading: true,
  lazyInterval: 1000,
  lazyTreeshold: 50,
  doNotReplaceURL: false,
  devicePixelRatioList: [1, 1.5, 2],
};

export const constructImageSource = (
  src: string,
  searchParamsString: string = ''
) => {
  const { domain, token, baseUrl, doNotReplaceURL } = config;

  if (doNotReplaceURL) {
    return `${src}?${searchParamsString}`;
  }

  const url = new URL(`https://${token}.${domain}/${baseUrl}${src}`);

  return `${url.toString()}?${searchParamsString}`;
};

export const installCloudImage: InstallPluginFunctionType = (props) => {
  config = { ...config, ...props };
};
