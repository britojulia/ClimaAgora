import { Feather, Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/build/Fontisto";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const OPENWEATHER_API_KEY = "c7f05dd3a1cc997ab160ec3a8856fe96";
const WEATHERAPI_KEY = "23a0381572b443d6895212011252105"; 

const hour = new Date().getHours();
const isDayTime = hour >= 6 && hour < 18;


type DailyForecast = {
  dt: number;
  temp: { day: number };
  weather: { description: string; icon: string }[];
};

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para acessar localização foi negada");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

 useEffect(() => {
  async function fetchWeather() {
    if (!location?.coords) return; // <-- Aqui está a verificação segura

    try {
      const { latitude, longitude } = location.coords;

      // Clima atual (OpenWeather)
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${OPENWEATHER_API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      // Previsão (WeatherAPI)
      const forecastResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${latitude},${longitude}&days=7&lang=pt`
      );
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);

      if (forecastData.forecast?.forecastday) {
        const convertedForecast = forecastData.forecast.forecastday
          .slice(1, 7)
          .map((day: any) => ({
            dt: new Date(day.date).getTime() / 1000,
            temp: { day: day.day.avgtemp_c },
            weather: [{
              description: day.day.condition.text,
              icon: day.day.condition.icon
            }],
          }));
        setForecast(convertedForecast);
      } else {
        setForecast([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchWeather();
}, [location]);


  if (loading) {
    return (
      <LinearGradient colors={["#6a00d2", "#f7e2f6"]} style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView
          style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!weather || weather.cod !== 200) {
    return (
      <LinearGradient colors={["#6a00d2", "#f7e2f6"]} style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView
          style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Não foi possível obter o clima.</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const city = weather.name;
  const temp = Math.round(weather.main.temp);
  const description = weather.weather[0].description;
  const windSpeed = Math.round(weather.wind.speed * 3.6); // m/s para km/h
  const humidity = weather.main.humidity;
  const uvIndex = "Índice UV"; // Pode adicionar futuramente

  function getWeekday(dt: number) {
    const date = new Date(dt * 1000);
    return date
      .toLocaleDateString("pt-BR", { weekday: "long" })
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <LinearGradient colors={["#6a00d2", "#f7e2f6"]} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Localização */}
        <View style={styles.locationContainer}>
          <Text style={styles.cityText}>{city}</Text>
        </View>

        {/* Temperatura + Ícone */}
        <View style={styles.temperatureWrapper}>
          <Feather name={isDayTime ? "sun" : "moon"} size={200} color="#FFFFFF" />
          <Text style={styles.temperature}>{temp}&#176;</Text>
          <Text style={styles.weatherDescription}>{description}</Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Fontisto name="wind" size={24} color="#4B0082" />
            <Text style={styles.infoText}>{windSpeed} km/h</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="water-outline" size={24} color="#4B0082" />
            <Text style={styles.infoText}>{humidity}%</Text>
          </View>
          <View style={styles.infoBox}>
            <Feather name="sun" size={24} color="#4B0082" />
            <Text style={styles.infoText}>{uvIndex}</Text>
          </View>
        </View>

        {/* Temperatura dos próximos dias */}
        <View style={styles.forecastContainer}>
          <View style={styles.forecastHeader}>
            <Feather name="calendar" size={20} color="#4B0082" />
            <Text style={styles.forecastTitle}>Temperatura dos Próximos Dias</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {forecast.map((day, index) => (
              <View style={styles.dayBox} key={index}>
                <Image
                  source={{ uri: `https:${day.weather[0].icon}` }}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
                <Text style={styles.dayText}>{getWeekday(day.dt)}</Text>
                <Text style={styles.dayTemp}>{Math.round(day.temp.day)}&#176;</Text>
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
    justifyContent: "space-between",
  },
  locationContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  cityText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  temperatureWrapper: {
    alignItems: "center",
  },
  temperature: {
    fontSize: 120,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  weatherDescription: {
    fontSize: 22,
    color: "#4B0082",
    marginTop: 8,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  infoBox: {
    alignItems: "center",
  },
  infoText: {
    color: "#4B0082",
    marginTop: 5,
  },
  forecastContainer: {
    marginTop: 30,
  },
  forecastHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  forecastTitle: {
    fontSize: 16,
    color: "#4B0082",
    marginLeft: 10,
  },
  dayBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    width: 100,
  },
  dayText: {
    color: "#2F2F2F",
    marginTop: 5,
    textTransform: "capitalize",
  },
  dayTemp: {
    color: "#2F2F2F",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});
