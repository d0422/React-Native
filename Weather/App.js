import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
      </View>
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
  weather: {
    flex: 3,
  },
  day: {
    borderTopWidth: 3,
    flex: 1,
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
