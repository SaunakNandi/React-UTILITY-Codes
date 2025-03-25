import { useState } from 'react'
import { Box, Container, CssBaseline, Paper } from '@mui/material'
import LinearStepper from './LinearStepper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline/>
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinearStepper/>
        </Paper>
      </Container>
    </>
  )
}

export default App
