import React, { useState, useEffect } from 'react';
import './App.css';
import { get } from './mockBackend/fetch';

export default function Counter() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    alert(`Count: ${count}`);
  });

  const handleClick = () => {
    setCount((prevCount) =>  prevCount + 1);
  };

  // ------------------------------

  const [clickCount, setClickCount] = useState(0);

  const increment = () => setClickCount((prev) => prev + 1);

  useEffect(() => {
    document.addEventListener('mousedown', increment);
    return () => {
      document.removeEventListener('mousedown', increment);
    };
  });

  // ------------------------------

  const [data, setData] = useState();
  const [notes, setNotes] = useState({});
  const [forecastType, setForecastType] = useState('/daily');

  useEffect(() => {
    alert('Requested data from server...');
    get(forecastType).then((response) => {
      alert('Response: ' + JSON.stringify(response,'',2));
      setData(response.data);
    });
  }, [forecastType]);

  const handleChange = (index) => ({ target }) =>
    setNotes((prev) => ({
      ...prev,
      [index]: target.value
    }));

      if (!data) {
        return <p>Loading...</p>;
    }

  // ------------------------------



  return (
    <div>
    <h1><a href="https://docs.google.com/document/d/1F_O-7XUpJXWJo-hdTz9OEjDnQpjgsVln2dasDFWkm1Q/edit?usp=sharing" target="_blank">The Effect Hook</a></h1>
      <h2>Why Use useEffect?</h2>

      <h2>Why after each render?</h2>

      <h2>Function Component Effects</h2>
      <div className="App-header">    
        <p>You clicked {count} times (it counts when you press enter).</p>
        <button onClick={handleClick}>
          Click me
        </button>
      </div>

      <h2>Clean Up Effects</h2>
      <div className="App-header">
        <h1>Document Clicks: {clickCount}</h1>
      </div>

      <h2>Fetch Data</h2>
      <div className="App-header">
        <div className='App'>
          <h1>My Weather Planner</h1>
          <div>
            <button onClick={() => setForecastType('/daily')}>5-day</button>
            <button onClick={() => setForecastType('/hourly')}>Today</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Summary</th>
                <th>Avg Temp</th>
                <th>Precip</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.summary}</td>
                  <td> {item.temp.avg}°F</td>
                  <td>{item.precip}%</td>
                  <td>
                    <input
                      value={notes[item.id] || ''}
                      onChange={handleChange(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2>Rules of Hooks</h2>
      <div className="App-header">
      </div>

      <h2>Separate Hooks for Separate Effects</h2>
      <div className="App-header">
      </div>
    </div>
  );
}
