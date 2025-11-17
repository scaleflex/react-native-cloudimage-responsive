import { StyleSheet, View } from 'react-native';
import { installCloudImage, CloudImage } from 'react-native-cloudimage-plugin';

const LOADING_BACKGROUND_SRC = 'https://c.tenor.com/WX_LDjYUrMsAAAAC/tenor.gif';

installCloudImage({
  baseUrl: 'https://samples.scaleflex.com/',
  customDomain: 'cloudimg.io',
  lazyLoading: false,
  token: 'doc',
});

export default function App() {
  return (
    <View style={styles.view}>
      <div style={styles.container}>
        <CloudImage
          src="hotel.jpg"
          autoResize
          placeholderBackground={LOADING_BACKGROUND_SRC}
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
      </div>

      <div style={styles.divider} />

      <div style={styles.container}>
        <CloudImage
          src="castle.jpg"
          operations={'flip=v&func=cover'}
          autoResize
        />
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 2000,
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
