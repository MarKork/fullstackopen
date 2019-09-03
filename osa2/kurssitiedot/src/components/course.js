import React from 'react'

const Course = ({name, parts}) => {
    console.log(name)
    console.log(parts)
    return(
    <div>
        <Header name={name} />
        <Content parts={parts}  />
        <Total parts={parts} />  
    </div>
    )
}
const Header = ({name}) => {
    return (
      <div>
          <h2>{name}</h2>        
      </div>
    )
}
const Content = ({parts}) => {
    return (        
        parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)
    )
}
const Total = ({parts}) => {
    const allExercises=parts.map(part => part.exercises)
    const sum=allExercises.reduce((total,amount) => total + amount)
    return (
      <div>
          <h3>total of {sum} exercises</h3>      
      </div>
    )
}
const Part = (props) => {
    return (
      <div>
          <p> {props.name} {props.exercises}</p>      
      </div>
    )
}

export default Course