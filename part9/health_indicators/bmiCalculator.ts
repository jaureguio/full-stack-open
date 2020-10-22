const bmiInputs = process.argv.slice(2) // @ts-ignore

if(bmiInputs.length < 2) {
  console.log('Please check your inputs: weight (kg) and height (cm) values are expected')
  process.exit()
}

const [ height, weight ] = bmiInputs.map(Number)

console.log(calculateBmi(height,weight))

function calculateBmi(height: number, weight: number): string  {
  if(weight <= 0 || height <= 0) return 'Check your inputs, greater-than zero arguments expected'

  const bmi: number = Math.round(100*weight/Math.pow(height/100,2))/100
  console.log(bmi)
  
  let msg = ''
  if (bmi < 15) {
    msg = 'Very severily underweight'
  } else if(15 < bmi && bmi < 16) {
    msg = 'Severaly underwight'
  } else if(16 < bmi && bmi < 18.5) {
    msg = 'Underweight'
  } else if(18.5 < bmi && bmi < 25) {
    msg = 'Normal (healthy weight)'
  } else if(25 < bmi && bmi < 30) {
    msg = 'Overweight'
  } else if(30 < bmi && bmi < 35) {
    msg = 'Obese Class I (Moderately obese)'
  } else if(35 < bmi && bmi < 40) {
    msg = 'Obese Class II (Severely obese)'
  } else if(bmi >= 40) {
    msg = 'Obese Class III (Very severely obese)'
  }
  return msg
}
