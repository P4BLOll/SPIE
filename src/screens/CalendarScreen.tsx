import { View, Text, StyleSheet } from 'react-native';

export function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <Text>Aqui ficará o calendário interativo.</Text>
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