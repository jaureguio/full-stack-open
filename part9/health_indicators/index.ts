import express from 'express'
import bmiCalculator from './bmiCalculator'
const app = express()

const PORT: number = 3002

app
  .route('/hello')
  .get((_req, res) => {
    res
      .status(200)
      .send("<h1>Hello</h1>")
  })

app
  .route('/bmi')
  .get((req, res) => {
    let inputs = req.query
    if(!(inputs.weight && inputs.height)) {
      res.status(400).json({ error: "malformatted parameters" })
    } else {
      const height: number = Number(inputs.height)
      const weight: number = Number(inputs.weight)
      const bmi = bmiCalculator(height, weight)
      
      res.json({ weight, height, bmi })
    }
  })

app.listen(PORT, () => {
  console.log(`App is listening in port: ${PORT}`)
})
