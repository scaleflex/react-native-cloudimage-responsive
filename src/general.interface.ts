export interface CoordinatesInterface {
  x: number;
  y: number;
}

export type Pair<Type> = [Type, Type];

export interface ConfigurationConfigInterface {
  token: string;
  placeholderBackground: string;
  customDomain: string;
  baseUrl: string;
  limitFactor: number;
  lazyLoadOffset: number;
  lazyLoading: boolean;
  delay: number;
  doNotReplaceURL: boolean;
  devicePixelRatioList: number[];
}

export interface InstallPluginPropsInterface {
  token?: string;
  placeholderBackground?: string;
  customDomain?: string;
  baseUrl?: string;
  limitFactor?: number;
  lazyLoadOffset?: number;
  lazyLoading?: boolean;
  delay?: number;
  doNotReplaceURL?: boolean;
  devicePixelRatioList?: number[];
}

export type InstallPluginFunctionType =
  ({}: InstallPluginPropsInterface) => void;
