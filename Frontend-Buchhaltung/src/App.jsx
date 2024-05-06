import { useState, useEffect } from 'react';

import './App.css';

import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

const App = () => {
  // State für die Kategorien in die übergeordnete App auslagern:
  const [categories, setCategories] = useState([]);

  // Effekt-Hook, um Kategorien von der API zu laden
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/categories');
        //Daten aus dem ReadableStream des Body umwandeln:
        const data = await response.json();

        // data als neuen Wert der Funktionsvariable categories setzen
        setCategories(data); // löst re-rendering aus, mit den neuen Daten
        // console.log('data für Categories:', data);
      } catch (error) {
        console.error('Fehler beim Laden der Kategorien:', error);
      }
    };

    fetchData();
  }, []); // Das leere Array sorgt dafür, dass dieser Effekt nur einmal beim Mounten der Komponente ausgeführt wird

  return (
    <>
      <Header />
      <Form categories={categories} />
      <Table categories={categories} />
    </>
  );
};

export default App;
