import React from 'react'; // React
import ReactDOM from 'react-dom/client'; // react library um mit dem web-browser zu sprechen
import App from './App.jsx'; // erzeugte Komponente
import './index.css'; // Styles

// alle Teile zusammenfügen und in die index.html integrieren:
// render: Erzeugung und Anzeige von Benutzeroberflächen
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
