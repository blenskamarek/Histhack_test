import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

type InfoCardProps = {
  title: string;
  description: string;
};

export const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
