import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
};

export function CycleCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DB2777',
    marginTop: 8,
  },
});