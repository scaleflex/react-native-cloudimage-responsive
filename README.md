# Cloudimage responsive plugin for React-Native

## Requirements

### Cloudimage account

To use the Cloudimage React Native library, you will need a Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by registering [here](https://www.cloudimage.io/registration?utm_source=referral&utm_medium=referral&utm_campaign=cloudimage_react_native_plugin&utm_content=readme). Once your token is created, you can configure it as described below.

## Installation

To start using this plugin simply add it to your project with the package manager of your choice.

```
yarn add react-native-cloudimage-cloud
```

**OR**

```
npm install react-native-cloudimage-cloud
```

## Setup

Before you can use any of the components you should configure the plugin with **setPluginConfig**. See [next table](#configuration-object) for an exhaustive list of configuration object.

```
// App.tsx

setPluginConfig(config);

export default function App() {
//
}
```

<a name="configuration-object"></a>

###### Configuration object

|        Property         |        Type & Default        | Description                                                                                                                                                                                                                      |
| :---------------------: | :--------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         `token`         |       `string` : `''`        | **Required.** Part of the [resource URL](#cloudimage-url-format). Your Cloudimage customer token. Subscribe for a Cloudimage account to get one. The subscription takes less than a minute.                                      |
| `placeholderBackground` |    `string` : `'#f4f4f4'`    | Placeholder coloured background while the image is loading. Can be set to a [valid URL](https://en.wikipedia.org/wiki/URL) in order to display some other resource (image, gif, etc.) to display while main resource is loading. |
|        `domain`         | `string` : `'cloudimage.io'` | Part of the [resource URL](#cloudimage-url-format). Change this if you use a custom CNAME for your Cloudimage integration.                                                                                                       |
|        `baseUrl`        |       `string` : `'/'`       | Part of the [resource URL](#cloudimage-url-format). Your image folder at origin; this alows to shorten your origin image URLs.                                                                                                   |
|      `limitFactor`      |       `number` : `100`       | Rounds up the size of the image to the nearest limitFactor value (for an image with width 358px and limitFactor equal to 100, the plugin will round up to 400px).                                                                |
|    `doNotReplaceURL`    |     `boolean` : `false`      | If set to true, the plugin will only add query parameters to the provided image source URL. As a result, resource URL will look like this: _src?operations&filters&watermarks_.                                                  |
| `devicePixelRatioList`  |  `number[]` : `[1, 1.5, 2]`  | List of supported device pixel ratios. If there is no need to support retina devices, you should set empty array. Only positive numbers limited to 5 are supported.                                                              |
|      `lazyLoading`      |      `boolean` : `true`      | If set to true plugin will lazy load requested resources.                                                                                                                                                                        |
|     `lazyInterval`      |      `number` : `1000`       | Interval in milliseconds used to check users viewport. Lower values means more frequent checks.                                                                                                                                  |
|     `lazyThreshold`     |       `number` : `50`        | Threshold between users viewport and resource. Higher values means that resource will load earlier.                                                                                                                              |

Once that's done you can start using plugin [components](#components) in your application.

<a name="cloudimmage-url-format"></a>

#### Cloudimage URL Format

_token.domain.tld/baseUrl/src?operations&filters&watermarks_

## Basic example

Below example will show a basic usage of the plugin with help of [CloudImage](#cloud-image-component) component.

```
// SomeComponent.tsx

// imports...

setPluginConfig({
  baseUrl: 'https://samples.scaleflex.com/',
  domain: 'cloudimg.io',
  token: 'doc',
});

export default function SomeCopmponent() {
  return (
      <View style={styles.container}>
        <CloudImage
          src="hotel.jpg"
          style={styles.image}
          filters={{ blur: 1, colorOverlay: { color: 'white' } }}
          watermarks={{
            addWatermark: true,
            text: 'global',
            multipleWatermarks: [
              { addWatermark: true, text: 'first' },
            ],
          }}
          operations={{
            function: 'bound',
            verticalFlip: true,
            radius: {
              topLeft: 0,
              topRight: 'max',
              bottomLeft: 'max',
              bottomRight: 'max',
            },
            backgroundColor: '000000',
          }}
        />
      </View>

  );
}

const styles = StyleSheet.create({
  container:{
    // Some container styles
  }

  image: {
   // Some image styles
  },
});

```

<a name="components"></a>

## Components

<a name="cloud-image-component"></a>

### CloudImage

<a name="cloud-image-properties"></a>

###### Properties

|        Property         |                                             Type : Default                                              | Description                                                                                                                                                                                                                                                                                             |
| :---------------------: | :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|          `src`          |                                        `string` : **undefined**                                         | Image source.                                                                                                                                                                                                                                                                                           |
|          `alt`          |                                      `string` : **equal to** `src`                                      | Image alt.                                                                                                                                                                                                                                                                                              |
|      `crossOrigin`      |                                        `string` : `'anonymous'`                                         | Cross-Origin Resource Sharing. [MDN documentation.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) Possible values: `'anonymous', 'use-credentials'`.                                                                                                                                   |
|    `referrerPolicy`     |                             `string` : `'strict-origin-when-cross-origin'`                              | Referrer policy [MDN docs.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy) Possible values: `'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'`. |
|      `limitFactor`      |                             `number` : **taken from configuration object**                              | Use to specify some value that is different from global config.                                                                                                                                                                                                                                         |
|      `autoResize`       |                                           `boolean` : `true`                                            | Automatically determine best image sizes. **Sets width and height property of operations object.**                                                                                                                                                                                                      |
| `placeholderBackground` |                             `string` : **taken from configuration object**                              | Use to specify some value that is different from global config.                                                                                                                                                                                                                                         |
|         `style`         |                                      `ImageStyle` : **undefined**                                       | [CSS styles](https://developer.mozilla.org/en-US/docs/Web/CSS) passed to image.                                                                                                                                                                                                                         |
|      `operations`       |   [`OperationsPropertiesInterface`](#operations-properties-interface) **or** `string` : **undefined**   | Use to apply some image transformations before delivering.                                                                                                                                                                                                                                              |
|      `watermarks`       | See [`WatermarksPropertiesInterface`](#watermarks-properties-interface) **or** `string` : **undefined** | Use to add watermarks to a image before delivering.                                                                                                                                                                                                                                                     |
|        `filters`        |    See [`FiltersPropertiesInterface`](#filters-properties-interface) **or** `string` : **undefined**    | Use to apply some filters to a image before delivering.                                                                                                                                                                                                                                                 |

<a name="operations-properties-interface"></a>

###### OperationsPropertiesInterface

You can use plain string instead of object as well. See [Cloudimage documentation](https://docs.cloudimage.io/transformations/image-operations) for more examples.

|       Property        |                                        Type                                        | Description                                                                                                                                                                                                                                                                                             |
| :-------------------: | :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|        `width`        |                                      `number`                                      | Image width.                                                                                                                                                                                                                                                                                            |
|       `height`        |                                      `number`                                      | Image height.                                                                                                                                                                                                                                                                                           |
|      `function`       |                                      `string`                                      | Resize function. Possible values: `'crop', 'face', 'cropfit', 'bound', 'fit', 'boundmin', 'cover', 'facehide'`                                                                                                                                                                                          |
| `preventEnlargement`  |                                     `boolean`                                      | Disallows image upscaling when resizing with the width or height operations. When resizing, the image can be either scaled down or up depending on the original and target dimensions.                                                                                                                  |
|       `rotate`        |                                      `number`                                      | Rotates the image by a specified angle, counterclockwise.                                                                                                                                                                                                                                               |
|        `trim`         |                                      `number`                                      | Removes any single-color padding around the image if present. The parameter does not specify the amount of border or frame to trim but rather how aggressive the trim algorithm should be. A bigger value of the parameter (e.g. 25) might trim part of the image. Typical values are between 0 and 10. |
|   `removeBackgound`   |                                     `boolean`                                      | Background removal automatically detects the foreground object and isolates it by removing the background of an image using advanced AI technology. **Please keep in mind that the background removal operation is asynchronous which means that the first request will return the original image.**    |
|       `margin`        |                                      `number`                                      | Defines a minimum margin when fitting the image in a new canvas. Used with `function: 'fit'`.                                                                                                                                                                                                           |
|    `upscaleImage`     |                                     `boolean`                                      | Allows upscaling smaller images to the desired dimensions (will result in inferior image resolution). Used with `function: 'fit'`.                                                                                                                                                                      |
|   `blurBackground`    |                                     `boolean`                                      | Sets blurred image background. Used with `function: 'fit'`.                                                                                                                                                                                                                                             |
| `blurBackgroundValue` |                                      `number`                                      | Applies Gaussian blur to the background image. Used with `function: 'fit'` and `blurBackground: true`.                                                                                                                                                                                                  |
|  `backgroundOpacity`  |                                      `number`                                      | Specifies background image opacity. Used with `function: 'fit'` and `blurBackground: true`.                                                                                                                                                                                                             |
| `backgroundTintColor` |                                      `number`                                      | Defines a color to tint the background image. Used with `function: 'fit'` and `blurBackground: true`.                                                                                                                                                                                                   |
|   `backgroundColor`   |                                      `string`                                      | Color in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format or basic color f.e. `red`. Used with `function: 'fit'` and `blurBackground: true`.                                                                                                                                              |
|  `devicePixelRatio`   |                                      `number`                                      | Allows you to deliver the proper image dimensions according to a defined device pixel ratio. This operation can help with conversion between device-independent pixels and CSS (reference) pixels.                                                                                                      |
|  `backgroundGravity`  |                                      `string`                                      | Defines the positioning of the background image within its container. Possible values: `'north', 'northwest', 'northeast', 'west', 'centre', 'center', 'east', 'southwest', 'south', 'southeast', 'trim'`. Used with `function: 'fit'` and `blurBackground: true`.                                      |
|   `horizontalFlip`    |                                     `boolean`                                      | Mirrors the image horizontally.                                                                                                                                                                                                                                                                         |
|    `verticalFlip`     |                                     `boolean`                                      | Mirrors the image vertically.                                                                                                                                                                                                                                                                           |
|  `operationGravity`   | `string` **or** [`OperationFocalPointInterface`](#operation-focal-point-interface) | Sets the position of the image in the fit box. Possible values: `'north', 'northwest', 'northeast', 'west', 'centre', 'center', 'east', 'southwest', 'south', 'southeast', 'trim', 'auto', 'face', 'trim', 'smart'` **or** `OperationFocalPointInterface`. Used with `function: 'fit'`.                 |
|  `positionableCrop`   |   [`OperationPositionableCropInterface`](#operation-positionable-crop-interface)   | Allows to crop an image by providing the exact cropping area. It is useful when you want to crop a specific part of the image.                                                                                                                                                                          |
|     `faceMargin`      |          `number` **or** [`CoordinatesInterface`](#coordinates-interface)          | To control the margin when cropping the face out. Used with `function: 'facehide'`                                                                                                                                                                                                                      |
|     `aspectRatio`     |        [`OperationAspectRatioInterface`](#operation-aspect-ratio-interface)        | Sets target aspect ratio or aspect ratio range when cropping.                                                                                                                                                                                                                                           |
|       `radius`        |     `number` **or** [`OperationRadiusInterface`](#operation-radius-interface)      | Rounds the corners of images.                                                                                                                                                                                                                                                                           |

<a name="watermarks-properties-interface"></a>

###### WatermarksPropertiesInterface

You can use plain string instead of object as well. See [Cloudimage documentation](https://docs.cloudimage.io/transformations/image-watermarking) for more examples.

|       Property       |                                 Type                                 | Description                                                                                                                                                                                   |
| :------------------: | :------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `addWatermark`    |                              `boolean`                               | Set to `'true'` to enable watremarking.                                                                                                                                                       |
|      `opacity`       |                               `number`                               | Defines watermark opacity.                                                                                                                                                                    |
|        `url`         |                               `string`                               | The URL of the watermark image. Can be URL-encoded. **Required for external watermark type.**                                                                                                 |
|        `text`        |                               `string`                               | Any text that you want to be displayed. **Required for text watermark type.**                                                                                                                 |
|        `font`        |                               `string`                               | Font family to be used for text watermark.                                                                                                                                                    |
|     `textColor`      |                               `string`                               | Color in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format or basic color f.e. `red`.                                                                                            |
|  `watermarkGravity`  |                               `string`                               | Defines the position to "anchor" the watermark to. Possible values: `'north', 'northwest', 'northeast', 'south', 'southwest', 'southeast', 'east', 'west', 'absolute', 'realtive', 'center'`. |
|      `padding`       |     [`WatermarkPaddingInterface`](#watermark-padding-interface)      | Adds padding from the anchoring point.                                                                                                                                                        |
|      `position`      |    [`WatermarkPositionInterface`](#watermark-position-interface)     | Sets the position in percent from the resized image. Works only with: `watermarkGravity: 'absolute', 'relative'`                                                                              |
|       `scale`        |       [`WatermarkScaleInterface`](#watermark-scale-interface)        | Watermark image scaling defined in in percent of the watermark dimensions.                                                                                                                    |
|      `fontSize`      |    [`WatermarkFontSizeInterface`](#watermark-font-size-interface)    | Sets the font size.                                                                                                                                                                           |
| `multipleWatermarks` | [`WatermarkPropertiesInterface[]`](#watermarks-properties-interface) | Used to define multiple watermarks. If array is not empty all above settings will be used as global settings for all individual watermark.                                                    |

<a name="filters-properties-interface"></a>

###### FiltersPropertiesInterface

You can use plain string instead of object as well. See [Cloudimage documentation](https://docs.cloudimage.io/transformations/image-filters) for more examples.

|    Property    |                               Type                               | Description                                                      |
| :------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------- |
|  `brightness`  |                             `number`                             | Adjusts the brightness of the image.                             |
|   `contrast`   |                             `number`                             | Adjusts the contrast of the image.                               |
|   `saturate`   |                             `number`                             | Adjusts the saturation of the image.                             |
|  `grayScale`   |                             `number`                             | Converts the image to a black and white one.                     |
|   `pixelate`   |                             `number`                             | Pixelates the image into X-pixel-sized blocks.                   |
|     `blur`     |                             `number`                             | Applies Gaussian blur.                                           |
|   `sharpen`    |                             `number`                             | Applies unsharp mask to sharpen the image.                       |
| `colorOverlay` | [`FilterColorOverlayInterface`](#filter-color-overlay-interface) | Applies a color overlay.                                         |
|   `faceBlur`   |     [`FilterFaceBlurInterface`](#filter-face-blur-interface)     | Detects all faces in the image and applies blur to conceal them. |

<a name="operation-positionable-crop-interface"></a>

###### OperationPositionableCropInterface

|   Property    |                       Type                       | Description                                                            |
| :-----------: | :----------------------------------------------: | :--------------------------------------------------------------------- |
|   `topLeft`   | [`CoordinatesInterface`](#coordinates-interface) | Coordinate of the top left crop rectangle point. **Set only one.**     |
| `bottomRight` | [`CoordinatesInterface`](#coordinates-interface) | Coordinate of the bottom right crop rectangle point. **Set only one.** |
|   `center`    | [`CoordinatesInterface`](#coordinates-interface) | Coordinate of the center crop rectangle point. **Set only one.**       |

<a name="coordinates-interface"></a>

###### CoordinatesInterface

| Property |   Type   | Description                 |
| :------: | :------: | :-------------------------- |
|   `x`    | `number` | **Required.** X coordinate. |
|   `y`    | `number` | **Required.** Y coordinate. |

<a name="operation-aspect-ratio-interface"></a>

###### OperationAspectRatioInterface

| Property |           Type           | Description                                                                 |
| :------: | :----------------------: | :-------------------------------------------------------------------------- |
|  `from`  | `number` **or** `string` | **Required.** Minimum aspect ratio of an image (`string` examle: `'16:9'`). |
|   `to`   | `number` **or** `string` | Maximum aspect ratio of an image. (`string` examle: `'1:1'`).               |

<a name="operation-radius-interface"></a>

###### OperationRadiusInterface

|   Property    |           Type           | Description                                                     |
| :-----------: | :----------------------: | :-------------------------------------------------------------- |
|   `topLeft`   | `number` **or** `string` | Radius of the top left image corner. Can be set to `'max'`.     |
|  `topRight`   | `number` **or** `string` | Radius of the top right image corner. Can be set to `'max'`.    |
| `bottomRight` | `number` **or** `string` | Radius of the bottom right image corner. Can be set to `'max'`. |
| `bottomLeft`  | `number` **or** `string` | Radius of the bottom left image corner. Can be set to `'max'`.  |

<a name="operation-focal-point-interface"></a>

###### OperationFocalPointInterface

|     Property      |   Type   | Description                                                                       |
| :---------------: | :------: | :-------------------------------------------------------------------------------- |
| `coordinatesType` | `string` | Type of the coordinate. Possible values: `'pixels', 'percentage', 'coefficient'`. |
|        `x`        | `number` | **Required.** X coordinate.                                                       |
|        `y`        | `number` | **Required.** Y coordinate.                                                       |

<a name="watermark-padding-interface"></a>

###### WatermarkPaddingInterface

| Property |   Type   | Description                                                          |
| :------: | :------: | :------------------------------------------------------------------- |
|   `x`    | `number` | **Required.** X coordinate.                                          |
|   `y`    | `number` | Y coordinate.                                                        |
| `xType`  | `string` | Type of the x coordinate. Possible values: `'pixels', 'percentage'`. |
| `yType`  | `string` | Type of the y coordinate. Possible values: `'pixels', 'percentage'`. |

<a name="watermark-position-interface"></a>

###### WatermarkPositionInterface

| Property |   Type   | Description                 |
| :------: | :------: | :-------------------------- |
|   `x`    | `number` | **Required.** X coordinate. |
|   `y`    | `number` | Y coordinate.               |

<a name="watermark-scale-interface"></a>

###### WatermarkScaleInterface

|   Property   |   Type   | Description                                                               |
| :----------: | :------: | :------------------------------------------------------------------------ |
| `scaleValue` | `number` | **Required.** Watermark scaling value.                                    |
| `scaleType`  | `string` | Type of the watermark scaling. Possible values: `'pixels', 'percentage'`. |

<a name="watermark-font-size-interface"></a>

###### WatermarkFontSizeInterface

| Property |   Type    | Description                                                            |
| :------: | :-------: | :--------------------------------------------------------------------- |
|  `size`  | `number`  | **Required.** Watermark font size.                                     |
|  `max`   | `boolean` | If set to `true` watermark size changes dynamically with max of `size` |

<a name="filter-color-overlay-interface"></a>

###### FilterColorOverlayInterface

|  Property  |   Type   | Description                                                                                                                           |
| :--------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|  `color`   | `string` | **Required.** Color of the color overlay in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format or basic color f.e. `red`. |
| `opacity ` | `number` | **Required.** Color opacity.                                                                                                          |

<a name="filter-face-blur-interface"></a>

###### FilterFaceBlurInterface

| Property |   Type    | Description       |
| :------: | :-------: | :---------------- |
| `enable` | `boolean` | `'true', 'false'` |
| `radius` | `number`  | Blur radius.      |
| `sigma`  | `number`  | Blur sigma.       |
