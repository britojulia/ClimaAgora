import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Inicial() {
  const router = useRouter();

  function goToHome() {
    router.push('/navigation/home');
  }

  return (
    <LinearGradient colors={["#f7e2f6", "#6a00d2"]} style={styles.container}>
      <View style={styles.content}>
        <FontAwesome5 name="cloud-sun" size={80} color="white" />
        <Text style={styles.title}>Bem-vindo ao ClimaTempo!</Text>

        <Text style={styles.subtitle}>
          Confira a previsão do tempo na sua cidade de forma simples.
        </Text>

        <Text style={styles.subtitleSpam}>
          Não esqueça de permitir a localização
        </Text>

        <TouchableOpacity style={styles.button} onPress={goToHome} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Ver Clima</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B0082',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10, 
    lineHeight: 26,
  },
  subtitleSpam: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: 'rgba(75, 0, 130, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    opacity: 70
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
