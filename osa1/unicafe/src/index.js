import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, bad, neutral}) => {
    if(good+bad+neutral===0){
        return(
            <div>
                No feedback given
            </div>
        )
    }
    return (
    <div>
        <table>
            <tbody>
            <tr>
                <td><Statistic text="good" /></td>
                <td><Statistic  value ={good}/></td>
            </tr>
            <tr>
                <td><Statistic text="neutral" /></td>
                <td><Statistic  value ={bad}/></td>
            </tr>
            <tr>
                <td><Statistic text="bad" /></td>
                <td><Statistic  value ={bad}/></td>
            </tr>
            <tr>
                <td><Statistic text="all" /></td>
                <td><Statistic  value ={good+neutral+bad}/></td>
            </tr>
            <tr>
                <td><Statistic text="average" /></td>
                <td><Statistic  value ={(good-bad)/(good+neutral+bad)}/></td>
            </tr>
            <tr>
                <td><Statistic text="positive" /></td>
                <td><Statistic  value ={(good*100)/(good+neutral+bad)}/></td>
            </tr>
            </tbody>
        </table>
        
        
    </div>
    )
}
const Statistic = ({text,value}) => {
    return (
        <div>{text} {value}</div>
    )
}
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    return (
      <div>         
        <h1>give feedback</h1> 
        <Button 
            handleClick={() => setGood(good + 1)}
            text='good'
        />      
        <Button 
            handleClick={() => setNeutral(neutral + 1)}
            text='neutral'
        /> 
        <Button 
            handleClick={() => setBad(bad + 1)}
            text='bad'
        /> 
    
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
             
    </div>
    )
}
  
ReactDOM.render(<App />, 
  document.getElementById('root')
)



