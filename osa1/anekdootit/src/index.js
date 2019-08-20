import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const CountResults=({selectedAndVotes, anecdotes})=>{
  let mostVoted=0
  let highestNumber=0
  let current=0
  if(selectedAndVotes.votes){
    for(let i=0;i<6;i++){
      current=selectedAndVotes.votes[i]
      if(current>highestNumber){
        mostVoted=i
        highestNumber=selectedAndVotes.votes[i]
      }
    }
    if(highestNumber>0){
      return(
      <div>
        <h1>
          Anecdote with most votes
        </h1>
        <p> {anecdotes[mostVoted]}</p>
        <p>
          has {highestNumber} votes
        </p>
      </div>
      )
    }
  }
  return(
    <div></div>
  )

}
const App = (props) => {
  const [selectedAndVotes, setSelected] = useState({selected:0, votes:Array(6).fill(0)})

  const handleClick = () => {
    setSelected({ ...selectedAndVotes, selected:Math.floor(Math.random() * 6)}) 
  }

  const handleVoteClick = () => {
    let newVotes=selectedAndVotes.votes
    newVotes[selectedAndVotes.selected]+=1
    setSelected({ ...selectedAndVotes, newVotes})
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selectedAndVotes.selected]}</p>
        <p>has {selectedAndVotes.votes[selectedAndVotes.selected]} votes</p>
      <button onClick={handleVoteClick}>
        vote
      </button>
      <button onClick={handleClick}>
        next anecdote
      </button>
      <p></p>
      <CountResults selectedAndVotes={selectedAndVotes} anecdotes={anecdotes} />
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
