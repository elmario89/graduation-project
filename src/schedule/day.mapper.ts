import { Day } from '../enums/day.enum';

export const dayMapper = (day: string) => {
  switch (day) {
    case '0': {
      return Day.Monday;
    }
    case '1': {
      return Day.Tuesday;
    }
    case '2': {
      return Day.Wednesday;
    }
    case '3': {
      return Day.Thursday;
    }
    case '4': {
      return Day.Friday;
    }
    case '5': {
      return Day.Saturday;
    }
    case '6': {
      return Day.Sunday;
    }
  }
};
