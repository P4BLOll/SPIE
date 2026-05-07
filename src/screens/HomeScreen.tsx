import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário Menstrual</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Próxima menstruação</Text>
        <Text style={styles.bigText}>Faltam 8 dias</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Status atual</Text>
        <Text style={styles.phase}>Janela fértil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Dia do ciclo</Text>
        <Text style={styles.bigText}>Dia 19</Text>
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9D174D',
    marginBottom: 24,
    textAlign: 'center',
  },
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
  bigText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#DB2777',
    marginTop: 8,
  },
  phase: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BE185D',
    marginTop: 8,
  },
});