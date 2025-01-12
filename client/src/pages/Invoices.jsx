import React, { useState, useEffect,useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

function Invoices() {
  const [panCardNumber, setPanCardNumber] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');
 const {  backendUrl ,user} = useContext(AppContext);
  const generatePdf = async () => {
    const name = user.firstName+" "+user.lastName;
    try {
      setError('');
      const response = await fetch(`${backendUrl}/api/user/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ panCardNumber , name}),
      });

      const data = await response.json();

      if (response.ok) {
        setPdfUrl(data.pdfUrl); // Store the PDF URL
      } else {
        setError(data.message || 'Failed to generate PDF');
      }
    } catch (err) {
      setError('An error occurred while generating the PDF');
      console.error(err);
    }
  };

  return (
    <div className="invoices-container">
      <h1>Generate Invoice</h1>

      {/* Input for PAN Card Number */}
      <div>
        <label htmlFor="panCardNumber">PAN Card Number:</label>
        <input
          type="text"
          id="panCardNumber"
          value={panCardNumber}
          onChange={(e) => setPanCardNumber(e.target.value)}
          placeholder="Enter PAN card number"
        />
        <button onClick={generatePdf}>Generate PDF</button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show PDF URL or Download Link */}
      {pdfUrl && (
        <div>
          <p>PDF Generated Successfully:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            View Invoice
          </a>
        </div>
      )}
    </div>
  );
}

export default Invoices;
