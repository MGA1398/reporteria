const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const specialityRoutes = require('./routes/specialityRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const router = express.Router();
const properties = require('./config/properties');
const DB = require('./config/db');
// const bodyParserJSON = bodyParser.json();
// const bodyParserURLEncode = bodyParser.urlencoded({extended: true});
// const mongoose = require('mongoose');
// server.js
app.use(cors());
app.use(router);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* server configuration here */
app.use('/api', router);
authRoutes(router);
petRoutes(router);
serviceRoutes(router);
specialityRoutes(router);
transactionRoutes(router);
diseaseRoutes(router);
router.get('/', (req, res) => {
    res.send('Hello from home');
});
DB();
// mongoose.connect('mongodb://127.0.0.1:27017/CRUDAngular', (err, res) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Base datos Online');
// });

app.listen(properties.PORT, () => {
    console.log(`Escuchando el puerto: ${properties.PORT}`)
});
