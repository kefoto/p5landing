import P5Wrapper from './components/wrapper/P5Wrapper';
import mySketch from './utils/mySketch';
import mousedrag from './utils/mousedrag';
import './App.css';

function App() {
  return (
    <div className="App">
      <P5Wrapper sketch={mousedrag} />
    </div>
  );
}

export default App;
