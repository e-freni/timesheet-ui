export type Workday = {
  id?: number;
  date: Date;
  userId: number;
  workingHours: number;
  extraHours: number;
  nightWorkingHours: number;
  workPermitHours: number;
  funeralLeave: boolean;
  holiday: boolean;
  sick: boolean;
  accidentAtWork: boolean;
  notes: string;
};
