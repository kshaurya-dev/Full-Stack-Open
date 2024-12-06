import { useState } from 'react'

const Display=({text,number})=><div>{text} {number}</div>
const Button=(props)=>{
  return(
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}
const StatisticLine=(props)=>{
  return(
    <tr>
  <td>{props.text}</td>
  <td> {props.value}</td>
  </tr>
  )
}
const Statistics = ({total , good , neutral , bad}) => {
  if (total!=0){
    return(
    <table>
      <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all "value={bad+good+neutral}/>
    <StatisticLine text="average " value={(good-bad)/total}/>
    <StatisticLine text="positive " value={`${(good/(total)*100)}%`}/>
     </tbody>
    </table>
    )
  }
  else{
    return(
      <table>
        <tbody>
          <tr>
            <td>No feedback given</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const smashGood=()=>setGood(good+1);
  const smashNeutral=()=>setNeutral(neutral+1);
  const smashBad=()=>setBad(bad+1);
  return (
    <div>
        <h1>give feedback</h1>
        <Button text="good" click={smashGood}/>
        <Button text="neutral" click={smashNeutral}/>
        <Button text="bad" click={smashBad}/>
        <h3>statistics</h3>
        <Statistics total={good+bad+neutral} good={good} neutral={neutral} bad={bad}/>
    </div>
      
  )
}

export default App

