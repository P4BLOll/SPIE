import { View, Text, StyleSheet } from 'react-native';

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text>Aqui aparecerão os ciclos registrados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF5F7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#9D174D',
  },
});