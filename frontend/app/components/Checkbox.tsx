import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const Checkbox = ({ checked, onToggle, color }:{ checked:any, onToggle:any, color:any }) => {
    return (
        <Pressable
            style={[
                styles.checkboxBase,
                checked && styles.checkboxChecked,
                checked && color && { backgroundColor: color, borderColor: color },
            ]}
            onPress={onToggle}
        >
            {checked && <Ionicons name="checkmark" size={15} color="white" />}
        </Pressable>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: 'black',
    },
});
