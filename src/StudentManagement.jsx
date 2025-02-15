import React, { useState, useEffect } from 'react';

const API_URL = "/api/datos";


export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  // Cargar datos desde el backend al iniciar
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error("Error cargando estudiantes:", error));
  }, []);

  const addStudent = async () => {
    if (name.trim() !== '') {
      const newStudent = { contenido: name };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newStudent),
        });

        if (response.ok) {
          const addedStudent = await response.json();
          setStudents([...students, addedStudent]);
          setName('');
        }
      } catch (error) {
        console.error("Error agregando estudiante:", error);
      }
    }
  };

  const removeStudent = async (index, id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(to right, #4facfe, #00f2fe)', padding: '20px' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Gestión de Estudiantes</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="text" placeholder="Nombre del estudiante" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }} />
          <button onClick={addStudent} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer' }}>Agregar</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {students.map((student, index) => (
            <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <span style={{ fontWeight: '500', color: '#333' }}>{student.contenido}</span>
              <button onClick={() => removeStudent(index, student.id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' }}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
