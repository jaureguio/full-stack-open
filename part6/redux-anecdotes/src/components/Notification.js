import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const displayNotification = () => (
    <div style={style}>
      {notification}
    </div> 
  )
  return notification ? displayNotification() : null 
}

const mapStateToProps = (state) => {
  const { notification } = state
  return { notification }
}

export default connect(mapStateToProps)(Notification)