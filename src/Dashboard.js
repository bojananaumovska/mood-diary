import ResultsGraph from './ResultsGraph';

function Dashboard() {
  return (
    <div className="Dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="DashboardHeader">
        <div style={{ textAlign: 'center' }}>
          <h1>Dashboard</h1>
          <p>Преглед на сите собрани резултати.</p>
        </div>
      </div>
      <ResultsGraph />
    </div>
  );
}

export default Dashboard;