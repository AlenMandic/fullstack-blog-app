import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export function NotificationSuccess({ message }) {
  if (message === null) {
    return null
  }

  return (
    <Alert severity="success" sx={{ mt: '75px', backgroundColor: 'rgb(163 213 163)', color: 'black' }}>
      <AlertTitle>Success</AlertTitle>
      {message}
    </Alert>
  )
}

export function NotificationError({ message }) {
  if(message === null) {
    return null
  }

  return (
    <Alert severity="error" sx={{ mt: '75px' }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  )
}