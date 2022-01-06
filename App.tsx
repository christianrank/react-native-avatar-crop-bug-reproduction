import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Crop from 'react-native-avatar-crop'

export default function App() {
  const [imageUri, setImageUri] = useState<string>()
  
  let crop;
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>Pick test image</TouchableOpacity>
      
      {!!imageUri && (
        <Crop
          source={{ uri: imageUri }}
          width={SCREEN_WIDTH}
          height={(SCREEN_WIDTH)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
