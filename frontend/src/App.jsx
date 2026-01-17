import Shortener from './components/Shortener';
import './index.css';

function App() {
  return (
    <div className="container">
      <Shortener />
      <footer className="developer-credit">
        Developed by{' '}
        <a
          href="https://shubhamkumarjha.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shubham Jha
        </a>
      </footer>
    </div>
  );
}

export default App;
