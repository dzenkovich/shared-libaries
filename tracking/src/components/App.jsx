import React from 'react'
import ReactDOM from 'react-dom'
import { Button, List, ListItem, Paper, Typography } from '@material-ui/core'

const App = ({}) => {
  return (
    <Paper elevation={2}>
      <Typography>Activity</Typography>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
      <Button variant="outlined" color="secondary">Ok</Button>
    </Paper>
  )
}

export default App

// ReactDOM.render(
//   <App/>,
//   document.getElementById('tracking-micro-ui'),
// )
