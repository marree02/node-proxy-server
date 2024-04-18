const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Received a webhook:', req.body);
    res.sendStatus(200);
});

app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "your_verify_token";
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.json({ "hub.challenge": challenge });
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});

app.get('/authcallback', (req, res) => {
    const code = req.query.code;
    const redirectUri = `https://releyeab-e-dev-ed.develop.my.salesforce.com/services/authcallback/strava?code=${code}`;

    res.redirect(redirectUri);
});

app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route hit');
});