import { StyleSheet, View } from 'react-native';
import { installCloudImage, CloudImage } from 'react-native-cloudimage-plugin';

export const CLOUDIMAGE_SOURCE_URL_TEST = 'https://samples.scaleflex.com/'; // And this doesn't => why?

export const CLOUDIMAGE_SOURCE_URL_TEST_2 =
  'https://doc.cloudimg.io/https://samples.scaleflex.com/'; // This works

installCloudImage({
  baseUrl: 'https://samples.scaleflex.com/',
  customDomain: 'cloudimg.io',
  token: 'doc',
});

export default function App() {
  return (
    <View style={styles.view}>
      <div style={styles.container}>
        <CloudImage
          src="hotel.jpg"
          operations={{
            width: 200,
            verticalFlip: true,
            radius: {
              topLeft: 0,
              topRight: 'max',
              bottomLeft: 'max',
              bottomRight: 'max',
            },
            aspectRatio: { from: 1.7, to: 2 },
            backgroundColor: 'cccc30',
          }}
        />
      </div>

      <div style={styles.divider} />

      <div style={styles.container}>
        <CloudImage src="castle.jpg" />
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
    maxHeight: 200,
    maxWidth: 200,
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
