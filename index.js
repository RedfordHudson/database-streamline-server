// express
const express = require('express');
const app = express();
app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on port ${port}!')});

// cors
const cors = require('cors');
app.use(cors({origin:'*'}));

// mongoose
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://RedfordHudson:EvKBVYWr3F688F0s@cluster0.jalzw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);
const database = mongoose.connection;
database.once('open',()=>{console.log('Connected to Database!')});

// middleware
app.use(express.json());// ?
app.use(express.urlencoded());

// router
const ResourceRouter = require('./routes/route.resource');
app.use('/resources',ResourceRouter);

// API
const ResourceSchema = require('./schema/schema.resource');
const { urlencoded } = require('body-parser');
app.get('/', async (request,response) => {
    ResourceSchema.find({})
        .then(resources => response.send(resources))
        .catch(err => response.status(500).send('Error: '+err));
});