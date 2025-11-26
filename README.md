# react-native-cloudimage-responsive

## Requirements

### Cloudimage account

To use the Cloudimage Responsive plugin, you will need a Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by registering [here](https://www.cloudimage.io/registration). Once your token is created, you can configure it as described below. This token allows you to use 25GB of image cache and 25GB of worldwide CDN traffic per month for free.

## Installation

To start using this plugin simply add it to your project with the package manager of your choice.

```
yarn add react-native-cloudimage-responsive
```

**OR**

```
npm install react-native-cloudimage-responsive
```

## Setup

Before you can use any of the components you should configure the plugin with **installCloudImage**. See [next table](#configuration-object) for an exhaustive list of configuration object.

```
// App.tsx

installCloudImage(config);

export default function App() {
//
}
```

<a name="configuration-object"></a>

###### Configuration object

|       Property        |   Type   |     Default     | Description                                                                                                                                                                                                                      |
| :-------------------: | :------: | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         token         |  string  |     'demo'      | Your Cloudimage customer token. Subscribe for a Cloudimage account to get one. The subscription takes less than a minute and is totally free.                                                                                    |
| placeholderBackground |  string  |    '#f4f4f4'    | Placeholder coloured background while the image is loading. Can be set to a [valid url](https://en.wikipedia.org/wiki/URL) in order do display some other resource (image, git, etc.) to display while main resource is loading. |
|     customDomain      |  string  | 'cloudimage.io' | Usually you don't have to change this. Can be used if you use someother domain for some reason.                                                                                                                                  |
|        baseUrl        |  string  |       '/'       | Your image folder on server; this alows to shorten your origin image URLs.                                                                                                                                                       |
|      limitFactor      |  number  |       100       | Rounds up the size of the image to the nearest limitFactor value (for an image with width 358px and limitFactor equal to 100, the plugin will round up to 400px).                                                                |
|    doNotReplaceURL    | boolean  |      false      | If set to true, the plugin will only add query parameters to the provided image source URL.                                                                                                                                      |
| devicePixelRatioList  | number[] |   [1, 1.5, 2]   | List of supported device pixel ratios. If there is no need to support retina devices, you should set empty array.                                                                                                                |

Once that's done you can start using CloudImage [components](#components) in your application.

## Basic example

Below example will show a basic usage of the plugin with help of [CloudImage](#cloudimage-component) component.

```
// SomeComponent.tsx

// imports...

installCloudImage({
  baseUrl: 'https://samples.scaleflex.com/',
  customDomain: 'cloudimg.io',
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

<a name="cloudimage-component"></a>

### CloudImage

<a name="cloudimage-properties"></a>

###### Properties

|       Property        |                    Type                     |              Default              | Description and\or Possible Values                                                                                                                                                                                                                                                                      |
| :-------------------: | :-----------------------------------------: | :-------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|          src          |                   string                    |             **NONE**              | Image source.                                                                                                                                                                                                                                                                                           |
|          alt          |                   string                    |           equal to src            | Image alt                                                                                                                                                                                                                                                                                               |
|      crossOrigin      |                   string                    |            'anonymous'            | Cross-Origin Resource Sharing. [MDN docs.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) Possible values: `'anonymous', 'use-credentials'`.                                                                                                                                            |
|    referrerPolicy     |                   string                    | 'strict-origin-when-cross-origin' | Referrer policy [MDN docs.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy) Possible values: `'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'`. |
|      limitFactor      |                   number                    |  taken from configuration object  | Same to configuration object property.                                                                                                                                                                                                                                                                  |
|      autoResize       |                   boolean                   |               true                | Automatically determine best image sizes.                                                                                                                                                                                                                                                               |
| placeholderBackground |                   string                    |  taken from configuration object  | Same to configuration object property.                                                                                                                                                                                                                                                                  |
|         style         |                 ImageStyle                  |             **NONE**              | [CSS styles](https://developer.mozilla.org/en-US/docs/Web/CSS) passed to image.                                                                                                                                                                                                                         |
|      operations       | OperationsPropertiesIntreface **or** string |             **NONE**              | See [OperationsPropertiesIntreface](#operations-properties-interface).                                                                                                                                                                                                                                  |
|      watermarks       | WatermarksPropertiesIntreface **or** string |             **NONE**              | See [WatermarksPropertiesIntreface](#watermarks-properties-interface).                                                                                                                                                                                                                                  |
|        filters        |  FiltersPropertiesIntreface **or** string   |             **NONE**              | See [FiltersPropertiesIntreface](#filters-properties-interface).                                                                                                                                                                                                                                        |

<a name="operations-properties-interface"></a>

###### OperationsPropertiesIntreface

You can use plain string instead of object as well. See [cloudimage docs](https://docs.cloudimage.io/transformations/image-operations) for more examples.

|      Property       |                Type                | Possible Values                                                                                                                                                                                          |
| :-----------------: | :--------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        width        |               number               | Positive values greater than 1.                                                                                                                                                                          |
|       height        |               number               | Positive values greater than 1.                                                                                                                                                                          |
|      function       |               string               | `'crop', 'face', 'cropfit', 'bound', 'fit', 'boundmin', 'cover', 'facehide'`                                                                                                                             |
| preventEnlargement  |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
|       rotate        |               number               | Positive values greater than 0.                                                                                                                                                                          |
|        trim         |               number               | Positive values greater than 0.                                                                                                                                                                          |
|   removeBackgound   |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
|       margin        |               number               | Positive values greater than 0.                                                                                                                                                                          |
|    upscaleImage     |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
|   blurBackground    |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
| blurBackgroundValue |               number               | Positive values greater than 0.                                                                                                                                                                          |
|  backgroundOpacity  |               number               | Positive values greater than 0.                                                                                                                                                                          |
| backgroundTintColor |               number               | Positive values greater than 0.                                                                                                                                                                          |
|   backgroundColor   |               string               | Color in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format of basic color f.e. `red`.                                                                                                       |
|  devicePixelRatio   |               number               | Positive values greater than 0.                                                                                                                                                                          |
|  backgorundGravity  |               string               | `'north', 'northwest', 'northeast', 'west', 'centre', 'center', 'east', 'southwest', 'south', 'southeast', 'trim'`                                                                                       |
|   horizontalFlip    |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
|    verticalFlip     |              boolean               | `'true', 'false'`                                                                                                                                                                                        |
|       gravity       | string **or** FocalPointInterface  | `'north', 'northwest', 'northeast', 'west', 'centre', 'center', 'east', 'southwest', 'south', 'southeast', 'trim', 'auto', 'face', 'trim', 'smart'` **or** [FocalPointInterface](#focal-point-interface) |
|  positionableCrop   |     PositionableCropInterface      | See [PositionableCropInterface](#positionable-crop-interface).                                                                                                                                           |
|     faceMargin      | number **or** CoordinatesInterface | Positive value greater than 0 **or** [CoordinatesInterface](#coordinates-interface)                                                                                                                      |
|     aspectRatio     |        AspectRatioInterface        | See [AspectRatioInterface](#aspect-ratio-interface).                                                                                                                                                     |
|       radius        |   number **or** RadiusInterface    | Positive value greater than 0 **or** [RadiusInterface](#radius-interface)                                                                                                                                |

<a name="watermarks-properties-interface"></a>

###### WatermarksPropertiesIntreface

You can use plain string instead of object as well. See [cloudimage docs](https://docs.cloudimage.io/transformations/image-watermarking) for more examples.

|      Property      |              Type              | Possible Values                                                                                                          |
| :----------------: | :----------------------------: | :----------------------------------------------------------------------------------------------------------------------- |
|    addWatermark    |            boolean             | `'true', 'false'`                                                                                                        |
|      opacity       |             number             | Positive values greater than 0.                                                                                          |
|        url         |             string             | `'crop', 'face', 'cropfit', 'bound', 'fit', 'boundmin', 'cover', 'facehide'`                                             |
|        text        |             string             | Any string that you want to be displayed.                                                                                |
|        font        |             string             | Font family to be used for text watermark.                                                                               |
|     textColor      |             string             | Color in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format of basic color f.e. `red`.                       |
|  watermarkGravity  |             string             | `'north', 'northwest', 'northeast', 'south', 'southwest', 'southeast', 'east', 'west', 'absolute', 'realtive', 'center'` |
|  watermarkPadding  |   WatermarkPaddingInterface    | See [WatermarkPaddingInterface](#watermark-padding-interface).                                                           |
|      position      |   WatermarkPositionInterface   | See [WatermarkPositionInterface](#watermark-position-interface)                                                          |
|       scale        |    WatermarkScaleInterface     | See [WatermarkScaleInterface](#watermark-scale-interface)                                                                |
|      fontSize      |   WatermarkFontSizeInterface   | See [WatermarkFontSizeInterface](#watermark-font-size-interface)                                                         |
| multipleWatermarks | WatermarkPropertiesIntreface[] | Same as `WatermarksPropertiesIntreface` but without `multipleWatermarks`.                                                |

<a name="filters-properties-interface"></a>

###### FiltersPropertiesIntreface

You can use plain string instead of object as well. See [cloudimage docs](https://docs.cloudimage.io/transformations/image-filters) for more examples.

|   Property   |         Type          | Possible Values                                        |
| :----------: | :-------------------: | :----------------------------------------------------- |
|  brightness  |        number         | Positive values greater than 0.                        |
|   contrast   |        number         | Positive values greater than 0.                        |
|   saturate   |        number         | Positive values greater than 0.                        |
|  grayScale   |        number         | Positive values greater than 0.                        |
|   pixelate   |        number         | Positive values greater than 0.                        |
|     blur     |        number         | Positive values greater than 0.                        |
|   sharpen    |        number         | Positive values greater than 0.                        |
| colorOverlay | ColorOverlayInterface | See [ColorOverlayInterface](#color-overlay-interface). |
|   faceBlur   |   FaceBlurInterface   | See [FaceBlurInterface](#face-blur-interface)          |

<a name="positionable-crop-interface"></a>

###### PositionableCropInterface

|  Property   |         Type         | Possible Values                                     |
| :---------: | :------------------: | :-------------------------------------------------- |
|   topLeft   | CoordinatesInterface | See [CoordinatesInterface](#coordinates-interface). |
| bottomRight | CoordinatesInterface | See [CoordinatesInterface](#coordinates-interface). |
|   center    | CoordinatesInterface | See [CoordinatesInterface](#coordinates-interface). |

<a name="coordinates-interface"></a>

###### CoordinatesInterface

| Property |  Type  | Possible Values                 |
| :------: | :----: | :------------------------------ |
|    x     | number | Positive values greater than 0. |
|    y     | number | Positive values greater than 0. |

<a name="aspect-ratio-interface"></a>

###### AspectRatioInterface

| Property |         Type         | Possible Values                                                 |
| :------: | :------------------: | :-------------------------------------------------------------- |
|   from   | number **or** string | Positive values greater than 0 or ratio string (f.e. : `16:9`). |
|    to    | number **or** string | Positive values greater than 0 or ratio string (f.e. : `16:9`). |

<a name="radius-interface"></a>

###### RadiusInterface

|  Property   |         Type         | Possible Values                               |
| :---------: | :------------------: | :-------------------------------------------- |
|   topLeft   | number **or** string | Positive values greater than 0 or `'max'`.    |
|  topRight   | number **or** string | Positive values greater than 0 or `'max'`.    |
| bottomRight | number **or** string | Positive values greater than 0 or or `'max'`. |
| bottomLeft  | number **or** string | Positive values greater than 0 or or `'max'`. |

<a name="focal-point-interface"></a>

###### FocalPointInterface

|    Property     |  Type  | Possible Values                         |
| :-------------: | :----: | :-------------------------------------- |
| coordinatesType | string | `'pixels', 'percentage', 'coefficient'` |
|        x        | number | Positive values greater than 0.         |
|        y        | number | Positive values greater than 0.         |

<a name="watermark-padding-interface"></a>

###### WatermarkPaddingInterface

| Property |  Type  | Possible Values                 |
| :------: | :----: | :------------------------------ |
|    x     | number | Positive values greater than 0. |
|    y     | number | Positive values greater than 0. |
|  xType   | string | `'pixels', 'percentage'`        |
|  yType   | string | `'pixels', 'percentage'`        |

<a name="watermark-position-interface"></a>

###### WatermarkPositionInterface

| Property |  Type  | Possible Values                 |
| :------: | :----: | :------------------------------ |
|    x     | number | Positive values greater than 0. |
|    y     | number | Positive values greater than 0. |

<a name="watermark-scale-interface"></a>

###### WatermarkScaleInterface

|  Property  |  Type  | Possible Values                 |
| :--------: | :----: | :------------------------------ |
| scaleValue | number | Positive values greater than 0. |
| scaleType  | string | `'pixels', 'percentage'`        |

<a name="watermark-font-size-interface"></a>

###### WatermarkFontSizeInterface

| Property |  Type   | Possible Values                 |
| :------: | :-----: | :------------------------------ |
|   size   | number  | Positive values greater than 0. |
|   max    | boolean | `'true', 'false'`               |

<a name="color-overlay-interface"></a>

###### ColorOverlayInterface

| Property |  Type  | Possible Values                                                                                    |
| :------: | :----: | :------------------------------------------------------------------------------------------------- |
|  color   | string | Color in [hexadecimal](https://en.wikipedia.org/wiki/Web_colors) format of basic color f.e. `red`. |
| opacity  | number | Positive values greater than 0.                                                                    |

<a name="face-blur-interface"></a>

###### FaceBlurInterface

| Property |  Type   | Possible Values                 |
| :------: | :-----: | :------------------------------ |
|  enable  | boolean | `'true', 'false'`               |
|  radius  | number  | Positive values greater than 0. |
|  sigma   | number  | Positive values greater than 0. |

// TODO: Add description with default and required values -\_\_-.
// TODO: Adjust naming to be more consistent -\_\_-.
