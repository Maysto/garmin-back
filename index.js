const express = require('express');
const cors = require('cors');
const path = require('path');

// Init of the app 
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const users = require('./src/routes/api/users');
const passport = require('passport');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

require('./src/config/passport')(passport);

const db = require("./src/config/keys").MongoURI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log(`Database connected successfully ${db}`);
}).catch(err => {
    console.log(`Unable to connect with the Database ${err}`);
});

//app.get('/', (req, res) => {
//    return res.send("<h1>Hello World</h1>");
//});

app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});