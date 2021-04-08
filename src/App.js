import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import RoundSelect from './pages/RoundSelect.js';
import Game from "./pages/Game";
import Result from "./pages/Result";

// 이런 더러운 인덴트 고쳐용~~ 죽기전에
const App = () => {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={RoundSelect} />
            {/* exact 항상 붙여용 죽이기 전에*/}
            <Route path="/game" component={Game} />
            <Route path="/result" component={Result} />
        </Switch>
      </BrowserRouter>
  )// 세미콜론 붙여용 (분노 게이지: (3/5))
}

// export default App;
export {App};
