import React from 'react'
import { Alert } from 'react-bootstrap'
import { BiErrorCircle } from 'react-icons/bi'

const Message = ({ variant, color, children }) => {
  return (
    <Alert variant={variant} style={{ color: `${color}` }}>
      <span style={{ margin: '0 10px 0 0', color: `${color}` }}>
        <BiErrorCircle />
      </span>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
