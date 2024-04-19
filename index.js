/* const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    console.log('Received a webhook:', req.body);

    // The object containing the event details is in req.body
    const event = req.body;

    // The type of event is in event.object_type (e.g., "activity", "athlete")
    const eventType = event.object_type;

    // The action performed on the object is in event.aspect_type (e.g., "create", "update", "delete")
    const eventAction = event.aspect_type;

    // You can add logic to handle different types of events
    if (eventType === 'activity') {
        if (eventAction === 'create') {
            console.log('A new activity was created:', event.object_id);
            // Add your logic to handle a new activity here
        } else if (eventAction === 'update') {
            console.log('An activity was updated:', event.object_id);
            // Add your logic to handle an updated activity here
        } else if (eventAction === 'delete') {
            console.log('An activity was deleted:', event.object_id);
            // Add your logic to handle a deleted activity here
        }
    } else if (eventType === 'athlete') {
        console.log('An athlete event occurred:', event.object_id);
        // Add your logic to handle athlete events here
    }

    // Always respond with a 200 status code to acknowledge receipt of the event
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`)); */
const express = require('express');

const app = express();

app.all('*', async (req, res) => {
    const targetURL = 'https://releyeab-e-dev-ed.develop.my.salesforce.com/services/authcallback/strava' + req.originalUrl;
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(targetURL, { method: req.method });
        if (!response.ok) {
            return res.sendStatus(500);
        }
        const body = await response.text();
        res.send(body);
    } catch (error) {
        return res.sendStatus(500);
    }
});

app.listen(process.env.PORT || 3000);