import { useState } from 'react';
import MoodForm from './MoodForm';

const DAYS = ['Нед', 'Пон', 'Вто', 'Сред', 'Чет', 'Пет', 'Саб'];
const MONTHS = ['Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];

function MoodCalendar() {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState(null);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const isSelected = (day) => {
    if (!selected || day === null) return false;
    return (
      selected.getFullYear() === year &&
      selected.getMonth() === month &&
      selected.getDate() === day
    );
  };

  const buildDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i += 1) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i += 1) {
      days.push(i);
    }
    return days;
  };

  const formatSelectedDate = () => {
    if (!selected) return '';
    const dayName = DAYS[selected.getDay()];
    const monthName = MONTHS[selected.getMonth()];
    return `${dayName}, ${selected.getDate()} ${monthName} ${selected.getFullYear()}`;
  };

  const handleSave = (date, entry) => {
    const key = date.toISOString().split('T')[0]; // пр. "2026-06-11"
    const allMoods = JSON.parse(localStorage.getItem('moods') || '{}');
    allMoods[key] = entry;
    localStorage.setItem('moods', JSON.stringify(allMoods));
    alert('Зачувано! ✅');
  };

  return (
  <div className="CalendarLayout">
    <section className="Calendar">
      <div className="CalendarHeader">
        <button type="button" onClick={prevMonth}>◀</button>
        <div>
          <h3>{MONTHS[month]}</h3>
          <span>{year}</span>
        </div>
        <button type="button" onClick={nextMonth}>▶</button>
      </div>

      <div className="CalendarGrid">
        {DAYS.map((day) => (
          <div key={day} className="DayName">{day}</div>
        ))}
        {buildDays().map((day, index) => (
          <button
            key={index}
            type="button"
            className={`Day ${day === null ? 'empty' : ''} ${isSelected(day) ? 'selected' : ''}`}
            onClick={() => day !== null && setSelected(new Date(year, month, day))}
            disabled={day === null}
          >
            {day || ''}
          </button>
        ))}
      </div>
    </section>

    <div className="FormPanel">
      {selected ? (
        <>
          <p className="SelectedDate"> {formatSelectedDate()}</p>
          <MoodForm date={selected} onSave={handleSave} />
        </>
      ) : (
        <p className="NoSelection">👈 Кликни на датум за да внесеш mood</p>
      )}
    </div>
  </div>
);
}

export default MoodCalendar;
