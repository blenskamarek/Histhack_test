import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { InfoCard } from '@/components/InfoCard';
import { fetchStatus } from '@/services/api';

export const HomeScreen = () => {
  const theme = useTheme();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus,
    enabled: false,
  });

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text variant="headlineMedium" style={styles.heading}>
        Witamy w Histhack App
      </Text>
      <InfoCard
        title="Status API"
        description={
          isFetching
            ? 'Ładowanie...'
            : data
            ? JSON.stringify(data, null, 2)
            : 'Kliknij "Odśwież", aby pobrać dane.'
        }
      />
      <Button mode="contained" onPress={() => refetch()} style={styles.button}>
        Odśwież
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});
