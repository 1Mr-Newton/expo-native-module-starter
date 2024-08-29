import * as Settings from "expo-settings";
import * as React from "react";
import { Button, Text, View } from "react-native";

export default function App() {
  const [theme, setTheme] = React.useState<string>(Settings.getTheme());
  const [randomNumber, setRandomNumber] = React.useState<number>(0);

  React.useEffect(() => {
    const subscription = Settings.addThemeListener(({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    return () => subscription.remove();
  }, []);

  // Function to handle generating a random number
  const handleGenerateRandomNumber = async () => {
    try {
      // Set the range for the random number
      const min = 1;
      const max = 1000;
      const random = await Settings.generateRandomNumber(min, max);
      setRandomNumber(random);
    } catch (error) {
      console.error("Error generating random number:", error);
    }
  };

  // Toggle between dark and light theme
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Theme: {theme}</Text>
      <Button
        title={`Set theme to ${nextTheme}`}
        onPress={() => Settings.setTheme(nextTheme)}
      />
      <Text>Random number: {randomNumber}</Text>
      <Button
        title="Generate random number"
        onPress={handleGenerateRandomNumber}
      />
    </View>
  );
}
