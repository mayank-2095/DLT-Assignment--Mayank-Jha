const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;
const TIME_URL = 'https://time.com';

app.get('/getTimeStories', async (req, res) => {
    try {
        const response = await axios.get(TIME_URL); // for fetching the homepage of time.com
        const html = response.data;
        const $ = cheerio.load(html);
        const stories = [];

        $('.latest-stories__item').each((index, element) => { // loop will select and will parse the details
                const title = $(element).find('.latest-stories__item-headline').text().trim(); // generate the text
                const link = TIME_URL + $(element).find('a').attr('href'); // get the news url

                stories.push({ title, link });
        });

        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).send('Failed to fetch stories');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/getTimeStories`);
});
