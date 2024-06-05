const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GraphData = require('./GraphDataSchema');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Saifali:user123@cluster0.bkfyiws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.post('/savedata', async (req, res) => {
    const {labels,datasets}=req.body.chartData
    console.log("labels",labels)
    const values=datasets[0].data
    console.log("values",values)
    try {
        const newItem = new GraphData({
            labels,
            values
        });
        const graphData = await newItem.save();
        res.status(200).send("Data saved successfully");
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
