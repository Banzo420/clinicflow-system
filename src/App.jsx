import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

import Login from './Login'
import CheckIn from './CheckIn'
import FrontDesk from './FrontDesk'
import WaitingRoom from './WaitingRoom'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/check-in" />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/display" element={<WaitingRoom />} />

        {/* Staff-only route */}
        <Route
          path="/front-desk"
          element={
            user ? (
              <FrontDesk />
            ) : (
              <Login onLogin={(user) => setUser(user)} />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App

