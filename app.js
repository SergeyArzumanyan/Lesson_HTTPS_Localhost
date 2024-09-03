const https = require('https');
const selfsigned = require('selfsigned');

const PORT = 3000;

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

const options = {
    key: pems.private,
    cert: pems.cert
};

const server = https.createServer(options, (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error World!');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}/`);
});