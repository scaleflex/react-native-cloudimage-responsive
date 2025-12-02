import { ScrollView, StyleSheet, View } from 'react-native';
import {
  CloudImage,
  installCloudImage,
} from 'react-native-cloudimage-responsive';

const LOADING_BACKGROUND_SRC = 'https://c.tenor.com/WX_LDjYUrMsAAAAC/tenor.gif';

installCloudImage({
  baseUrl: 'https://samples.scaleflex.com/',
  domain: 'cloudimg.io',
  lazyLoading: true,
  lazyInterval: 200,
  lazyTreeshold: 100,
  token: 'doc',
});

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <View style={styles.container}>
        <CloudImage
          src="hotel.jpg"
          placeholderBackground={LOADING_BACKGROUND_SRC}
          filters={{ blur: 1, colorOverlay: { color: 'red' } }}
          watermarks={{
            addWatermark: true,
            text: 'global',
            multipleWatermarks: [
              { addWatermark: true, text: 'first' },
              { addWatermark: true, text: 'second' },
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
            backgroundColor: 'cccc30',
          }}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.container}>
        <CloudImage src="castle.jpg" operations={'flip=v&func=cover'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 200,
    minWidth: 200,
    maxWidth: 200,
    maxHeight: 200,
    margin: 20,
    overflow: 'hidden',
  },

  divider: {
    flex: 1,
    width: 500,
    minWidth: 500,
    height: 1000,
    minHeight: 1000,
    backgroundColor: '#f55',
  },
});
