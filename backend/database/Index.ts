import express from 'express';
import mongoose from 'mongoose';
import { scraperGasPrice } from './Scraper';
import dotenv from 'dotenv';
dotenv.config();

const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

//  database connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.bsihbru.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connected successfully');
        console.log('Is Mongoose connection open:', mongoose.connection.readyState === 1);
    })
    .catch(err => console.error('Database connection error:', err));

// Express routes here
app.get('/', (req, res) => {
    // Handle gas prices endpoint
    res.send('Gas prices endpoint');
});

// periodic scraping
setInterval(scraperGasPrice, 30 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
