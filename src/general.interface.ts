export interface CoordinatesInterface {
  x: number;
  y: number;
}

export type Pair<Type> = [Type, Type];

export interface InstallPluginPropsInterface {
  domain: string;
}

export type InstallPluginFunctionType =
  ({}: InstallPluginPropsInterface) => void;
