import type { CoordinatesInterface } from '../../general.interface';
import { type ImageProps, type ViewStyle } from 'react-native';

export interface OperationPositionableCropInterface {
  topLeft?: CoordinatesInterface;
  bottomRight?: CoordinatesInterface;
  center?: CoordinatesInterface;
}

export interface FilterColorOverlayInterface {
  color: string;
  opacity?: number;
}

export interface FilterFaceBlurInterface {
  enable: boolean;
  radius?: number;
  sigma?: number;
}

export interface FiltersPropertiesInterface {
  brightness?: number;
  contrast?: number;
  saturate?: number;
  grayScale?: number;
  colorOverlay?: FilterColorOverlayInterface;
  pixelate?: number;
  blur?: number;
  sharpen?: number;
  faceBlur?: FilterFaceBlurInterface;
}

export type WatermarkGravityType =
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

export interface WatermarkPaddingInterface {
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

export interface WatermarkPropertiesInterface {
  addWatermark?: boolean;
  opacity?: number;
  url?: string;
  text?: string;
  font?: string;
  textColor?: string;
  watermarkGravity?: WatermarkGravityType;
  padding?: WatermarkPaddingInterface;
  position?: WatermarkPositionInterface;
  scale?: WatermarkScaleInterface;
  fontSize?: WatermarkFontSizeInterface;
}

export interface WatermarksPropertiesInterface extends WatermarkPropertiesInterface {
  multipleWatermarks?: WatermarkPropertiesInterface[];
}

export interface OperationsPropertiesInterface {
  width?: number;
  height?: number;
  function?: OperationImageFuncType;
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
  operationGravity?: OperationGravityType;
  positionableCrop?: OperationPositionableCropInterface;
  faceMargin?: number | CoordinatesInterface;
  aspectRatio?: OperationAspectRatioInterface;
  radius?: number | OperationRadiusInterface;
}

export interface OperationAspectRatioInterface {
  from: number | string;
  to?: number | string;
}

export interface OperationFocalPointInterface extends CoordinatesInterface {
  coordinatesType?: 'pixels' | 'percentage' | 'coefficient';
}

export interface OperationRadiusInterface {
  topLeft: number | 'max';
  topRight: number | 'max';
  bottomRight: number | 'max';
  bottomLeft: number | 'max';
}

export type OperationImageFuncType =
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

export type OperationGravityType =
  | 'auto'
  | 'face'
  | 'trim'
  | 'smart'
  | OperationBackgroundGravityType
  | OperationFocalPointInterface;
export interface ImageWrapperPropsInterface extends Omit<ImageProps, 'source'> {
  src: string;
}

export interface CloudImagePropsInterface extends Omit<ImageProps, 'source'> {
  src: string;
  limitFactor?: number;
  autoResize?: boolean;
  wrapperStyle?: ViewStyle;
  placeholderBackground?: string;
  operations?: OperationsPropertiesInterface | string;
  watermarks?: WatermarksPropertiesInterface | string;
  filters?: FiltersPropertiesInterface | string;
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
  operations: OperationsPropertiesInterface | string;
  watermarks: WatermarksPropertiesInterface | string;
  filters: FiltersPropertiesInterface | string;
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
