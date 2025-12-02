import { type CoordinatesInterface } from '../../general.interface';
import { type ImageStyle } from 'react-native';

export interface OperationImagePositionableCropInterface {
  topLeft?: CoordinatesInterface;
  bottomRight?: CoordinatesInterface;
  center?: CoordinatesInterface;
}

export interface ColorOverlayInterface {
  color: string;
  opacity?: number;
}

export interface FilterFaceBlurInterface {
  enable: boolean;
  radius?: number;
  sigma?: number;
}

export interface FiltersPropertiesIntreface {
  brightness?: number;
  contrast?: number;
  saturate?: number;
  grayScale?: number;
  colorOverlay?: ColorOverlayInterface;
  pixelate?: number;
  blur?: number;
  sharpen?: number;
  faceBlur?: FilterFaceBlurInterface;
}

export type GravityType =
  | 'north'
  | 'northwest'
  | 'northeast'
  | 'south'
  | 'southwest'
  | 'southeast'
  | 'east'
  | 'west'
  | 'absolute'
  | 'realtive'
  | 'center';

export interface WatermarkScaleInterface {
  scaleValue: number;
  scaleType?: 'pixles' | 'percentage';
}

export interface PaddingInterface {
  x: number;
  y?: number;
  xType?: 'pixles' | 'percentage';
  yType?: 'pixles' | 'percentage';
}

export interface WatermarkPositionInterface {
  x: number;
  y?: number;
}

export interface WatermarkFontSizeInterface {
  size: number;
  max?: boolean;
}

export interface WatermarkPropertiesIntreface {
  addWatermark?: boolean;
  opacity?: number;
  url?: string;
  text?: string;
  font?: string;
  textColor?: string;
  watermarkGravity?: GravityType;
  padding?: PaddingInterface;
  position?: WatermarkPositionInterface;
  scale?: WatermarkScaleInterface;
  fontSize?: WatermarkFontSizeInterface;
}

export interface WatermarksPropertiesIntreface extends WatermarkPropertiesIntreface {
  multipleWatermarks?: WatermarkPropertiesIntreface[];
}

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
  backgroundGravity?: OperationBackgroundGravityType;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  operationGravity?: OperationImageGravityType;
  positionableCrop?: OperationImagePositionableCropInterface;
  faceMargin?: number | CoordinatesInterface;
  aspectRatio?: OperationAspectRatioInterface;
  radius?: number | OperationRadiusInterface;
}

export interface OperationAspectRatioInterface {
  from: number | string;
  to?: number | string;
}

export interface FocalPointInterface extends CoordinatesInterface {
  coordinatesType?: 'pixels' | 'percentage' | 'coefficient';
}

export interface OperationRadiusInterface {
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

export type OperationBackgroundGravityType =
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

export type OperationImageGravityType =
  | 'auto'
  | 'face'
  | 'trim'
  | 'smart'
  | OperationBackgroundGravityType
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
  watermarks?: WatermarksPropertiesIntreface | string;
  filters?: FiltersPropertiesIntreface | string;
}

export interface GetURLParamsStringPropsInterface extends CloudImagePropsInterface {
  containerHeight: number;
  containerWidth: number;
  limitFactor: number;
}

export interface FunctionCallerInterface {
  [index: string]: SetURLParamFunctionType<any>;
}

export type ConstructURLParamStringFromPropsFunctionType = (props: {
  operations: OperationsPropertiesIntreface | string;
  watermarks: WatermarksPropertiesIntreface | string;
  filters: FiltersPropertiesIntreface | string;
}) => string;

export type getURLParamsStringFunctionType = (
  props: GetURLParamsStringPropsInterface
) => string;

export type SetURLParamFunctionType<Type> = (
  key: string,
  value: Type,
  searchParams: URLSearchParams,
  postfix?: string
) => void;
