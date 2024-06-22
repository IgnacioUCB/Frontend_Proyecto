import React from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomColors } from "../theme/AppTheme";

interface Props {
    text: String,
    onPress: () => void
    color?: string
}

export const RoundedButton = ({ text, onPress, color }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.roundedButton,color && {backgroundColor: color}]}
            onPress={() => {
                Keyboard.dismiss()
                onPress()
            }}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedButton: {
        alignItems: 'center',
        backgroundColor: '#F0052C',
        borderRadius: 0,
        padding: 15,
        width: '100%',

    },
    textButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});
