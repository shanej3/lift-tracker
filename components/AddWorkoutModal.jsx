// AddWorkoutModal.jsx
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddWorkoutModal = ({ visible, onClose, onSave }) => {
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState('');

  const handleSave = () => {
    if (!summary.trim() || !length.trim()) {
      alert('Please fill all fields.');
      return;
    }
    onSave({ summary, length });
    setSummary('');
    setLength('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Workout</Text>
          <TextInput
            style={styles.input}
            placeholder="Workout summary"
            value={summary}
            onChangeText={setSummary}
          />
          <TextInput
            style={styles.input}
            placeholder="Length (e.g., 45 min)"
            value={length}
            onChangeText={setLength}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    padding:20,
  },
  modalContent: {
    backgroundColor:'white',
    borderRadius:10,
    padding:20,
  },
  title: {
    fontSize:18,
    fontWeight:'bold',
    marginBottom:10,
  },
  input: {
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:6,
    padding:10,
    marginBottom:15,
  },
  buttons: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  button: {
    backgroundColor:'#2196F3',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:6,
  },
  cancel: {
    backgroundColor:'gray',
  },
  buttonText: {
    color:'white',
    fontWeight:'bold',
  },
});

export default AddWorkoutModal;
