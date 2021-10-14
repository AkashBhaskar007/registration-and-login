const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/registration");
mongoose.connection.on('connected', () => {
    console.log('DB has connected successfully!')
});
mongoose.connection.on('error', err => {
    console.log('Error in connecting DB!' + err)
});
