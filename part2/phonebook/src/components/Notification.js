import React from 'react'
import './Notification.css'

const Notification = ({ message }) => {
    if (message.type) {
        return (
            <div className={ message.type }>
                { message.text }
            </div>
        )
    }
    return null
}

export default Notification