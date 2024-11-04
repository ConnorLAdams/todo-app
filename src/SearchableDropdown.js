import React, { useState } from 'react';
import './SearchableDropdown.css';

const SearchableDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  

  var options 
  domo.get('/data/v1/sales', {format: 'csv'}).then(function(data){
    options = data['country']
  });

  const options = [
    'Apple Banana',
    'Banana Orange',
    'Orange Mango',
    'Mango Grapes',
    'Grapes Pineapple',
    'Pineapple Strawberry',
    'Strawberry Apple',
  ];

  const unorderedMatch = (option, query) => {
    const queryWords = query.toLowerCase().split(' ').filter(Boolean);
    const optionLower = option.toLowerCase();
    return queryWords.every(word => optionLower.includes(word));
  };

  const filteredOptions = searchTerm
    ? options.filter(option => unorderedMatch(option, searchTerm))
    : options;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // const handleOptionClick = (option) => {
  //   if (selectedItems.includes(option)) {
  //     setSelectedItems(selectedItems.filter(item => item !== option));
  //   } else {
  //     setSelectedItems([...selectedItems, option]);
  //   }
  //   // setSearchTerm(''); // Clear the search input after selection
  // };
  const handleOptionClick = (option) => {
    // Toggle selection of the option
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter(item => item !== option));
    } else {
      setSelectedItems([...selectedItems, option]);
    }
  };

  const removeSelectedItem = (item) => {
    setSelectedItems(selectedItems.filter(selected => selected !== item));
  };

  const clearAllSelections = () => {
    setSelectedItems([]);
  };

  return (
    <div style={{ width: '1240px', margin: '20px auto', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          padding: '8px',
          flexWrap: 'wrap',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(true)}
      >
        {selectedItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#e0e0e0',
              padding: '4px 8px',
              borderRadius: '12px',
              marginRight: '4px',
              marginBottom: '4px',
            }}
          >
            {item}
            <span
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(item);
              }}
              style={{
                marginLeft: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#888',
              }}
            >
              &times;
            </span>
          </div>
        ))}
        <input
          type="text"
          placeholder="Select"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          style={{
            flex: '1',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '4px',
            minWidth: '50px',
          }}
        />
        <span style={{ marginLeft: 'auto', fontSize: '12px', fontFamily: 'DomoGlyphs' }}>&#xe063;</span> {/* Arrow */}
      </div>
      {isOpen && (
        <ul
          style={{
            border: '1px solid #ccc',
            maxHeight: '150px',
            overflowY: 'auto',
            marginTop: '4px',
            padding: '0',
            listStyleType: 'none',
            position: 'absolute',
            width: '100%',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          <li
            style={{
              padding: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#007bff',
              textAlign: 'center',
            }}
            onClick={clearAllSelections}
          >
            Clear All Selections
          </li>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                style={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(option)}
                  onChange={() => handleOptionClick(option)}
                  style={{ marginRight: '8px' }}
                />
                <span>{option}</span>
              </li>
            ))
          ) : (
            <li style={{ padding: '8px' }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;

