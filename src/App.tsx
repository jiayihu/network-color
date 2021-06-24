import './App.css';
import { AdaImage } from './components/AdaImage/AdaImage';
import { QRImage } from './components/QRImage/QRImage';
import { PikaImage } from './components/PikaImage/PikaImage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container my-5">
        <Switch>
          <Route path="/" exact>
            <PikaImage />
          </Route>
          <Route path="/qr" exact>
            <QRImage />
          </Route>
          <Route path="/:group">
            <AdaImage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
