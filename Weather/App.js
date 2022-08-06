import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { API_KEYS } from "./apikey";
import { Fontisto } from "@expo/vector-icons";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Clear: "day-sunny",
  Atmosphere: "fog",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
export default function App() {
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].district);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEYS}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // 스크롤 바 숨기기옵션
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="black"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tiny}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006CB8",
  },
  cityName: {
    color: "black",
    fontSize: 68,
    fontWeight: "600",
  },
  city: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    paddingLeft: 15,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
  },
  description: {
    fontSize: 60,
  },
  tiny: {
    fontSize: 20,
  },
});
