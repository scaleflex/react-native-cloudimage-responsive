import { type ReactNode, type CSSProperties } from 'react';
import { type CoordinatesInterface } from '../../general.interface';

// TODO: Create sub-groups of operations to make this readable.
// TODO: Group code
// TODO: ... -__-

export interface PositionableCropInterface {
  topLeft?: CoordinatesInterface;
  bottomRight?: CoordinatesInterface;
  center?: CoordinatesInterface;
}

export interface AspectRatioInterface {
  from: number | string;
  to?: number | string; //TODO: debug string format check
}

export interface FocalPointInterface extends CoordinatesInterface {
  coordinatesType?: 'pixels' | 'percentage' | 'coefficient'; //TODO: "pixels" for default
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
  // 'pass' props
  src: string;
  alt?: string;
  style?: CSSProperties;

  // 'generic' props
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
  backgroundColor?: string; //TODO value check
  devicePixelRatio?: number; //TODO value check
  backgorundGravity?: BackgroundGravityType;

  // 'complex' props
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  gravity?: ImageGravityType;
  positionableCrop?: PositionableCropInterface;
  faceMargin?: number | CoordinatesInterface;
  aspectRatio?: AspectRatioInterface;
  radius?: number | RadiusInterface;
}

export interface FunctionCallerInterface {
  [index: string]: SetURLParamFunctionType<any>;
}

export type ConstructURLParamsFromPropsFunctionType =
  ({}: CloudImagePropsInterface) => URLSearchParams;

export type SetURLParamFunctionType<Type> = (
  key: string,
  value: Type,
  searchParams: URLSearchParams
) => void;

export type CloudImageFunctionType =
  ({}: CloudImagePropsInterface) => ReactNode;
