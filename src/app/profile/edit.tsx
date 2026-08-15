import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {router} from 'expo-router';
import {Background} from '@/components/Background';
import {Colors} from '@/constants/Colors';

export default function EditProfile() {

    const [name, setName] = useState('Usuária');
    const [email, setEmail] = useState('usuario@email.com');

    return (

        <Background>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => router.back()}
                >

                    <Text style={{ color: Colors.text }}>
                        ←
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Editar Perfil
                </Text>

                <View style={styles.card}>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome"
                        placeholderTextColor={Colors.textMuted}
                        style={styles.input}
                    />

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={Colors.textMuted}
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Salvar alterações
                    </Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = {

    container: {
        flex: 1,
        padding: 24
    },

    back: {
        width: 42,
        height: 42,
        marginBottom: 20
    },

    title: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.text
    },

    card: {
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 25,
        marginTop: 30
    },

    input: {
        height: 55,
        backgroundColor: Colors.background,
        borderRadius: 18,
        paddingHorizontal: 15,
        color: Colors.text,
        marginBottom: 15
    },

    button: {
        height: 55,
        backgroundColor: Colors.primary,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },

    buttonText: {
        color: '#fff',
        fontWeight: '900'
    }
}