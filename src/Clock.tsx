import { useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3005/api/time/now')
        .then(res => res.json())
        .then(data => setTime(data.time))
        .catch(err => console.error('Lỗi lấy thời gian:', err));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: 28, fontFamily: 'monospace', textAlign: 'center' }}>
      📅 {time}
    </div>
  );
}

export default Clock;
