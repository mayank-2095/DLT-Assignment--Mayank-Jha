const http = require("http");
const server = http.createServer();

const getSubstrings = require("./utils/displayResults.js");
const TimeStory = require("./utils/timeStory");
const httpGetRequest = require("./utils/getHtmlData.js");

const port = 4000;

server.on("request", async (req, res) => {
    try {
        if (req.url === '/getTimeStories' && req.method === 'GET') {
            const html = await httpGetRequest("https://www.time.com");

            //Return html substrings containing information for each story 
            let substrings = await getSubstrings(html);

            //Final payload object
            let data = [];

            for (let htmlsubstring of substrings) {
                //Format this html substring to only get back title and link
                const story = new TimeStory(htmlsubstring);
                data.push({
                    title: story.getTitle(),
                    link: story.getLink()
                })
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                msg: 'The requested URL was not found',
                code: 404
            }))
            res.end();
        }
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            msg: 'Encountered Server Error',
            code: 500
        }))
        res.end();
    }
})

server.listen(port, async () => {
    console.log(`Listening at port ${port}`);
    console.log(`Visit http://localhost:${port}/getTimeStories`);
})