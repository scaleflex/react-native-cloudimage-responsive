import {
  type ConstructURLParamsFromPropsFunctionType,
  type SetURLParamFunctionType,
  type FunctionCallerInterface,
  type ImageGravityType,
  type FocalPointInterface,
  type PositionableCropInterface,
  type RadiusInterface,
  type AspectRatioInterface,
} from './cloudimage.interface';
import { type CoordinatesInterface } from '../../general.interface';

// TODO: Create debug mode and move all checks there.

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
}

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
  // TODO: move to debug
  _key,
  value,
  searchParams
) => {
  const searchParamName: string = 'dpr';
  const isValueSuitable: boolean = value > 0 && value < 5;

  if (!isValueSuitable) {
    throw new Error(
      'Device pixel ratio only allows positive values limited to 5'
    );
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

    searchParamValue =
      typedValue.x.toString() + units + ',' + typedValue.y.toString() + units;
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
    const searchParamValue: string =
      value.bottomRight.x.toString() + ',' + value.bottomRight.y.toString();
    searchParams.set(searchParamName, searchParamValue);
  }

  if (value.topLeft) {
    const searchParamName: string = 'tl_px';
    const searchParamValue: string =
      value.topLeft.x.toString() + ',' + value.topLeft.y.toString();
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
    searchParamValue = value.x.toString() + ',' + value.y.toString();
  }

  searchParams.set(searchParamName, searchParamValue);
};

const setRadiusURLParam: SetURLParamFunctionType<number | RadiusInterface> = (
  //TODO: make it better -_-
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
};

export const constructURLParamsFromProps: ConstructURLParamsFromPropsFunctionType =
  (props) => {
    const searchParams = new URLSearchParams();
    const { transform = {} } = props;

    for (let key of Object.keys(transform)) {
      if (functionCaller[key] !== undefined) {
        functionCaller[key](
          key,
          transform[key as keyof typeof transform], // -__-
          searchParams
        );
      }
    }

    return searchParams;
  };
