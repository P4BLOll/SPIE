import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  day: number;
  type?: 'normal' | 'period' | 'fertile' | 'ovulation';
};

export function CalendarDay({ day, type = 'normal' }: Props) {
  return (
    <TouchableOpacity style={[styles.day, styles[type]]}>
      <Text>{day}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  day: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#FFFFFF',
  },
  normal: {
    backgroundColor: '#FFFFFF',
  },
  period: {
    backgroundColor: '#FDA4AF',
  },
  fertile: {
    backgroundColor: '#A7F3D0',
  },
  ovulation: {
    backgroundColor: '#C4B5FD',
  },
});