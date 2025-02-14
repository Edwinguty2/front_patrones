import React, { useState } from 'react';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  const addStudent = () => {
    if (name.trim() !== '') {
      setStudents([...students, name]);
      setName('');
    }
  };

  const removeStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>Gestión de Estudiantes</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Nombre del estudiante"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={addStudent}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Agregar
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {students.map((student, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              background: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontWeight: '500', color: '#333' }}>{student}</span>
              <button
                onClick={() => removeStudent(index)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
