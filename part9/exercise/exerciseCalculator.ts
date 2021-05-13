interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>) => {
  if (args.length > 4) {
    let days: Array<number> = [];
    let target: number;

    for (let i = 2; i < args.length; i++) {
      if (!isNaN(Number(args[i]))) {
        days = [...days, Number(args[i])];
      } else {
        throw new Error("please give days as numbers");
      }
    }

    if (!isNaN(Number(args[2]))) {
      target = Number(args[2]);
    } else {
      throw new Error("please give target (first input) as a number");
    }

    return { target, days };
  } else {
    throw Error("not enough args");
  }
};

const calculateExercise = (target: number, days: Array<number>): Result => {
  console.log(target, days);

  let trainingDays = 0;
  let sum = 0;
  let success = false;
  let rating = 1;
  let ratingDescription = "";
  let periodLength = days.length;
  for (let i = 0; i < days.length; i++) {
    if (days[i] > 0) {
      trainingDays++;
      sum += days[i];
    }
  }
  let average = sum / periodLength;
  if (average > target) {
    success = true;
    rating = 3;
    ratingDescription = "you did more than your target";
  } else if (average === target) {
    success = true;
    rating = 2;
    ratingDescription = "you made your target";
  } else if (average < target) {
    success = false;
    rating = 1;
    ratingDescription = "you didnt make your target";
  }
  return {
    periodLength,
    average,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
  };
};
try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercise(target, days));
} catch (e) {
  console.log("error: ", e.message);
}

