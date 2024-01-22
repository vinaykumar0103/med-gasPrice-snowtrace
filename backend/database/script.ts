// testScraper.js
import { scraperGasPrice } from './Scraper';

const testScraper = async () => {
    try {
        console.log('Running scraper manually...');
        await scraperGasPrice();
        console.log('Scraper completed successfully.');
    } catch (error) {
        console.error('Error during manual scraper run:', error);
    }
};

// Run the test scraper
testScraper();
