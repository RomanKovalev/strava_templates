const triviaData = [
  { label: 'First ride', value: '27-03-2023', description: 'Morning Ride' },
  { label: 'Earliest start time', value: '00:23', description: 'Night Ride' },
  { label: 'Latest start time', value: '23:34', description: 'Night Ride' },
  { label: 'Longest ride', value: '174km', description: 'The PRL Full in London' },
  { label: 'Highest elevation', value: '2 622m', description: 'The PRL Full in London' },
  { label: 'Fastest ride', value: '44.2km/h', description: 'Race: EVO CC Sprint Race Series' },
  { label: 'Most kudos', value: '45', description: 'Group Ride: Stage 3 | Ride London' },
  { label: 'Total kudos', value: '3089', description: '' },
  { label: 'Most consecutive days', value: '19', description: '24-12-2023 - 11-01-2024' },
];

const Trivia = () => {
  return (
    <div>
      <h3>Trivia</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {triviaData.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: 'calc(33% - 20px)',
              textAlign: 'center',
            }}
          >
            <h4>{item.label}</h4>
            <p style={{ fontSize: '1.5em', margin: '10px 0' }}>{item.value}</p>
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
