const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// GET /api/guidelines - Return contents of pmg-data.json
app.get('/api/guidelines', (req, res) => {
    const filePath = path.join(__dirname, 'pmg-data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Failed to read pmg-data.json:', err);
            return res.status(500).json({ error: 'Unable to load data' });
        }

        try {
            const json = JSON.parse(data);
            res.json(json);
        } catch (parseErr) {
            return res.status(500).json({ error: 'Malformed JSON' });
        }
    });
});

// POST /api/ingest - Append a new entry to pmg-data.json
app.post('/api/ingest', (req, res) => {
    const { title, content, injuryType } = req.body;

    if (!title || !content || !injuryType) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const newEntry = { title, content, injuryType };
    const filePath = path.join(__dirname, 'pmg-data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let existingData = [];

        if (!err && data) {
            try {
                existingData = JSON.parse(data);
            } catch {
                return res.status(500).json({ error: 'Failed to parse existing data' });
            }
        }

        existingData.push(newEntry);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('❌ Failed to write data:', err);
                return res.status(500).json({ error: 'Failed to write to file' });
            }

            console.log('✅ Ingested:', newEntry);
            res.status(201).json({ message: 'Data saved successfully' });
        });
    });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`📡 STATSearch backend running at http://localhost:${PORT}`);
});
