import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (  
	<button onClick={props.handleClick}>
		{props.text}
	</button>
  )
const Display = (props) => (
	<tr>
		<td>{props.title}</td> 
		<td>{props.value}</td>
	</tr>
	)
const Statistics = ({good,bad,neutral}) => {
	let average = 0
	let sum = good+bad+neutral

	if (sum === 0){
		return (
		<div>
		No feedback given
		</div>
		)
	}
	average = (good-bad)/sum
	
	return (
		<div>
			<table>
				<tbody>
					<Display title="Good" value={good}/>
					<Display title="Neutral" value={neutral}/>
					<Display title="Bad" value={bad}/>
					<Display title="All" value={good+bad+neutral}/>
					<Display title="Average" value={average}/>
					<Display title="Average" value={good/sum*100 +" %"} />
				</tbody>
			</table>
		</div>
		)
		
}
	
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log=("test")
  return (
    <div>
	<h1>Give feedback</h1>
	<Button handleClick={() => setGood(good+1)} text="Good" />
	<Button handleClick={() => setNeutral(neutral+1)} text="Neutral" />
	<Button handleClick={() => setBad(bad+1)} text="Bad" />
	<h1>Statistics</h1>
	<Statistics good={good} bad={bad} neutral={neutral}/>
	
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)