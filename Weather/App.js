import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
export default function App() {
  const ask = async () => {
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
    console.log(location[0]);
  };
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // 스크롤 바 숨기기옵션
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    borderTopWidth: 3,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    fontSize: 60,
  },
});
