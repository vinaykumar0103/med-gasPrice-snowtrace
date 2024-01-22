import axios from 'axios';
import { JSDOM } from 'jsdom';
import GasPrice from './GasPrice';

export const scraperGasPrice = async () => {
    try {
        const response = await axios.get('https://api.avax.network/ext/bc/C/rp');
        console.log('HTML Content:', response.data);



        const dom = new JSDOM(response.data);
        console.log('DOM Object:', dom);


        // Check if the element with id 'med-gas-price' exists
        const gasPriceElement = dom.window.document.querySelector('#med-gas-price');
        console.log('Gas Price Element:', gasPriceElement);

        if (gasPriceElement !== null) {
            const medGasPrice = parseFloat(gasPriceElement.textContent || '0');
            const timeStamp = new Date();

            const gasPrice = new GasPrice({ value: medGasPrice, timeStamp });
            await gasPrice.save();
            console.log('Gas Price saved to the database:', gasPrice);
        } else {
            console.error('Element with id "med-gas-price" not found.');
        }
    } catch (error) {
        console.error('Error scraping gas price:', error);
    }
}
