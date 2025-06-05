import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LogWorkoutModal({ visible, onClose, onSubmit, initialStartTime, totalTime }) {
    const [summaryText, setSummaryText] = useState('');

    const handleSubmit = () => {
        onSubmit(initialStartTime, summaryText, totalTime);
    }
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                <Text style={styles.modalText}>Would you like to log this exercise?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSummaryText}
                    value={summaryText}
                    placeholder="Workout summary"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                    <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                </View>
            </View>
    </Modal>
    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});