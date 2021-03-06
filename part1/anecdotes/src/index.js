import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const rollAnecdote = () => {
    let rand = Math.random() * props.anecdotes.length | 0
    setSelected(rand)
  }

  const incrementVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  return (
    <div>
      <h3>Anecdote of the day</h3>
      {props.anecdotes[selected]}
      <br></br>
      <Button handleClick={rollAnecdote} text={'next anecdote'}/>
      <Button handleClick={incrementVote} text={'vote'} />
      { `${votes[selected]} votes` }
      <br></br>
      <h3>Most voted anecdote</h3>
      {/* Very slow method for getting the index of the biggest element, but it's okay in our case (small array) */}
      {anecdotes[votes.indexOf(Math.max.apply(null, votes))]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)