import {
  type getURLParamsStringFunctionType,
  type ConstructURLParamStringFromPropsFunctionType,
  type SetURLParamFunctionType,
  type FunctionCallerInterface,
  type ImageGravityType,
  type FocalPointInterface,
  type PositionableCropInterface,
  type RadiusInterface,
  type AspectRatioInterface,
  type ColorOverlayInterface,
  type FaceBlurInterface,
} from './cloudimage.interface';
import { type CoordinatesInterface, type Pair } from '../../general.interface';
import { config } from '../../general.utils';

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
  backgorundGravity = 'bg_gravity',
  brightness = 'bright',
  contrast = 'contrast',
  saturate = 'saturate',
  grayScale = 'gray',
  pixelate = 'pixelate',
  blur = 'blur',
  sharpen = 'sharp',
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
  searchParams
) => {
  const searchParamName: string =
    COMPONENT_TO_SEARCHPARAM_TABLE[
      key as keyof typeof COMPONENT_TO_SEARCHPARAM_TABLE
    ];
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

const setGravityURLParam: SetURLParamFunctionType<ImageGravityType> = (
  _key,
  value,
  searchParams
) => {
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
  PositionableCropInterface
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

const setFaceBlurParam: SetURLParamFunctionType<FaceBlurInterface> = (
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

const setRadiusURLParam: SetURLParamFunctionType<number | RadiusInterface> = (
  _key,
  value,
  searchParams
) => {
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

const setAspectRatioURLParam: SetURLParamFunctionType<AspectRatioInterface> = (
  _key,
  value,
  searchParams
) => {
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
  gravity: setGravityURLParam,
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
};

const getStringFromProp = (prop: string | Object): string => {
  const searchParams = new URLSearchParams();

  if (typeof prop === 'string') {
    return prop;
  }

  for (let key of Object.keys(prop)) {
    if (functionCaller[key] !== undefined) {
      functionCaller[key](key, prop[key as keyof typeof prop], searchParams);
    }
  }

  return searchParams.toString();
};

export const constructURLParamStringFromProps: ConstructURLParamStringFromPropsFunctionType =
  (props) => {
    const { operations, filters, watermarks } = props;

    const operationsString: string = getStringFromProp(operations);
    const filtersString: string = getStringFromProp(filters);
    const watermarksString: string = getStringFromProp(watermarks);

    return [operationsString, filtersString, watermarksString]
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

    const isDeviceSupported = devicePixelRatioList.includes(
      window.devicePixelRatio
    );

    const devicePixelRatio = isDeviceSupported ? window.devicePixelRatio : 1;

    return `w=${roundedWidth}&h=${roundedHeight}&${urlParamsString}&dpr=${devicePixelRatio}`;
  }

  return urlParamsString;
};
