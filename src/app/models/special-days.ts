export type SpecialDay = {
  holidayDate: string;
  holidayName: string;
};

export const NEW_YEARS_EVE: SpecialDay = { holidayDate: '1/1', holidayName: 'Capodanno' };
export const EPIPHANY: SpecialDay = { holidayDate: '6/1', holidayName: 'Epifania' };
export const APRIL_TWENTY_FIFTH: SpecialDay = { holidayDate: '25/4', holidayName: 'Festa della liberazione' };
export const WORKERS_DAY: SpecialDay = { holidayDate: '1/5', holidayName: 'Festa dei lavoratori' };
export const REPUBLIC_DAY: SpecialDay = { holidayDate: '2/6', holidayName: 'Festa della Repubblica' };
export const MIDSUMMER: SpecialDay = { holidayDate: '24/6', holidayName: 'Festa di San Giovanni (solo a Firenze!)' };
export const MID_AUGUST: SpecialDay = { holidayDate: '15/8', holidayName: 'Ferragosto' };
export const ALL_SAINTS_DAY: SpecialDay = { holidayDate: '1/11', holidayName: 'Ognissanti' };
export const IMMACULATE_CONCEPTION: SpecialDay = { holidayDate: '8/12', holidayName: 'Immacolata concezione' };
export const CHRISTMAS: SpecialDay = { holidayDate: '25/12', holidayName: 'Natale' };
export const BOXING_DAY: SpecialDay = { holidayDate: '26/12', holidayName: 'Santo Stefano' };

function easterAlgoritm(year: number): Date {
  let date, step1, step2, step3, step4, step5;
  date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year);
  step1 = year % 19;
  step2 = 2200 <= year && year <= 2299 ? (11 * step1 + 4) % 30 : (11 * step1 + 5) % 30;
  step3 = step2 === 0 || (step2 === 1 && step1 > 10) ? step2 + 1 : step2;
  step4 = 1 <= step3 && step3 <= 19 ? 3 : 2;
  step5 = (50 - step3) % 31;
  date.setMonth(step4, step5);
  date.setMonth(step4, step5 + (7 - date.getDay()));
  return date;
}

export function calculateEaster(year: number): SpecialDay {
  const date = easterAlgoritm(year);
  return { holidayDate: `${date.getMonth() + 1}/${date.getDate()}`, holidayName: 'Pasqua' };
}

export function calculateEasterMonday(year: number): SpecialDay {
  const date = easterAlgoritm(year);
  date.setDate(date.getDate() + 1);
  return { holidayDate: `${date.getMonth() + 1}/${date.getDate()}`, holidayName: 'Pasquetta' };
}
