const calculateBmi = (height: number, weight: number) => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    var bmi =
      Math.round(Math.round((weight / Math.pow(height, 2)) * 10000) * 100) /
      100;
    let value = "";
    if (bmi < 18.5) value = "underweight";
    else if (bmi >= 18.5 && bmi <= 25) value = "normal (healthy weight)";
    else if (bmi >= 25 && bmi <= 30) value = "obese";
    else if (bmi > 30) value = "overweight";
    return value;
  } else {
    throw new Error("those werent numbers dude");
  }
};

try {
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
} catch (e) {
  console.log("error: ", e.message);
}
