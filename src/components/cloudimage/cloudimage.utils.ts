import {
  type getURLParamsStringFunctionType,
  type ConstructURLParamStringFromPropsFunctionType,
  type SetURLParamFunctionType,
  type FunctionCallerInterface,
  type OperationImageGravityType,
  type FocalPointInterface,
  type OperationImagePositionableCropInterface,
  type OperationRadiusInterface,
  type OperationAspectRatioInterface,
  type ColorOverlayInterface,
  type FilterFaceBlurInterface,
  type PaddingInterface,
  type WatermarkScaleInterface,
  type WatermarkPositionInterface,
  type WatermarkFontSizeInterface,
} from './cloudimage.interface';
import { type CoordinatesInterface, type Pair } from '../../general.interface';
import { config } from '../../general.utils';
import { PixelRatio } from 'react-native';

export enum COMPONENT_TO_SEARCHPARAM_TABLE {
  width = 'w',
  height = 'h',
  function = 'func',
  preventEnlargement = 'org_if_sml',
  devicePixelRatio = 'dpr',
  rotate = 'r',
  trim = 'trim',
  removeBackgound = 'bg_remove',
  margin = 'margin',
  backgroundColor = 'bg_color', //bg_colour
  upscaleImage = 'fit_enlarge',
  blurBackground = 'bg_img_fit',
  blurBackgroundValue = 'bg_blur',
  backgroundOpacity = 'bg_opacity',
  backgroundTintColor = 'bg_colorize', //bg_colourize
  backgroundGravity = 'bg_gravity',
  brightness = 'bright',
  contrast = 'contrast',
  saturate = 'saturate',
  grayScale = 'gray',
  pixelate = 'pixelate',
  blur = 'blur',
  sharpen = 'sharp',
  opacity = 'wat_opacity',
  url = 'wat_url',
  text = 'wat_text',
  font = 'wat_font',
  textColor = 'wat_color', //wat_colour
  addWatermark = 'wat',
  watermarkGravity = 'wat_gravity',
}

export const getRoundedSizes = (
  width: number,
  height: number,
  limitFactor: number
): Pair<number, number> => {
  const roundedWidth = Math.round(width / limitFactor) * limitFactor;
  const roundedHeight = Math.round(height / limitFactor) * limitFactor;

  return [roundedWidth, roundedHeight];
};

