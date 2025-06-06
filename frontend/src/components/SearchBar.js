import React from 'react';

function SearchBar({ value, onChange, onSearch }) {
    return (
        <form onSubmit={onSearch} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} >
            <input
                type="search"
                placeholder="Search trauma protocols..."
                value={value}
                onChange={onChange}
                style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px'}}>
                    Search
                </button>
        </form>
    );
}

export default SearchBar;