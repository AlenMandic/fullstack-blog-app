// automatic logout after 1 hour of inactivity, or minimizing the browser/switching tabs.

let logoutTimer
const timeout = 3600000 //1 hour

const setUpLogOutListeners = (handleLogoutFunction) => {

    const startLogoutTimer = () => {

        logoutTimer = setTimeout(() => {

           handleLogoutFunction()

        }, timeout)
    }

    const resetLogoutTimer = () => {

        clearTimeout(logoutTimer)
        startLogoutTimer(handleLogoutFunction)

    }

// if user is active on the page/tab, reset the logout timer
document.addEventListener('mousemove', resetLogoutTimer)
document.addEventListener('keypress', resetLogoutTimer)

  startLogoutTimer() // starts the initial default 1 hour countdown check.

  // returning a cleanup function for our useEffect in App.jsx where this will run.
  return () => {
    document.removeEventListener('mousemove', resetLogoutTimer)
    document.removeEventListener('keypress', resetLogoutTimer)
  }

}

export default setUpLogOutListeners
