export type FlowLevel = 'leve' | 'medio' | 'intenso';

export type CycleRecord = {
  id: string;
  startDate: string;
  periodDuration: number;
  cycleDuration: number;
  symptoms?: string[];
  flow?: FlowLevel;
  notes?: string;
};