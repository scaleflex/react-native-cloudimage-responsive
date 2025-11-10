import { StyleSheet, View } from 'react-native';
import { installCloudImage, CloudImage } from 'react-native-cloudimage-plugin';

export const CLOUDIMAGE_SOURCE_URL_TEST = 'https://samples.scaleflex.com/'; // And this doesn't => why?

export const CLOUDIMAGE_SOURCE_URL_TEST_2 =
  'https://doc.cloudimg.io/https://samples.scaleflex.com/'; // This works

installCloudImage({ domain: CLOUDIMAGE_SOURCE_URL_TEST_2 });

export default function App() {
  return (
    <View style={styles.container}>
      <CloudImage src="hotel.jpg" width={200} height={100} func="cropfit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    gap: 20,
  },
});
