import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { 
  Dimensions,
  FlatList, 
  KeyboardAvoidingView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useNote } from '../context';

export default function HomeScreen() {
  const navigation = useNavigation(); 
  const { note, setNote } = useNote();

  const [dismension, setDismension] = useState(useWindowDimensions());
  const [image, setImage] = useState('');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setDismension(window);
      }
    );
    return () => subscription?.remove();
  });

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  };

  const handleAddImage = () => {
    if (image !== '' && note !== '') {
      const newImage = {
        image: image,
        note: note,
      }
      setImageList([...imageList, newImage]);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Image Management</Text>
      <Text style={{fontSize: 14, textAlign: 'center'}}>Tran Bui Quang Huy - 2124801030189</Text>
      <View style={{height: '6%'}} />
      <FlatList
        style={styles.listContainer}
        data={imageList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listButton}
            onPress={() => navigation.navigate('Image', { item })}
          >
            <Text style={styles.listText}>{item.note}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.imageInput}>
        <TextInput 
          style={styles.noteInput} 
          placeholder='Write note for image'
          onChangeText={(item) => setNote(item)}
        />
        <Feather 
          name='upload' 
          size={40} 
          onPress={() => uploadPhoto()}
        />
      </View>
      <View style={{height: '2%'}} />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddImage()}
      >
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E8EAED',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 25 * 1.4,
    fontWeight: '700',
  },
  listContainer: {
    maxHeight: '70%',
    minWidth: '100%',
  },
  listButton: {
    backgroundColor: '#fff',
    minWidth: '85%',
    alignSelf: 'center',
    margin: '2%',
  },
  listText: {
    fontSize: 30,
    paddingLeft: '5%',
  },
  imageInput: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  noteInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    width: '70%',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#21a691',
    minWidth: '50%',
    minHeight: '4%',
  },
  addButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: '#fff'
  }
});
