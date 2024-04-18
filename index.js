/* const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://your-salesforce-instance.com/services/authcallback/strava',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', // rewrite path
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['access-control-allow-origin'] = '*';
    }
}));

app.listen(3000); */
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Received a webhook:', req.body);
    res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));