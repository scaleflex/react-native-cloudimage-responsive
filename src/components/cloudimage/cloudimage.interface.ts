import { type CoordinatesInterface } from '../../general.interface';
import { type ImageStyle } from 'react-native';

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

export type CrossOriginType = 'anonymous' | 'use-credentials';

export type ReferrerPolicyType =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export type CommonHandlerType = () => void;
export interface ImageWrapperPropsInterface {
  src: string;
  alt?: string;
  referrerPolicy?: ReferrerPolicyType;
  crossOrigin?: CrossOriginType;
  style?: ImageStyle;
  onLoad?: CommonHandlerType;
}

export interface CloudImagePropsInterface {
  src: string;
  alt?: string;
  referrerPolicy?: ReferrerPolicyType;
  crossOrigin?: CrossOriginType;
  limitFactor?: number;
  autoResize?: boolean;
  placeholderBackground?: string;
  style?: ImageStyle;
  operations?: OperationsPropertiesIntreface | string;
  watermarks?: WatermarksPropertiesIntreface | string; // TODO
  filters?: FiltersPropertiesIntreface | string; // TODO
}

export interface GetURLParamsStringPropsInterface
  extends CloudImagePropsInterface {
  containerHeight: number;
  containerWidth: number;
  limitFactor: number;
}

export interface FunctionCallerInterface {
  [index: string]: SetURLParamFunctionType<any>;
}

export type ConstructURLParamsFromOperationsFunctionType = (
  operations: OperationsPropertiesIntreface | string
) => string;

export type getURLParamsStringFunctionType = (
  props: GetURLParamsStringPropsInterface
) => string;

export type SetURLParamFunctionType<Type> = (
  key: string,
  value: Type,
  searchParams: URLSearchParams
) => void;
