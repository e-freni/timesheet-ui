export type Workday = {
  id?: number,
  date: Date,
  usernameId: number,
  workingHours: number,
  extraHours: number,
  workPermitHours: number,
  funeralLeaveHours: number,
  holiday: boolean,
  sick: boolean,
  accidentAtWork: boolean,
  notes: string,
};
