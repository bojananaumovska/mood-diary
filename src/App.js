import { useState } from 'react';
import './App.css';
import Header from './Header';
import MoodCalendar from './MoodCalendar';
import Dashboard from './Dashboard';
import Positivity from './Positivity';

function App() {
  const [page, setPage] = useState('calendar');

  return (
    <div className="App">
      <Header />
      <div className="PageNav">
        <button
          className={page === 'calendar' ? 'active' : ''}
          type="button"
          onClick={() => setPage('calendar')}
        >
          Calendar
        </button>
        <button
          className={page === 'dashboard' ? 'active' : ''}
          type="button"
          onClick={() => setPage('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={page === 'positivity' ? 'active' : ''}
          type="button"
          onClick={() => setPage('positivity')}
        >
          Positivity
        </button>
      </div>
      <div className="MainLayout">
        {page === 'calendar' && <MoodCalendar />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'positivity' && <Positivity />}
      </div>
    </div>
  );
      <p2>вфнв</p2>
}


export default App;
