import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DayModal = ({ visible, onClose, date, summary, length }) => {
    return (
        <Modal
            visible={visible}>
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.dateText}>{date}</Text>
                        {summary && length ? (
                            <>
                                <Text style={styles.dateText}>{summary}</Text>
                                <Text style={styles.dateText}>{length}</Text>
                            </>
                        ) : (
                            <Text style={styles.dateText}>No workouts this day!</Text>
                        )}
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
});

export default DayModal;