import P5Canvas from './components/elements/P5Canvas';
// import mySketch from './utils/mySketch';
import mousedrag from './utils/mousedrag';

import Dashboard from './layout/Dashboard';
import './App.css';
// import P5Canvas from './components/elements/P5Canvas';

function App() {
  return (
    <div className="App">
      <Dashboard />

      {/* <P5Canvas sketch={mousedrag}/> */}
    </div>
  );
}

export default App;
