import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UsersList } from './UserList'

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading Users...</p>}>
        <UsersList/>
      </Suspense>
    </>
  )
}

export default App
