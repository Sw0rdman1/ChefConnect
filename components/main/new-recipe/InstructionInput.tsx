import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface InstructionInputProps {
    values: {
        steps: string[];
    };
    handleChange: any;
}


const InstructionInput: React.FC<InstructionInputProps> = ({ values, handleChange }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [instructions, setInstructions] = useState(values.steps);
    const { tint, backgroundDarker, text } = useColors();

    const handleClose = () => {
        setModalVisible(false);
    }

    const handleSave = () => {
        const newInstructions = instructions.filter(instruction => instruction.trim() !== '');
        handleChange("steps", newInstructions);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Recipe Instructions
            </Text>
            <TouchableOpacity
                style={[styles.buttonAdd, { backgroundColor: tint }]}
                onPress={() => setModalVisible(true)}
            >
                {instructions[0] === '' ?
                    <MaterialCommunityIcons name="plus" size={22} color="white" /> :
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', paddingHorizontal: 10, padding: 2, }}>
                        <Text style={styles.buttonText}>
                            {`${instructions.length} step${instructions.length > 1 ? 's' : ''}`}
                        </Text>
                        <MaterialCommunityIcons name="pencil" size={20} color="white" />
                    </View>
                }
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Recipe Instructions</Text>
                        {instructions.map((instruction, index) => (
                            <View style={styles.textInputContainer} key={index}>
                                <Text style={[styles.textInputLabel, { color: tint }]}>
                                    {index + 1}.
                                </Text>
                                <TextInput
                                    placeholder={`Step ${index + 1}`}
                                    placeholderTextColor={'gray'}
                                    style={[styles.textInput, { borderColor: tint }]}
                                    value={instruction}
                                    onChangeText={(text) => {
                                        const newInstructions = [...instructions];
                                        newInstructions[index] = text;
                                        setInstructions(newInstructions);
                                    }}
                                    onSubmitEditing={() => {
                                        console.log("submitted");
                                    }}
                                />
                                {index !== 0 &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newInstructions = [...instructions];
                                            newInstructions.splice(index, 1);
                                            setInstructions(newInstructions);
                                        }}
                                    >
                                        <MaterialCommunityIcons name="delete" size={24} color="gray" />
                                    </TouchableOpacity>
                                }
                            </View>
                        ))}
                        <TouchableOpacity
                            style={[styles.addNewStepButton, { backgroundColor: backgroundDarker }]}
                            onPress={() => setInstructions([...instructions, ""])}
                        >
                            <Text style={styles.addNewStepButtonText}>Add new step</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleClose}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: tint }]}
                                onPress={handleSave}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InstructionInput

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    centeredView: {
        flex: 1,
        paddingTop: 120,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    buttonAdd: {
        padding: 5,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    modalView: {
        width: width - 40,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 35,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
    },
    textInputLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        marginRight: 10,
    },
    textInput: {
        paddingBottom: 5,
        width: '80%',
        borderBottomWidth: 1,
        marginRight: 10,
        padding: 0,
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        height: 40,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: '#ff6347',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    addNewStepButton: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    addNewStepButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
})