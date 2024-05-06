import { useState, useEffect } from 'react';
import './App.css';

const TableFoot = () => {
  return (
    <tfoot>
      <tr>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Saldo:
        </td>
        <td id="saldo">€</td>
        <td></td>
      </tr>
    </tfoot>
  );
};
const TableRows = () => {
  return (
    <tr>
      <td>{type}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>Löschen/Bearbeiten</td>
    </tr>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Typ</th>
        <th>Datum</th>
        <th>Beschreibung</th>
        <th>Kategorie</th>
        <th>Betrag</th>
        <th></th>
      </tr>
    </thead>
  );
};

const Table = () => {
  return (
    <table id="table">
      <TableHeader />
      <tbody id="tableBody">
        <TableRows />
      </tbody>
      <TableFoot />
    </table>
  );
};

const SubmitButton = () => {
  return <button>Hinzufügen</button>;
};

const InputElements = () => {
  return (
    <>
      <div className="radioButtons">
        <input
          type="radio"
          id="expense"
          name="type"
          className="radio"
          value="expense"
          defaultChecked
        />
        <label htmlFor="expense">Ausgabe</label>
        <input
          type="radio"
          id="income"
          name="type"
          className="radio"
          value="income"
        />
        <label htmlFor="income">Einnahme</label>
      </div>
      <div className="formGroup">
        <input type="date" id="date" />
        <input type="text" id="description" placeholder="Beschreibung" />
        <select name="category" id="category"></select>
        <input
          type="number"
          id="amount"
          placeholder="€"
          min="0"
          step="0.05"
          required
        />
      </div>
    </>
  );
};

const Form = () => {
  return (
    <form id="form">
      <InputElements />
      <SubmitButton />
    </form>
  );
};

const Header = () => {
  return <h1 id="gridItem1">Buchhaltung</h1>;
};

const categories = [
  { _id: '657820b2ce21ffe1e6d5f47f', name: 'Wohnung' },
  { _id: '657820b2ce21ffe1e6d5f481', name: 'Haushalt' },
  { _id: '657820b2ce21ffe1e6d5f480', name: 'Freizeit' },
  { _id: '657820b2ce21ffe1e6d5f482', name: 'Sonstiges' },
];

const App = () => {
  return (
    <>
      <Header />
      <Form />
      <Table />
    </>
  );
};

export default App;
