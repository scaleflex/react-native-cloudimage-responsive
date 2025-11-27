export interface CoordinatesInterface {
  x: number;
  y: number;
}

export type Pair<Type1, Type2> = [Type1, Type2];

export interface ConfigurationConfigInterface {
  token: string;
  placeholderBackground: string;
  domain: string;
  baseUrl: string;
  limitFactor: number;
  lazyLoading: boolean;
  doNotReplaceURL: boolean;
  devicePixelRatioList: number[];
}

export interface InstallPluginPropsInterface {
  token?: string;
  placeholderBackground?: string;
  domain?: string;
  baseUrl?: string;
  limitFactor?: number;
  lazyLoadOffset?: number;
  lazyLoading?: boolean;
  doNotReplaceURL?: boolean;
  devicePixelRatioList?: number[];
}

export type InstallPluginFunctionType =
  ({}: InstallPluginPropsInterface) => void;
