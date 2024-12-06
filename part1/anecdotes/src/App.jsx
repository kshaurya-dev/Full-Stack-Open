import { useState } from 'react'
const Button =(props)=>{
  console.log(props);
 return(
  <button onClick={props.click}>
  {props.text}
</button>
 )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const[points , setVote]=useState(new Uint8Array(10))
  const select=()=> setSelected(Math.floor(Math.random()*anecdotes.length));
  
  const vote=(points , selected)=>{
    const copy = [...points]
    const temp=selected
    console.log(copy)
    copy[temp]+=1
    setVote(copy);
    console.log(copy);
  }
  const MAX= function (points){
    let max=0;
    for(var i=0 ;i <points.length ; ++i){
      if(points[i]>points[max]){
        max=i;
      }
    }
    return max;
  }
  return (
    <div>
      <p>{anecdotes[selected]} </p>
      <p>has {points[selected]} votes</p>
      <Button text="next anecdote" click={select}/>
      <Button text="vote" click={()=>vote(points,selected)}/>
      <h3>Anecdotes with most votes</h3>
      <p>{anecdotes[MAX(points)]}</p>
      <p>has {points[MAX(points)]} votes</p>
</div>
  )
}
/* rememeber you accidently or unknowingly wrote click={vote(points,selected)} 
and you were stuck on an infinite loop ! why ? cause you set the prop as a function call  
, it invoked it immediately ! and then again and again and again after every re-render,
but when you  pass it as a reference its executed only when button clicked or when 
onClick is invoked , so now you know why onClick have to have a reference function*/
export default App