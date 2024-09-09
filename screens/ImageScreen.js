import { 
  Dimensions, 
  Image, 
  KeyboardAvoidingView, 
  Modal, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  useWindowDimensions, 
  View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNote } from '../context';

export default function ImageScreen(item) {
  const { note, image } = item.route.params.item;
  const { setNote } = useNote();
  const { width, height } = useWindowDimensions();

  const [imageDimension, setImageDimension] = useState({ width: width, height: height });
  const [isPotrait, setIsPotrait] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setImageDimension({
      width: width * 0.8,
      height: height * 0.5,
    })
  }, [width]);
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      const newDimension = Dimensions.get('window');
      if (newDimension.height > newDimension.width) {
        setIsPotrait(true);
      }
      else {
        setIsPotrait(!isPotrait);
      }
    });
    
    return () => subscription?.remove();
  }, [],)

  const handleEdit = () => {
    setNote(note);
    setModalVisible(!modalVisible);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View />
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }}
          style={{width: imageDimension.width, height: imageDimension.height}}
          resizeMode='stretch'
        />
        <Text style={styles.imageText}>{note}</Text>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput 
              style={styles.modalInput}
              value={note}
              autoFocus={true}
              onChangeText={setNote}
            />
            <View style={isPotrait ? styles.modalButtonVerticalContainer : styles.modalButtonHorizontalContainer}>
              <Pressable 
                style={styles.modalButton}
                onPress={() => handleEdit()}
              >
                <Text style={styles.modalButtonText}>Edit</Text>
              </Pressable>
              <Pressable 
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Cancle</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
      <View style={isPotrait ? styles.buttonVerticalContainer : styles.buttonHorizontalContainer}>
        <Pressable 
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  imageContainer: {
    minWidth: '80%',
    minHeight: '70%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 30 * 1.4,
  },
  buttonHorizontalContainer: {
    minHeight: '40%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonVerticalContainer: {
    minHeight: '20%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    maxHeight: '20%',
    minWidth: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21a691'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 20 * 1.4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: '0%',
      height: '2%',
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '50%',
    padding: '5%',
    minHeight: '20%'
  },
  modalInput: {
    borderWidth: 1,
    margin: '2%',
    borderColor: '#c0c0c0',
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  modalButtonVerticalContainer: {
    minHeight: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  modalButtonHorizontalContainer: {
    minWidth: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21a691',
    borderRadius: 10,
    minWidth: '30%'
  },
  modalButtonText: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: '#fff',
  }
})