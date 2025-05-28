import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DayModal = ({ visible, onClose, date, workouts }) => {
    return (
        <Modal
            visible={visible}>
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.dateText}>{date}</Text>
                            <ScrollView style={{ maxHeight: 300 }}>
                                {workouts.length > 0 ? (
                                workouts.map((item, index) => (
                                    <View key={item.id || index} style={styles.workoutCard}>
                                    <Text style={styles.summary}>{item.summary}</Text>
                                    <Text style={styles.length}>Length: {item.length}</Text>
                                    </View>
                                ))
                                ) : (
                                <Text>No workouts logged for this day.</Text>
                                )}
                        </ScrollView>

                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 24,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    workoutCard: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  summary: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  length: {
    color: '#555',
  },
});

export default DayModal;