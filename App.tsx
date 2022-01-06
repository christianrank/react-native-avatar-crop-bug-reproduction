import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Crop from 'react-native-avatar-crop'
import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  const [imageUri, setImageUri] = useState<string>()

  let crop;
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }

  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: change to ScrollView to reproduce the bug */}
      <View>
        <TouchableOpacity onPress={pickImage} style={{ padding: 10 }}><Text>Pick test image</Text></TouchableOpacity>
        <TouchableOpacity onPress={takeImage} style={{ padding: 10 }}><Text>Take test image</Text></TouchableOpacity>
        
        {!!imageUri && (
          <Crop
            source={{ uri: imageUri }}
            width={SCREEN_WIDTH}
            height={SCREEN_WIDTH}
            cropShape="rect"
            cropArea={{
              width: SCREEN_WIDTH / 1.3,
              height: SCREEN_WIDTH / 1.3,
            }}
            borderWidth={0}
            onCrop={(cropCallback) => (crop = cropCallback)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
