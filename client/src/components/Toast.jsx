import { useState } from 'react'

const Toast = ({status, message}) => {
  const [visible, setVisible] = useState(true)
  
  const dismissToast = () => {
    setVisible(false)
  }

  if(!visible) return <></>

  return (
    <div className={`toast${status && ` ${status}`}`}>
      <button className='toast__dismiss' onClick={dismissToast}>&times;</button>
      <div className='toast__message'>{message}</div>
    </div>
  )
}

export default Toast
