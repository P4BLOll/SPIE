export function calculateCycleInfo(
  lastPeriodDate: Date,
  cycleDuration: number,
  periodDuration: number
) {
  const today = new Date();

  const diffTime = today.getTime() - lastPeriodDate.getTime();
  const currentCycleDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const nextPeriod = new Date(lastPeriodDate);
  nextPeriod.setDate(lastPeriodDate.getDate() + cycleDuration);

  const ovulationDate = new Date(nextPeriod);
  ovulationDate.setDate(nextPeriod.getDate() - 14);

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(ovulationDate.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(ovulationDate.getDate() + 1);

  const daysUntilNextPeriod = Math.ceil(
    (nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let phase = 'Fase comum';

  if (currentCycleDay <= periodDuration) {
    phase = 'Período menstrual';
  } else if (today >= fertileStart && today <= fertileEnd) {
    phase = 'Janela fértil';
  } else if (today.toDateString() === ovulationDate.toDateString()) {
    phase = 'Ovulação';
  }

  return {
    currentCycleDay,
    nextPeriod,
    ovulationDate,
    fertileStart,
    fertileEnd,
    daysUntilNextPeriod,
    phase,
  };
}