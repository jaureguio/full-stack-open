import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator, ICalculatorParams } from "./exerciseCalculator";
import { validNumber, validNumberList } from "./utils/typeValidators";

const PORT = 3002;
const app = express();

app.use(express.json());

app
  .route('/hello')
  .get((_req, res) => {
    res
      .status(200)
      .send("<h1>Hello</h1>");
  });

app
  .route('/bmi')
  .get((req, res) => {
    const inputs = req.query;
    if(!(inputs.weight && inputs.height)) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      const height = Number(inputs.height);
      const weight = Number(inputs.weight);
      const bmi = bmiCalculator({ height, weight });
      
      res.json({ weight, height, bmi });
    }
  });

app
  .route('/webexercises')
  .post((req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if(!(daily_exercises && target)) {
      return res.status(400).json({
        error: 'parameters missing'
      });
    }

    try {
      const calcInputs: ICalculatorParams = {
        hoursByDay: validNumberList(daily_exercises),
        target: validNumber(target)
      };
  
      const results = exerciseCalculator(calcInputs);
      return res.status(200).json(results);
    } catch (error) {
      // console.log(error);
      return res.status(400).json({
        error: 'malformatted parameters'
      });
    }
  });

app.listen(PORT, () => {
  console.log(`App is listening in port: ${PORT}`);
});
