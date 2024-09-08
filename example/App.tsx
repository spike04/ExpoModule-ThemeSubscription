import * as Settings from "expo-settings";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [theme, setTheme] = useState<string>(Settings.getTheme());
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const subscription = Settings.addThemeListener(({ theme }) => {
      setTheme(theme);
    });

    return () => {
      subscription.remove();
    };
  }, [setTheme]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "black" : "white",
        },
      ]}
    >
      <Text style={{ color: theme === "dark" ? "white" : "black" }}>
        Theme: {theme}
      </Text>

      <Button
        title="Change theme"
        onPress={() => Settings.setTheme(nextTheme)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
