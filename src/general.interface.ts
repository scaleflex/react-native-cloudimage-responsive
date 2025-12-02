export interface CoordinatesInterface {
  x: number;
  y: number;
}

export type Pair<Type1, Type2> = [Type1, Type2];

export interface ConfigurationConfigInterface {
  lazyTreeshold: number;
  token: string;
  placeholderBackground: string;
  domain: string;
  baseUrl: string;
  limitFactor: number;
  lazyLoading: boolean;
  lazyInterval: number;
  doNotReplaceURL: boolean;
  devicePixelRatioList: number[];
}

export interface InstallPluginPropsInterface {
  lazyTreeshold?: number;
  token?: string;
  placeholderBackground?: string;
  domain?: string;
  baseUrl?: string;
  limitFactor?: number;
  lazyInterval?: number;
  lazyLoadOffset?: number;
  lazyLoading?: boolean;
  doNotReplaceURL?: boolean;
  devicePixelRatioList?: number[];
}

export type InstallPluginFunctionType = (
  props: InstallPluginPropsInterface
) => void;
