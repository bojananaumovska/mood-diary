import { useState } from 'react';
import './App.css';

const avatars = ['🌸', '🦋', '🌙', '⭐', '🌈', '🐱', '🐶', '🦊', '🐸', '🌺', '🍀', '🎮', '🎨', '🎵', '🏄'];

function Header() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(
    localStorage.getItem('name') || 'Name Surname'
  );
  const [avatar, setAvatar] = useState(
    localStorage.getItem('avatar') || '🌸'
  );

  const handleSave = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('avatar', avatar);
    setIsEditing(false);
  };

  return (
    <div className="Header">
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSave}>SAVE</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {avatars.map((a) => (
              <span
                key={a}
                onClick={() => setAvatar(a)}
                style={{
                  fontSize: '24px',
                  cursor: 'pointer',
                  opacity: avatar === a ? 1 : 0.4
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
<div>
  <h2>{avatar} {name}</h2>
  <span style={{ fontSize: '16px', color: '#b02f60', opacity: 0.7 }}>Бојана Наумовска, 232003 - ПНУВ проект</span>
</div>
<button onClick={() => setIsEditing(true)}>EDIT</button>
        </div>
      )}
    </div>
  );
}

export default Header;