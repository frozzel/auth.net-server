/////////////////////////// import modules ///////////////////////////
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

/////////////////////////// use middleware ///////////////////////////
const app = express();
app.use(cors());
app.use(bodyParser.json());

/////////////////////////// import routes ///////////////////////////
const paymentRoutes = require('./routes/paymentTrans');


/////////////////////////// use routes ///////////////////////////
app.use('/api', paymentRoutes);



/////////////////////////// start server ///////////////////////////
const server = require('http').Server(app); // import http module

const PORT = process.env.PORT || 8080;

/////////////////////// test server running ///////////////////////
app.get('/api/test', (req, res) => {
    const date = new Date();
    
    res.json({data: `🚀  Server running  🚀 \n ${date.toDateString()}`});
});

app.get('/', (req, res) => {
    const date = new Date();
    res.send(`<body style="background: #333; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #cec7c759; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white;">🚀  Server Running  🚀</h1> \n 
        <h3 style="text-align: center; color: white">${date.toString().slice(0, 24)}</h3>
        </div><div style="width: 30%; height: auto"></div>
        </body>`
     );
});


server.listen(PORT, () => {
    console.log(`................................................`)
    console.log(`🚀  Server running on http://localhost:${PORT}, 🚀`)
    console.log(`...............................................`)
    console.log(`...............Starting Database...............`)
});