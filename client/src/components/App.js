import React from 'react';
import {HashRouter,Route} from "react-router-dom"
import Detail from '../routes/Detail';
import Home from '../routes/Home';
function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Home}/>
      <Route path="/:id" component={Detail}/>
    </HashRouter>
  );
}

export default App;
