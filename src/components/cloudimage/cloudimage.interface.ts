import { type ReactNode, type CSSProperties } from 'react';
import { type Pair, type CoordinatesInterface } from '../../general.interface';

// TODO: Create sub-groups of operations to make this readable.
// TODO: Group code
//TODO: ... -__-

export interface PositionableCropInterface {
  topLeft?: CoordinatesInterface;
  bottomRight?: CoordinatesInterface;
  center?: CoordinatesInterface;
}

export interface AspectRatioInterface {
  decimal?: number | Pair<number>;
  ratio?: string | Pair<string>; //TODO: string format check
}

export interface FocalPointInterface extends CoordinatesInterface {
  coordinatesType?: 'pixels' | 'percentage' | 'coefficient'; //TODO: "pixels" for default
}

export interface RadiusInterface {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
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
  width?: number;
  height?: number;
  function?: ImageFuncType;
  alt?: string;
  style?: CSSProperties;
  preventEnlargement?: boolean;
  gravity?: ImageGravityType; // TODO: used only with func = crop
  positionableCrop?: PositionableCropInterface;
  faceMargin?: number | CoordinatesInterface; //TODO: only when func=face | facehide
  aspectRatio?: AspectRatioInterface;
  devicePixelRatio?: number; //TODO: 1 - 5
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  rotate?: number;
  trim?: number;
  radius?: number | RadiusInterface;
  removeBackgound?: boolean;
  // TODO: only when func = fit;
  margin?: number;
  backgroundColor?: string; //TODO: string check
  upscaleImage?: boolean;
  blurBackground?: boolean;
  blurBackgroundValue?: number;
  backgroundOpacity?: number;
  backgroundTintColor?: number;
  backgorundGravity?: BackgroundGravityType;
}

export interface FunctionCallerInterface {
  [index: string]: URLParamFunctionType;
}

export type ConstructURLParamsFromPropsFunctionType =
  ({}: CloudImagePropsInterface) => URLSearchParams;

export type URLParamFunctionType = (
  key: string,
  value: any,
  searchParams: URLSearchParams
) => void;

export type CloudImageFunctionType =
  ({}: CloudImagePropsInterface) => ReactNode;
