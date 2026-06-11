import { useState } from 'react';

const MOODS = ['😊', '😐', '😢', '😡', '😴', '😰'];

function MoodForm({ date, onSave }) {
  const [mood, setMood] = useState('');
  const [stress, setStress] = useState(1);
  const [sleep, setSleep] = useState(8);
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!mood) return alert('Избери mood!');
    
    const entry = { mood, stress, sleep, note };
    onSave(date, entry);
  };

  return (
    <div className="MoodForm">
      <h3>Како се чувствуваш?</h3>

      <div className="MoodPicker">
        {MOODS.map((m) => (
          <span
            key={m}
            onClick={() => setMood(m)}
            style={{ opacity: mood === m ? 1 : 0.4, fontSize: '32px', cursor: 'pointer' }}
          >
            {m}
          </span>
        ))}
      </div>

      <label>Стрес ниво: {stress}</label>
      <input
        type="range"
        min="1"
        max="5"
        value={stress}
        onChange={(e) => setStress(Number(e.target.value))}
      />

      <label>Часови спиење: {sleep}</label>
      <input
        type="range"
        min="1"
        max="12"
        value={sleep}
        onChange={(e) => setSleep(Number(e.target.value))}
      />

      <textarea
        placeholder="Белешка за денот..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button onClick={handleSave}>ЗАЧУВАЈ</button>
    </div>
  );
}

export default MoodForm;