import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleRecord } from '../types/cycle';

const STORAGE_KEY = '@menstrual_calendar:cycles';

export async function saveCycle(cycle: CycleRecord) {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const cycles: CycleRecord[] = stored ? JSON.parse(stored) : [];

  cycles.push(cycle);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
}

export async function getCycles(): Promise<CycleRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearCycles() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}