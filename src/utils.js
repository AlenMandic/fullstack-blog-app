/* eslint-disable no-undef */
export function showErrorNotification(message, setNotificationErrorState) {
    setNotificationErrorState(message)

    setTimeout(() => {
      setNotificationErrorState(null)
    }, 5000)
  }

  export function showSuccessNotification(message, setNotificationSuccessState) {
    setNotificationSuccessState(message)

    setTimeout(() => {
      setNotificationSuccessState(null)
    }, 5000)
  }