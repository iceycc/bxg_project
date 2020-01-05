import React from 'react'

const Counter = ({ value, handleIncrement, handleDecrement }) => {
  return (
    <div>
      <h1>Counter Component</h1>
      <h2>{value}</h2>
      <button onClick={handleIncrement}>点击+1</button>
      <button onClick={handleDecrement}>点击-1</button>
    </div>
  )
}

export default Counter
