import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const symptoms = ['Cólicas', 'Dor de cabeça', 'Cansaço', 'Inchaço', 'Humor alterado'];

type Props = {
  selectedSymptoms: string[];
  onChange: (symptoms: string[]) => void;
};

export function SymptomSelector({ selectedSymptoms, onChange }: Props) {
  function toggleSymptom(symptom: string) {
    if (selectedSymptoms.includes(symptom)) {
      onChange(selectedSymptoms.filter(item => item !== symptom));
    } else {
      onChange([...selectedSymptoms, symptom]);
    }
  }

  return (
    <View>
      <Text style={styles.title}>Sintomas</Text>

      <View style={styles.container}>
        {symptoms.map(symptom => {
          const selected = selectedSymptoms.includes(symptom);

          return (
            <TouchableOpacity
              key={symptom}
              style={[styles.option, selected && styles.selected]}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text style={selected ? styles.selectedText : styles.text}>
                {symptom}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9D174D',
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F9A8D4',
  },
  selected: {
    backgroundColor: '#DB2777',
  },
  text: {
    color: '#9D174D',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});