/* eslint-disable react/prop-types */
import React from 'react'

const PersonForm = (props) => (
  <form onSubmit={props.addFunc}>
    <div>Name: <input
      value={props.nameContent}
      onChange={props.nameFunc}
    /></div>
    <div>Number: <input
      value={props.numberContent}
      onChange={props.numberFunc}
    /></div>
    <button type="submit">add</button>
  </form>
)

export default PersonForm