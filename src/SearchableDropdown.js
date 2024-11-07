import React, { useState } from 'react';
import './SearchableDropdown.css';
import domo from 'ryuu.js';

const SearchableDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  

  // var options2 
  // domo.get('/data/v1/bef23c34-93d2-4006-8e18-581f37da405e', {format: 'csv'}).then(function(data){
  //   options2 = data['country']
  // });

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

  const displayedOptions = showSelected ? selectedItems : filteredOptions;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
      if (!isOpen) {
          setSearchTerm('');
          setShowSelected(false);
          setTempSelectedItems(selectedItems);
      }
  };

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
    if (tempSelectedItems.includes(option)) {
      setTempSelectedItems(tempSelectedItems.filter(item => item !== option));
    } else {
      setTempSelectedItems([...tempSelectedItems, option]);
    }
  };

  // const removeSelectedItem = (item) => {
  //   setSelectedItems(selectedItems.filter(selected => selected !== item));
  // };

  const clearAllSelections = () => {
    setTempSelectedItems([]);
  };

  const selectAllFiltered = () => {
    const allSelected = filteredOptions.every(option =>
      tempSelectedItems.includes(option)
    );
    if (allSelected) {
      // Unselect all filtered options
      setTempSelectedItems(tempSelectedItems.filter(item => !filteredOptions.includes(item)));
    } else {
      // Select all filtered options
      setTempSelectedItems([
        ...tempSelectedItems,
        ...filteredOptions.filter(option => !tempSelectedItems.includes(option)),
      ]);
    }
  };

  const clearAllFiltered = () => {
    setTempSelectedItems(tempSelectedItems.filter(item => !filteredOptions.includes(item)));
  };

  const handleCancel = () => {
      setIsOpen(false);
      setTempSelectedItems(selectedItems);
  };

  const handleApply = () => {
      setSelectedItems(tempSelectedItems);
      setIsOpen(false);
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
        onClick={toggleDropdown}
      >
        {selectedItems.length === 0 ? (
            <span style={{ color: '#888' }}>Select</span>
        ) : (
          selectedItems.map((item, index) => (
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
            </div>
          ))
        )}
        <span style={{ marginLeft: 'auto', fontSize: '20px', color: '#888', fontWeight: 'bold', fontFamily: 'DomoGlyphs' }}>&#xe063;</span> {/* Arrow */}
      </div>
      {isOpen && (
        <div
          style={{
            border: '1px solid #ccc',
            position: 'absolute',
            width: '99.8%',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          {/* Fixed Search Bar */}
          <div style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '98%',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          {/* Select All Filtered Option */}
          <div
            style={{
              padding: '4px',
              cursor: 'pointer',
              fontWeight: '400',
              fontSize: '12px',
              // color: '#007bff',
              color: '#888',
              textAlign: 'left',
              // borderBottom: '1px solid #ddd',
            }}
            onClick={selectAllFiltered}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';
              // e.target.style.boderColor = '#bbb';
            }}
            onMouseLeave={(e) => {
             e.target.style.backgroundColor = '#fff';
             // e.target.style.borderColor = 'transparent';
            }}
          >
            Select Filtered Options
          </div>
          {/* Clear All Filtered Option */}
          <div
            style={{
              padding: '4px',
              cursor: 'pointer',
              fontWeight: '400',
              fontSize: '12px',
              // color: '#007bff',
              color: '#888',
              textAlign: 'left',
              // borderBottom: '1px solid #ddd',
            }}
            onClick={clearAllFiltered}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';
              // e.target.style.boderColor = '#bbb';
            }}
            onMouseLeave={(e) => {
             e.target.style.backgroundColor = '#fff';
             // e.target.style.borderColor = 'transparent';
            }}
          >
            Clear Filtered Options
          </div>

          {/* Clear All Selections Option */}
          {/* <div
          //   style={{
          //     padding: '4px',
          //     cursor: 'pointer',
          //     fontWeight: '400',
          //     fontSize: '12px',
          //     // color: '#007bff',
          //     color: '#888',
          //     textAlign: 'left',
          //     // borderBottom: '1px solid #ddd',
          //   }}
          //   onClick={clearAllSelections}
          //   onMouseEnter={(e) => {
          //     e.target.style.backgroundColor = '#f0f0f0';
          //     // e.target.style.boderColor = '#bbb';
          //   }}
          //   onMouseLeave={(e) => {
          //    e.target.style.backgroundColor = '#fff';
          //    // e.target.style.borderColor = 'transparent';
          //   }}
          //
          // >
          //   Clear All Selections
          // </div>
        {/* Scrollable Options */}
        <ul
          style={{
            // border: '1px solid #ccc',
            maxHeight: '210px',
            overflowY: 'auto',
            margin: '0',
            // marginTop: '4px',
            padding: '0',
            listStyleType: 'none',
            // position: 'absolute',
            // width: '100%',
            // backgroundColor: '#fff',
            // zIndex: 1,
          }}
        >
          {/* Options */}
          {displayedOptions.length > 0 ? (
            displayedOptions.map((option, index) => (
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
                  checked={tempSelectedItems.includes(option)}
                  readOnly
                  // onChange={() => handleOptionClick(option)}
                  style={{ marginRight: '8px' }}
                />
                <span>{option}</span>
              </li>
            ))
          ) : (
            <li style={{ padding: '8px' }}>No results found</li>
          )}
        </ul>
          {/* Cancel and Apply Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 8px 8px',
              borderTop: '1px solid #ddd',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={clearAllSelections}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#ff4d4d',
                  // border: '1px solid #ccc',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  // marginRight: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#cc0000';
                  e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff4d4d';
                  e.target.style.boxShadow = 'none';
                }}
              >
                CLEAR ALL
              </button>
              {/* Show selected button */}
              <button
                onClick={() => setShowSelected(!showSelected)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'orange',
                  // border: '1px solid #ccc',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'darkorange';
                  e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'orange';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {showSelected ? 'SHOW ALL' : 'SHOW SELECTED'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#fff',
                    // border: '1px solid #ccc',
                    fontWeight: 'bold',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    // marginRight: '8px',
                    // justifyContent: 'flex-end',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0';
                    // e.target.style.borderColor = '#bbb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleApply}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    // justifyContent: 'flex-end',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                    e.target.style.boxShadow = 'none';
                  }}

                >
                  APPLY
                </button>
            </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default SearchableDropdown;

