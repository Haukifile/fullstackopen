/* eslint-disable react/prop-types */
import React from 'react'

const Message = ({ message, msgClass }) => {

  if (message === null) {
    return null
  }

  return (
    <div className={msgClass}>
      {message}
    </div>
  )
}
export default Message