import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => { 
	return(
	<button onClick={props.handleClick}>
		{props.text}
	</button>
  )
}

const Display = (props) => {

	return (
	<p>
		{props.selected}
	</p>
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

const initArray = new Array(anecdotes.length).fill(0)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initArray)
	
  const indexOfMax =(arr) => {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }

  const vote = (props) => {
	  const copy = [...points]
	  copy[props] += 1
	  return (
	  copy
	  )
  }
  
  console.log(indexOfMax(points))	 
  console.log(...points)
  console.log("selected anecdote no.", selected)
  
  return (
    <div>

	<Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text="Random anecdote" />
	<Button handleClick={() => setPoints(vote(selected))} text="Vote" />
	<h1>Random anecdote</h1>
    <Display selected={props.anecdotes[selected]}/>
	<h1>Most voted anecdote</h1>
    <Display selected={props.anecdotes[indexOfMax(points)]}/>
	<p>Votes: {points[indexOfMax(points)]}</p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)