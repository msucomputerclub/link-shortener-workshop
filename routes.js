const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const shortenerController = require('./controllers/shortenerController');

module.exports = (router) => {
    // @route GET /
    // @desc root route
    router.get('/', (req, res) => {
        console.log(
            `${req.method} | ${req.url} | ${req.headers['user-agent']}`
        );
    });

    // @route GET /:alias
    // @param alias: name for the shortened url
    router.get('/:alias', shortenerController.getUrlByAlias);

    // @route POST /
    // @desc register new url and alias
    router.post('/', [body('url').isURL()], shortenerController.shortenUrl);
};
