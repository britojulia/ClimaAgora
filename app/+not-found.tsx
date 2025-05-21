import { Link, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <LinearGradient colors={["#6a00d2", "#f7e2f6"]} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Ops! 404- pagina não encontrada .</Text>

          <Link href="/" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Voltar para a tela inicial</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(75, 0, 130, 0.3)', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
