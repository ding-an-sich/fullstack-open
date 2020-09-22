import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h3>Statistics</h3>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
  )
  
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const inscreaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h3>Give feedback</h3>
      <Button handleClick={increaseGood} text={'good'}/>
      <Button handleClick={increaseNeutral} text={'neutral'}/>
      <Button handleClick={inscreaseBad} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)