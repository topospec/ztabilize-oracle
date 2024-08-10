import axios from 'axios';
import { format, subDays, addDays } from 'date-fns';

export default async function handler(req, res) {
    try {
        const today = new Date();
        const yesterday = subDays(today, 1);
        const tomorrow = addDays(today, 1);

        const formattedToday = format(today, 'yyyy-MM-dd');
        const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
        const formattedTomorrow = format(tomorrow, 'yyyy-MM-dd');

        console.log("Requesting data for dates:", formattedYesterday, formattedToday, formattedTomorrow);

        const response = await axios.get(`https://api.bcra.gob.ar/estadisticas/v2.0/datosvariable/31/${formattedYesterday}/${formattedTomorrow}`, {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });

        const data = response.data.results;

        const todayData = data.find(entry => entry.fecha === formattedToday);
        const yesterdayData = data.find(entry => entry.fecha === formattedYesterday);
        const tomorrowData = data.find(entry => entry.fecha === formattedTomorrow);

        res.status(200).json({
            yesterday: yesterdayData ? yesterdayData.valor : null,
            today: todayData ? todayData.valor : null,
            tomorrow: tomorrowData ? tomorrowData.valor : null
        });
    } catch (error) {
        console.error('Error fetching UVA data:', error);
        res.status(500).json({ error: 'Failed to fetch UVA data' });
    }
}
