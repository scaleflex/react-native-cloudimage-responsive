export interface CoordinatesInterface {
  x: number;
  y: number;
}

export type Pair<Type> = [Type, Type];

export interface InstallPluginPropsInterface {
  domain: string;
  limitFactor?: number;
  lazyLoading?: boolean;
}

export type InstallPluginFunctionType =
  ({}: InstallPluginPropsInterface) => void;
