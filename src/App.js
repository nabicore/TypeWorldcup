import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import RoundSelect from './pages/RoundSeelct.js';
import Game from "./pages/Game";
import Result from "./pages/Result";

const App = () => {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={RoundSelect} />
            <Route path="/game" component={Game} />
            <Route path="/result" component={Result} />
        </Switch>
      </BrowserRouter>
  )
}

export default App;
