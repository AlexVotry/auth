const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');

const PORT = process.env.PORT || 3000;

// DB setup

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/auth');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

router(app);

app.listen(PORT, () => console.log(`listening on port ${PORT}...`))