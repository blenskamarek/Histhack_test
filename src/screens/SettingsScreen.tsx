import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { usePreferencesStore } from '@/store/usePreferencesStore';

export const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = usePreferencesStore();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.label}>
        Tryb ciemny
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
});
