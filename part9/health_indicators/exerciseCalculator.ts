export interface ICalculatorParams {
  hoursByDay: Array<number>;
  target: number
}

export interface ICalculator {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean; 
  rating: number;
  ratingDescription: string;
}

const inputs = process.argv.slice(2);

if(require.main === module) {

  if(inputs.length < 2) {
    console.log('Please check your inputs: an average workout hours target and daily workout hours are expected');
    process.exit();
  }
  const [ target, ...hoursByDay ] = inputs.map(Number);
  
  console.log(exerciseCalculator({ hoursByDay, target }));
}

export function exerciseCalculator({
  hoursByDay = [],
  target 
}: ICalculatorParams): ICalculator {

  const dailyHoursTotal = hoursByDay
    .reduce(( total, dayHours ) => total += dayHours, 0);
    
  const dailyHoursAvg = Math.round(100*dailyHoursTotal/hoursByDay.length)/100;
  const currentRating = 1 + Math.min(Math.round(dailyHoursAvg/target),2);

  const ratings: { [R: number]: string } = {
    1: 'You can do it way better, try harder',
    2: 'Ok, not bad at all. I\'m sure you can improve those numbers',
    3: 'You\'ve reached your goal, congrats!, this is the perfect moment to set new challenges'
  };

  return {
    periodLength: hoursByDay.length,
    trainingDays: hoursByDay.filter(Boolean).length,
    success: dailyHoursAvg >= target,
    rating: currentRating,
    ratingDescription: ratings[currentRating],
    target,
    average: dailyHoursAvg,
  };
}