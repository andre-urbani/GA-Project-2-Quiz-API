import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import Home from './components/Home'
import Quiz from './components/Quiz'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/quiz" component={Quiz}/>
    </Switch>
  </BrowserRouter>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)