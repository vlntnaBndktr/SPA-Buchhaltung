import React from 'react';
import { useState, useEffect } from 'react';
import '../src/App.css';

const Form = ({ categories }) => {
  // categories als PROP aus der App übergeben

  // DATEN ZUSAMMENSTELLEN
  // State für die Radiobuttons
  const [selectedType, setSelectedType] = useState('expense');
  // Zustand für formData;  bei jedem Tastendruck in einem input-Feld
  // wird das formData-Objekt mit dem neuen Wert aktualisiert.
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: 0,
  });

  const handleInputChange = (event) => {
    // event-Objekt beinhaltet 'target', das das Input Element
    // mit allen Attributen enthält(id, value, type...)
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    //...formData kopiert alle bestehenden Eigenschaften von formData
    // '[id]: value' =  "computed property name", value wird dynamisch je nach key generiert
  };

  // nur für die Radiobuttons: type wird verändert
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log('Radiobutton event.target', event.target);
  };

  // DATEN SENDEN
  // Handler verwendet jetzt den aktuellen Zustand (formData und selectedType)

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Objekt zusammenstellen:
    const entryData = {
      type: selectedType,
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: formData.amount,
    };

    try {
      const response = await fetch('http://localhost:8001/api/entry/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        //TODO: Table aktualisieren
        console.log('Eintrag erfolgreich hinzugefügt');
      } else {
        console.error('Fehler beim Hinzufügen des Eintrags');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Eintrags:', error);
    }
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <div className="radioButtons">
          <input
            type="radio"
            id="expense"
            name="type"
            className="radio"
            value="expense"
            checked={selectedType === 'expense'}
            onChange={handleTypeChange}
          />
          <label htmlFor="expense">Ausgabe</label>
          <input
            type="radio"
            id="income"
            name="type"
            className="radio"
            value="income"
            checked={selectedType === 'income'}
            onChange={handleTypeChange}
          />
          <label htmlFor="income">Einnahme</label>
        </div>
        <div className="formGroup">
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="description"
            placeholder="Beschreibung"
            // Inhalt des Texteingabefelds immer mit dem Wert von formData.description synchronisiert
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Kategorie auswählen
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="amount"
            placeholder="€"
            min="0"
            step="0.05"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Hinzufügen</button>
      </form>
    </>
  );
};

export default Form;
