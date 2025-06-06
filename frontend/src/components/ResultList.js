import React from 'react';

function ResultList({ items, onView }) {
    return (
        <div style={{ marginTop: '1rem' }}>
            {items.length === 0 ? (
                <p>No results found.</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ background: '#eef', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <button onClick={() => onView(item)} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                            View
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ResultList;