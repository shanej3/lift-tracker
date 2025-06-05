import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DayModal = ({ visible, onClose, date, workouts, onDeleteWorkout, onEditWorkout }) => {
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
                                        
                                        <View style={styles.buttonLayout}>
                                            
                                            <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => onEditWorkout(item.id)}
                                            >
                                            <Text style={styles.deleteButtonText}>Edit</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => onDeleteWorkout(item.id)}
                                            >
                                            <Text style={styles.deleteButtonText}>Delete</Text>
                                            </TouchableOpacity>
                                        
                                        </View>
                                        
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutCard: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,

  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
  },
  length: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    marginTop: 8,
    padding: 6,
    backgroundColor: 'red',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  editButton: {
    marginTop: 8,
    padding: 6,
    backgroundColor: 'green',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DayModal;