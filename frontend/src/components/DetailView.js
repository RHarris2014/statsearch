import React from 'react';

function DetailView({ item, onBack }) {
    return (
        <div style={{ background: '#fff4e6', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
            <h2>{item.title}</h2>
            <p><strong>Summary:</strong> {item.summary}</p>
            <p><strong>Details:</strong> {item.details}</p>
            <button onClick={onBack} style={{ marginTop: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#666', color: '#fff' }}>
                Back to Results
            </button>
        </div>
    );
}

export default DetailView;