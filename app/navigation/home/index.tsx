import { Feather, Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/build/Fontisto";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <LinearGradient colors={["#6a00d2", "#f7e2f6"]} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Localização */}
        <View style={styles.locationContainer}>
          <Text style={styles.cityText}>
            São Paulo, <Text style={styles.stateText}>SP</Text>
          </Text>
        </View>

        {/* Temperatura + Ícone */}
        <View style={styles.temperatureWrapper}>
          <Feather name="moon" size={200} color="#FFFFFF" />
          <Text style={styles.temperature}>22&#176;</Text>
          <Text style={styles.weatherDescription}>Parcialmente nublado</Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Fontisto name="wind" size={24} color="#4B0082" />
            <Text style={styles.infoText}>22 km/h</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="water-outline" size={24} color="#4B0082" />
            <Text style={styles.infoText}>90%</Text>
          </View>
          <View style={styles.infoBox}>
            <Feather name="sun" size={24} color="#4B0082" />
            <Text style={styles.infoText}>Índice UV</Text>
          </View>
        </View>

        {/* Temperatura dos próximos dias */}
        <View style={styles.forecastContainer}>
          <View style={styles.forecastHeader}>
            <Feather name="calendar" size={20} color="#4B0082" />
            <Text style={styles.forecastTitle}>Temperatura dos Próximos Dias</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View style={styles.dayBox} key={index}>
                <Fontisto name="day-cloudy" size={24} color="#4B0082" />
                <Text style={styles.dayText}>Segunda</Text>
                <Text style={styles.dayTemp}>22&#176;</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  locationContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  cityText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stateText: {
    fontSize: 20,
    color: '#D3D3D3',
  },
  temperatureWrapper: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 120,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  weatherDescription: {
    fontSize: 22,
    color: '#4B0082',
    marginTop: 8,
   fontWeight: "bold",
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  infoBox: {
    alignItems: 'center',
  },
  infoText: {
    color: '#4B0082',
    marginTop: 5,
  },
  forecastContainer: {
    marginTop: 30,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  forecastTitle: {
    fontSize: 16,
    color: '#4B0082',
    marginLeft: 10,
  },
  dayBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 100,
  },
  dayText: {
    color: '#2F2F2F',
    marginTop: 5,
  },
  dayTemp: {
    color: '#2F2F2F',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
