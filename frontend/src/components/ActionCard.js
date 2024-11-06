// frontend/src/components/ActionCard.js
import React from 'react';
import { useDrag } from 'react-dnd';

const ActionCard = ({ action }) => {
  // useDrag hook'u ile sürüklenebilirlik özelliği ekliyoruz
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ACTION',
    item: action,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag} // useDrag hook'u ile drag ref'i ekliyoruz
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h6>{action.name}</h6>
      <p style={{ fontSize: '12px', marginBottom: '5px', color: '#666' }}>Tip: {action.type}</p>
      {/* Parametreler varsa bunları küçük bir liste olarak gösteriyoruz */}
      {Object.keys(action.params).length > 0 && (
        <ul style={{ paddingLeft: '20px', fontSize: '12px', color: '#333' }}>
          {Object.keys(action.params).map((key) => (
            <li key={key}>{key}: {action.params[key]}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionCard;
