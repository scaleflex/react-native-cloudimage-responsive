import { type CSSProperties } from 'react';
import { type CoordinatesInterface } from '../../general.interface';

export interface PositionableCropInterface {
  topLeft?: CoordinatesInterface;
  bottomRight?: CoordinatesInterface;
  center?: CoordinatesInterface;
}

export interface FiltersPropertiesIntreface {}

export interface WatermarksPropertiesIntreface {}

export interface OperationsPropertiesIntreface {
  width?: number;
  height?: number;
  function?: ImageFuncType;
  preventEnlargement?: boolean;
  rotate?: number;
  trim?: number;
  removeBackgound?: boolean;
  margin?: number;
  upscaleImage?: boolean;
  blurBackground?: boolean;
  blurBackgroundValue?: number;
  backgroundOpacity?: number;
  backgroundTintColor?: number;
  backgroundColor?: string;
  devicePixelRatio?: number;
  backgorundGravity?: BackgroundGravityType;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  gravity?: ImageGravityType;
  positionableCrop?: PositionableCropInterface;
  faceMargin?: number | CoordinatesInterface;
  aspectRatio?: AspectRatioInterface;
  radius?: number | RadiusInterface;
}

export interface AspectRatioInterface {
  from: number | string;
  to?: number | string;
}

export interface FocalPointInterface extends CoordinatesInterface {
  coordinatesType?: 'pixels' | 'percentage' | 'coefficient';
}

export interface RadiusInterface {
  topLeft: number | 'max';
  topRight: number | 'max';
  bottomRight: number | 'max';
  bottomLeft: number | 'max';
}

export type ImageFuncType =
  | 'crop'
  | 'face'
  | 'cropfit'
  | 'bound'
  | 'fit'
  | 'boundmin'
  | 'cover'
  | 'facehide';

export type BackgroundGravityType =
  | 'north'
  | 'northwest'
  | 'northeast'
  | 'west'
  | 'centre'
  | 'center'
  | 'east'
  | 'southwest'
  | 'south'
  | 'southeast'
  | 'trim';

export type ImageGravityType =
  | 'auto'
  | 'face'
  | 'trim'
  | 'smart'
  | BackgroundGravityType
  | FocalPointInterface;

export interface CloudImagePropsInterface {
  src: string;
  alt?: string;
  limitFactor?: number;
  style?: CSSProperties;
  className?: string;
  operations?: OperationsPropertiesIntreface | string;
  watermarks?: WatermarksPropertiesIntreface | string; // TODO
  filters?: FiltersPropertiesIntreface | string; // TODO
}

export interface FunctionCallerInterface {
  [index: string]: SetURLParamFunctionType<any>;
}

export type ConstructURLParamsFromPropsFunctionType = (
  operations: OperationsPropertiesIntreface | string
) => string;

export type SetURLParamFunctionType<Type> = (
  key: string,
  value: Type,
  searchParams: URLSearchParams
) => void;
