import { useState, useEffect } from 'react';
import '../src/App.css';
import Filter from './Filter';

const Table = ({ categories }) => {
  // categories als PROP aus der App übergeben
  const [entries, setEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Neuer Zustand für die ausgewählte Kategorie
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const filterEntries = () => {
      if (selectedCategory === '') {
        setFilteredEntries(entries);
      } else {
        const filtered = entries.filter(
          (entry) => entry.category === selectedCategory
        );
        setFilteredEntries(filtered);
      }
    };

    filterEntries();
  }, [selectedCategory, entries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/entries');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Fehler beim Laden der Einträge:', error);
      }
    };
    fetchData();
  }, [selectedCategory, entries]); //soll auch abgerufen werden wenn sich an den entries was ändert!

  return (
    <table id="table">
      <thead>
        <tr>
          <th>Typ</th>
          <th>Datum</th>
          <th>Beschreibung</th>
          <th>
            <Filter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </th>
          <th>Betrag</th>
          <th></th>
        </tr>
      </thead>

      <tbody id="tableBody">
        {filteredEntries.map((entry) => (
          <tr key={entry._id}>
            <td>{entry.type}</td>
            <td>{entry.date}</td>
            <td>{entry.description}</td>
            <td>{entry.category}</td>
            <td>{entry.amount}</td>
            <td>{/* Weitere Spalten, falls vorhanden */}</td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="4" style={{ textAlign: 'right' }}>
            Saldo:
          </td>
          <td id="saldo">€</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
