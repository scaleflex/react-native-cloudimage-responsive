import {
  type ConstructURLParamsFromPropsFunctionType,
  type URLParamFunctionType,
  type FunctionCallerInterface,
} from './cloudimage.interface';

export enum COMPONENT_TO_SEARCHPARAM_TABLE {
  width = 'w',
  height = 'h',
  function = 'func',
  preventEnlargement = 'org_if_sml',
  gravity = 'gravity',
  topLeft = 'tl_px',
  bottomRight = 'br_px',
  x = 'x',
  y = 'y',
  faceMargin = 'face_margin',
  aspectRatio = 'ascpect_ratio',
  devicePixelRatio = 'dpr',
  rotate = 'r',
  trim = 'trim',
  radius = 'radius',
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

const genericURLParamFunction: URLParamFunctionType = (
  key,
  value,
  searchParams
) => {
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

    default: {
      throw new Error(
        'Parameter of type: ' +
          typeof value +
          ' is not supported for generic function!'
      );
    }
  }

  searchParams.set(
    COMPONENT_TO_SEARCHPARAM_TABLE[
      key as keyof typeof COMPONENT_TO_SEARCHPARAM_TABLE
    ],
    searchParamValue
  );
};

const functionCaller: FunctionCallerInterface = {
  width: genericURLParamFunction,
  faceMargin: genericURLParamFunction,
};

export const constructURLParamsFromProps: ConstructURLParamsFromPropsFunctionType =
  (props) => {
    const searchParams = new URLSearchParams();

    for (let key of Object.keys(props)) {
      if (functionCaller[key] !== undefined) {
        functionCaller[key](
          key,
          props[key as keyof typeof props], // -__-
          searchParams
        );
      }
    }

    return searchParams;
  };
