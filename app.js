const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const itemRoutes = require('./routes');

app.use(express.json());
app.use('/routes', itemRoutes);

app.use(function (req, res, next){
    return new ExpressError('Not Found', 404);
});

app.use((err, req,res,next) => {
    res.status(err.status || 500);
    return res.json({error: err.msg,});
});

module.exports = app;