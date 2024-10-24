const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.static('public'));

// Operator mapping
const operatorMap = {
    eq: 'eq',      // Equals
    neq: 'neq',    // Not Equals
    gt: 'gt',      // Greater Than
    gte: 'gte',    // Greater Than or Equal To
    lt: 'lt',      // Less Than
    lte: 'lte',    // Less Than or Equal To
    like: 'like',  // Like
    ilike: 'ilike' // Case Insensitive Like
};

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Function to query a table based on dynamic parameters
async function queryTable(layer, attributeName, operator, attributeValue) {
    // Validate input parameters
    if (!layer || !attributeName || !operator || attributeValue === undefined) {
        console.error('All parameters (layer, attributeName, operator, attributeValue) are required.');
        return;
    }

    // Build the query
    const { data, error } = await supabase
        .from(layer) // Dynamic table name
        .select('*') // Select all columns
        .filter(attributeName, operator, attributeValue); // Dynamic filter

    if (error) {
        console.error(`Error fetching data from ${layer}: ${error.message}`);
        return; // Exit the function on error
    }

    return data; // Return the fetched data
}

// Fetch data from a specified table with optional filters
const fetchTableData = async (tableName, filters) => {
    let query = supabase.from(tableName).select('*');

    if (filters) {
        for (const { attribute, operator, value } of filters) {
            const operatorMethod = operatorMap[operator];
            if (operatorMethod) {
                query = query[operatorMethod](attribute, value); // Apply the corresponding operator
            } else {
                throw new Error(`Invalid operator: ${operator}`); // Handle invalid operator
            }
        }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Create routes dynamically for each table
const tables = [
    'Hostels', 'Offices', 'LectureHalls', 'NewLibrary',
    'NewTutionBlock', 'Boardroom', 'Laboratory', 'Hospital'
];

tables.forEach(table => {
    app.get(`/api/${table}`, async (req, res) => {
        try {
            const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
            const data = await fetchTableData(table, filters);
            res.json(data);
        } catch (err) {
            res.status(500).send(`Error fetching data from ${table}: ${err.message}`);
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
