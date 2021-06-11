import './App.css';
import { AdaImage } from './components/AdaImage/AdaImage';
import { RetroImage } from './components/RetroImage/RetroImage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container my-5">
        <Switch>
          <Route path="/" exact>
            <RetroImage />
          </Route>
          <Route path="/ada">
            <AdaImage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
