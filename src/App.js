import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  
  // Set your roll number here
  const rollNumber = "21BCI0063";

  // Set the website title to your roll number
  useEffect(() => {
    document.title = rollNumber;
  }, [rollNumber]);

  // Function to validate JSON
  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      setIsValid(true);
      setError('');
      // Simulating API response
      setResponse({
        alphabets: ['A', 'B', 'C'],
        numbers: [1, 2, 3],
        highest_lowercase: 'z'
      });
    } catch (e) {
      setIsValid(false);
      setError('Invalid JSON format. Please correct and try again.');
    }
  };

  // Options for the multi-select dropdown
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest lowercase alphabet' }
  ];

  // Function to filter response based on selected options
  const getFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    selectedOptions.forEach(option => {
      filteredResponse[option.value] = response[option.value];
    });
    return filteredResponse;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JSON Validator</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter your JSON here"
        rows="10"
        style={{ width: '100%' }}
      />
      <br />
      <button onClick={validateJson}>Validate JSON</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isValid && <p style={{ color: 'green' }}>Valid JSON!</p>}

      {/* Render the multi-select dropdown if JSON is valid */}
      {isValid && (
        <div>
          <h3>Select Options:</h3>
          <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
          />
        </div>
      )}

      {/* Render filtered response based on selected options */}
      {isValid && selectedOptions.length > 0 && (
        <div>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
