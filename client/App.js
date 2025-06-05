import React, { useState, useEffect, useRef } from 'react';

import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';
import DetailView from './components/DetailView';
import Fuse from 'fuse.js';


function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    const [guidelines, setGuidelines] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null); // ✅ Moved here + fixed spelling
    const fuseRef = useRef(null);

    useEffect(() => {
        fetch('a/api/guidelines')
            .then((res) => res.json())
            .then((data) => {
                console.log('🔥 Loaded guidelines:', data);
                setGuidelines(data);
                console.log('Loaded guidelines:', data);
                fuseRef.current = new Fuse(data, {
                    keys: ['title', 'content'],
                    threshold: 0.3,
                });
            })
            .catch((err) => console.error('Failed to load guidelines:', err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!fuseRef.current) return;

        const dataToSearch = selectedFilter
            ? guidelines.filter((g) => g.injuryType === selectedFilter)
            : guidelines;

        const fuse = new Fuse(dataToSearch, {
            keys: ['title', 'content'],
            threshold: 0.3,
        });

        const fuseResults = fuse.search(query);
        const matchedItems = fuseResults.map((r) => r.item);
        setResults(matchedItems);
        setSelected(null);
    };

    const handleReset = () => {
        setQuery('');
        setResults([]);
        setSelected(null);
    };

    return (
        <main
            style={{
                maxWidth: '500px',
                margin: '0 auto',
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                }}
            >
                STATSearch
            </h1>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {['All', 'Head Trauma', 'Spinal Cord', 'Fracture'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedFilter(type === 'all' ? null : type)}
                        style={{
                            padding: '0.4rem 0.75rem',
                            backgroundColor: selectedFilter === type ? '#0077cc' : '#eee',
                            color: selectedFilter === type ? '#fff' : '#333',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            <SearchBar
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSearch={handleSearch}
            />

            {results.length > 0 && !selected && (
                <button
                    onClick={handleReset}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        fontSize: '0.9rem',
                        backgroundColor: '#ccc',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    Reset Search
                </button>
            )}

            {!selected && <ResultList items={results} onView={setSelected} />}
            {selected && <DetailView item={selected} onBack={() => setSelected(null)} />}
        </main>
    );
}

export default App;