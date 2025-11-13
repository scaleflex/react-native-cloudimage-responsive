import {
  type InstallPluginFunctionType,
  type ConfigurationConfigInterface,
} from './general.interface';

export let config: ConfigurationConfigInterface = {
  token: 'demo',
  placeholderBackground: '#f4f4f4', //TODO
  customDomain: 'cloudimage.io',
  baseUrl: '/',
  limitFactor: 100, //TODO: check
  lazyLoadOffset: 100, //TODO
  lazyLoading: true, //TODO
  delay: 0, //TODO
  doNotReplaceURL: false, //TODO
  devicePixelRatioList: [1, 1.5, 2], //TODO
};

export const constructImageSource = (
  src: string,
  searchParams: URLSearchParams = new URLSearchParams()
) => {
  const { customDomain, token, baseUrl } = config;

  const url = new URL(
    'https://' + token + '.' + customDomain + '/' + baseUrl + src
  );

  return url.toString() + '?' + searchParams.toString();
};

export const installCloudImage: InstallPluginFunctionType = (props) => {
  //Todo: collect scren info and pass to config
  config = { ...config, ...props };
};
