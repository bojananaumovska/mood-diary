import { useMemo } from 'react';

const MOODS = ['😊', '😐', '😢', '😡', '😴', '😰'];

function parseStorage() {
  const raw = window.localStorage.getItem('moods') || '{}';
  try {
    const data = JSON.parse(raw);
    return Object.entries(data)
      .map(([date, entry]) => ({ date, ...entry }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    return [];
  }
}

function formatDateLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('mk-MK', {
    day: 'numeric',
    month: 'short',
  });
}

function ResultsGraph() {
  const entries = useMemo(parseStorage, []);
  const total = entries.length;

  const counts = entries.reduce(
    (acc, entry) => {
      acc.mood[entry.mood] = (acc.mood[entry.mood] || 0) + 1;
      acc.stress += Number(entry.stress || 0);
      acc.sleep += Number(entry.sleep || 0);
      if (entry.note) acc.notes += 1;
      return acc;
    },
    {
      mood: {},
      stress: 0,
      sleep: 0,
      notes: 0,
    }
  );

  const avgStress = total ? (counts.stress / total).toFixed(1) : 0;
  const avgSleep = total ? (counts.sleep / total).toFixed(1) : 0;
  const noteRate = total ? Math.round((counts.notes / total) * 100) : 0;

  const moodSlices = MOODS.map((mood, index) => {
    const count = counts.mood[mood] || 0;
    return {
      label: mood,
      value: count,
      color: ['#ff8eb3', '#ffbac7', '#ff96ba', '#ff5a7a', '#ff3f8d', '#e63e89'][index],
    };
  }).filter((slice) => slice.value > 0);

  const sleepCategories = [
    { key: 'low', label: 'Малку', color: '#ffb3d1', predicate: (s) => s <= 5 },
    { key: 'good', label: 'Доволно', color: '#ff85b3', predicate: (s) => s > 5 && s <= 8 },
    { key: 'extra', label: 'Премногу', color: '#ff5a7a', predicate: (s) => s > 8 },
  ];

  const sleepSlices = sleepCategories.map((category) => {
    const count = entries.filter((entry) => category.predicate(Number(entry.sleep))).length;
    return { ...category, value: count };
  }).filter((slice) => slice.value > 0);

  const pieTotal = (items) => items.reduce((sum, item) => sum + item.value, 0);
  const moodTotal = pieTotal(moodSlices);
  const sleepTotal = pieTotal(sleepSlices);

  const createPieSlices = (items, total) => {
    const circumference = 2 * Math.PI * 72;
    let offset = 0;
    return items.map((item) => {
      const percent = total ? item.value / total : 0;
      const length = percent * circumference;
      const slice = {
        ...item,
        percent,
        strokeLength: length,
        strokeOffset: offset,
      };
      offset += length;
      return slice;
    });
  };

  const moodChartSlices = createPieSlices(moodSlices, moodTotal);
  const sleepChartSlices = createPieSlices(sleepSlices, sleepTotal);

  const renderPie = (slices, label) => {
    const circumference = 2 * Math.PI * 72;
    return (
      <div className="PieCard">
        <div className="PieChart">
          <svg viewBox="0 0 200 200" className="PieSvg">
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="transparent"
              stroke="#fde8f2"
              strokeWidth="32"
            />
            {slices.map((slice) => (
              <circle
                key={slice.label}
                cx="100"
                cy="100"
                r="72"
                fill="transparent"
                stroke={slice.color}
                strokeWidth="32"
                strokeDasharray={`${slice.strokeLength} ${circumference}`}
                strokeDashoffset={-slice.strokeOffset}
                transform="rotate(-90 100 100)"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="PieCenter">
            <strong>{label}</strong>
            <span>{slices.length ? `${slices.reduce((acc, item) => acc + item.value, 0)} дена` : '0'}</span>
          </div>
        </div>
        <div className="PieLegend">
          {slices.length ? (
            slices.map((slice) => (
              <div key={slice.label} className="PieLegendItem">
                <span className="PieSwatch" style={{ background: slice.color }} />
                <span>{slice.label}</span>
                <strong>{Math.round(slice.percent * 100)}%</strong>
              </div>
            ))
          ) : (
            <p className="EmptyState">Нема податоци уште.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ResultsGraph">
      <div className="SummaryCards">
        <article className="SummaryCard">
          <span className="SummaryLabel">Вкупно запишани денови</span>
          <strong>{total}</strong>
        </article>
        <article className="SummaryCard">
          <span className="SummaryLabel">Просечен стрес</span>
          <strong>{avgStress}</strong>
        </article>
        <article className="SummaryCard">
          <span className="SummaryLabel">Просечно спиење</span>
          <strong>{avgSleep} h</strong>
        </article>
        <article className="SummaryCard">
          <span className="SummaryLabel">Денови со белешка</span>
          <strong>{noteRate}%</strong>
        </article>
      </div>

      <div className="GraphCard MoodGraph">
        <h2>Расположение</h2>
        {renderPie(moodChartSlices, 'Настроение')}
      </div>

      <div className="GraphCard SleepGraph">
        <h2>Распределба на спиење</h2>
        {renderPie(sleepChartSlices, 'Спиење')}
      </div>

      <div className="GraphCard NotesGraph">
        <h2>Последни белешки</h2>
        {entries.length ? (
          <div className="NoteList">
            {entries.slice(0, 5).map((entry) => (
              <article key={entry.date} className="NoteItem">
                <div className="NoteMeta">
                  <strong>{formatDateLabel(entry.date)}</strong>
                  <span>{entry.mood}</span>
                </div>
                <p>{entry.note || 'Нема белешка'}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="EmptyState">Нема зачувани белешки уште.</p>
        )}
      </div>
    </div>
  );
}

export default ResultsGraph;