const setGenericURLParam: SetURLParamFunctionType<any> = (
  key,
  value,
  searchParams,
  postfix = ''
) => {
  const searchParamName: string =
    COMPONENT_TO_SEARCHPARAM_TABLE[
      key as keyof typeof COMPONENT_TO_SEARCHPARAM_TABLE
    ] + postfix;
  let searchParamValue: string = '';

  switch (typeof value) {
    case 'string': {
      searchParamValue = value;
      break;
    }

    case 'number': {
      searchParamValue = value.toString();
      break;
    }

    case 'boolean': {
      searchParamValue = value ? '1' : '0';
      break;
    }

    default: {
      throw new Error(
        'Parameter of type: ' +
          typeof value +
          ' is not supported for generic function!'
      );
    }
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setFlipURLParam: SetURLParamFunctionType<boolean> = (
  flipType,
  isFlipped,
  searchParams
) => {
  const searchParamName: string = 'flip';
  let searchParamValue: string = searchParams.get(searchParamName) ?? '';

  switch (flipType) {
    case 'verticalFlip': {
      const flipValue = isFlipped ? 'v' : '';
      searchParamValue = searchParamValue + flipValue;
      break;
    }

    case 'horizontalFlip': {
      const flipValue = isFlipped ? 'h' : '';
      searchParamValue = flipValue + searchParamValue;
      break;
    }

    default: {
      throw new Error('Unknown flip: ' + flipType);
    }
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setDevicePixelRatioURLParam: SetURLParamFunctionType<number> = (
  _key,
  value,
  searchParams
) => {
  const { devicePixelRatioList } = config;
  const searchParamName: string = 'dpr';
  const isValueSuitable: boolean = devicePixelRatioList.includes(value);

  if (!isValueSuitable) {
    throw new Error('Device pixel ratio value not alllowed.');
  }

  const searchParamValue = value.toString();
  searchParams.set(searchParamName, searchParamValue);
};

const setOperationGravityURLParam: SetURLParamFunctionType<
  OperationImageGravityType
> = (_key, value, searchParams) => {
  const searchParamName: string = 'gravity';
  let searchParamValue: string = '';

  if (typeof value === 'object') {
    const typedValue: FocalPointInterface = value;
    let units: string = '';

    switch (typedValue.coordinatesType) {
      case 'coefficient': {
        units = 'c';
        break;
      }

      case 'percentage': {
        units = 'p';
        break;
      }

      default: {
        break;
      }
    }

    searchParamValue = `${typedValue.x.toString()}${units},${typedValue.y.toString()}${units}`;
  } else {
    searchParamValue = value;
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setPositionableCropURLParam: SetURLParamFunctionType<
  OperationImagePositionableCropInterface
> = (_key, value, searchParams) => {
  if (value.bottomRight) {
    const searchParamName: string = 'br_px';
    const searchParamValue: string = `${value.bottomRight.x.toString()},${value.bottomRight.y.toString()}`;
    searchParams.set(searchParamName, searchParamValue);
  }

  if (value.topLeft) {
    const searchParamName: string = 'tl_px';
    const searchParamValue: string = `${value.topLeft.x.toString()},${value.topLeft.y.toString()}`;
    searchParams.set(searchParamName, searchParamValue);
  }

  if (value.center) {
    searchParams.set('x', value.center.x.toString());
    searchParams.set('y', value.center.y.toString());
  }
};

const setFaceMarginURLParam: SetURLParamFunctionType<
  number | CoordinatesInterface
> = (_key, value, searchParams) => {
  const searchParamName: string = 'face_margin';
  let searchParamValue: string = '';

  if (typeof value === 'number') {
    searchParamValue = value.toString();
  }

  if (typeof value === 'object') {
    searchParamValue = `${value.x.toString()},${value.y.toString()}`;
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setColorOverlayParam: SetURLParamFunctionType<ColorOverlayInterface> = (
  _key,
  value,
  searchParams
) => {
  const { opacity = 0.5, color } = value;

  const searchParamName: string = 'colorize';
  const searchParamValue: string = `${color},${opacity}`;

  searchParams.set(searchParamName, searchParamValue);
};

const setFaceBlurParam: SetURLParamFunctionType<FilterFaceBlurInterface> = (
  _key,
  value,
  searchParams
) => {
  const { enable, radius = 30, sigma = 1000 } = value;

  if (enable) {
    const searchParamName: string = 'blur_faces';
    const searchParamValue: string = `${1},${radius},${sigma}`;

    searchParams.set(searchParamName, searchParamValue);
  }
};

const setRadiusURLParam: SetURLParamFunctionType<
  number | OperationRadiusInterface
> = (_key, value, searchParams) => {
  const searchParamName: string = 'radius';
  let searchParamValue: string = '';

  if (typeof value === 'number') {
    searchParamValue = value.toString();
  }

  if (typeof value === 'object') {
    const topLeftValue =
      value.topLeft === 'max' ? value.topLeft : value.topLeft.toString();

    const topRightValue =
      value.topRight === 'max' ? value.topRight : value.topRight.toString();

    const bottomLeftValue =
      value.bottomLeft === 'max'
        ? value.bottomLeft
        : value.bottomLeft.toString();

    const bottomRightValue =
      value.bottomRight === 'max'
        ? value.bottomRight
        : value.bottomRight.toString();

    searchParamValue =
      topLeftValue +
      ',' +
      bottomLeftValue +
      ',' +
      bottomRightValue +
      ',' +
      topRightValue;
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setAspectRatioURLParam: SetURLParamFunctionType<
  OperationAspectRatioInterface
> = (_key, value, searchParams) => {
  const searchParamName: string = 'aspect_ratio';
  let searchParamValue: string = '';

  if (typeof value.from === 'string') {
    searchParamValue = value.from;
  }

  if (typeof value.from === 'number') {
    searchParamValue = value.from.toString();
  }

  if (typeof value?.to === 'string') {
    searchParamValue += ',' + value.to;
  }

  if (typeof value?.to === 'number') {
    searchParamValue += ',' + value.to.toString();
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setPaddingURLParam: SetURLParamFunctionType<PaddingInterface> = (
  _key,
  value,
  searchParams
) => {
  const { x, xType, y, yType } = value;

  const searchParamName: string = 'wat_pad';
  let searchParamValue: string = x.toString();

  if (xType === 'percentage') {
    searchParamValue += 'p';
  }

  if (typeof y !== 'undefined') {
    searchParamValue += ',' + y.toString();

    if (yType === 'percentage') {
      searchParamValue += 'p';
    }
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setWatermarkScaleURLParam: SetURLParamFunctionType<
  WatermarkScaleInterface
> = (_key, value, searchParams) => {
  const { scaleValue, scaleType } = value;

  const searchParamName: string = 'wat_scale';
  let searchParamValue: string = scaleValue.toString();

  if (scaleType === 'percentage') {
    searchParamValue += 'p';
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setWatermarkPositionURLParam: SetURLParamFunctionType<
  WatermarkPositionInterface
> = (_key, value, searchParams) => {
  const { x, y } = value;

  const searchParamName: string = 'wat_pos';
  let searchParamValue: string = x.toString();

  if (typeof y !== 'undefined') {
    searchParamValue += ',' + y.toString();
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setWatermarkFontSizeURLParam: SetURLParamFunctionType<
  WatermarkFontSizeInterface
> = (_key, value, searchParams) => {
  const { size, max } = value;

  const searchParamName: string = 'wat_fontsize';
  let searchParamValue: string = size.toString();

  if (max) {
    searchParamValue += 'max';
  }

  searchParams.set(searchParamName, searchParamValue);
};

const functionCaller: FunctionCallerInterface = {
  width: setGenericURLParam,
  height: setGenericURLParam,
  function: setGenericURLParam,
  preventEnlargement: setGenericURLParam,
  rotate: setGenericURLParam,
  trim: setGenericURLParam,
  removeBackgound: setGenericURLParam,
  margin: setGenericURLParam,
  upscaleImage: setGenericURLParam,
  blurBackground: setGenericURLParam,
  blurBackgroundValue: setGenericURLParam,
  backgroundOpacity: setGenericURLParam,
  backgroundTintColor: setGenericURLParam,
  horizontalFlip: setFlipURLParam,
  verticalFlip: setFlipURLParam,
  devicePixelRatio: setDevicePixelRatioURLParam,
  operationGravity: setOperationGravityURLParam,
  positionableCrop: setPositionableCropURLParam,
  faceMargin: setFaceMarginURLParam,
  radius: setRadiusURLParam,
  aspectRatio: setAspectRatioURLParam,
  backgroundGravity: setGenericURLParam,
  backgroundColor: setGenericURLParam,
  brightness: setGenericURLParam,
  contrast: setGenericURLParam,
  saturate: setGenericURLParam,
  grayScale: setGenericURLParam,
  pixelate: setGenericURLParam,
  blur: setGenericURLParam,
  sharpen: setGenericURLParam,
  faceBlur: setFaceBlurParam,
  colorOverlay: setColorOverlayParam,
  url: setGenericURLParam,
  text: setGenericURLParam,
  font: setGenericURLParam,
  textColor: setGenericURLParam,
  addWatermark: setGenericURLParam,
  watermarkGravity: setGenericURLParam,
  padding: setPaddingURLParam,
  scale: setWatermarkScaleURLParam,
  positon: setWatermarkPositionURLParam,
  fontSize: setWatermarkFontSizeURLParam,
};

const getStringFromProp = (prop: string | Object, postfix?: string): string => {
  const searchParams = new URLSearchParams();

  if (typeof prop === 'string') {
    return prop;
  }

  for (let key of Object.keys(prop)) {
    if (functionCaller[key] !== undefined) {
      functionCaller[key](
        key,
        prop[key as keyof typeof prop],
        searchParams,
        postfix
      );
    }
  }

  return searchParams.toString();
};

export const constructURLParamStringFromProps: ConstructURLParamStringFromPropsFunctionType =
  (props) => {
    const { operations, filters, watermarks } = props;
    const result: string[] = [];

    result.push(getStringFromProp(operations));
    result.push(getStringFromProp(filters));
    result.push(getStringFromProp(watermarks));

    if (typeof watermarks === 'object') {
      let index: number = 1;
      for (let watermark of watermarks.multipleWatermarks ?? []) {
        result.push(getStringFromProp(watermark, `[${index}]`));
        ++index;
      }
    }

    return result
      .filter((value) => {
        return value !== '';
      })
      .join('&');
  };

export const getURLParamsString: getURLParamsStringFunctionType = (props) => {
  const {
    filters = '',
    watermarks = '',
    operations = '',
    containerHeight,
    containerWidth,
    limitFactor,
    autoResize = true,
  } = props;

  const { devicePixelRatioList } = config;

  const urlParamsString = constructURLParamStringFromProps({
    operations,
    filters,
    watermarks,
  });

  if (autoResize) {
    const [roundedWidth, roundedHeight] = getRoundedSizes(
      containerWidth,
      containerHeight,
      limitFactor
    );

    const isDeviceSupported = devicePixelRatioList.includes(PixelRatio.get());

    const devicePixelRatio = isDeviceSupported ? PixelRatio.get() : 1;

    return `w=${roundedWidth}&h=${roundedHeight}&${urlParamsString}&dpr=${devicePixelRatio}`;
  }

  return urlParamsString;
};
