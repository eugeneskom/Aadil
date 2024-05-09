import express from 'express';

const app = express();

app.use(require('prerender-node').set('prerenderToken',  process.env.REACT_APP_PRERENDER_TOKEN));