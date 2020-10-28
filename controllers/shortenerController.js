const asyncWrapper = require('../utils/asyncWrapper');

const shortenerServices = require('../services/shortenerServices');

const { validationResult } = require('express-validator');

module.exports = {
    getUrlByAlias: asyncWrapper(async (req, res) => {
        const { alias } = req.params; //grab parameter alias from url

        const url = await shortenerServices.getUrlByAlias(alias);
        if (!url) return res.status(400).redirect('/'); //if alias doesn't exist, reload
        res.status(200).redirect(url); // redirect to long url
    }),
    shortenUrl: asyncWrapper(async (req, res) => {
        const errors = validationResult(req); //validate user input
        if (!errors.isEmpty()) {
            const errs = errors
                .array()
                .map((err) => `${err.msg} for ${err.param}`);
            return res.status(400).json({ error: errs.join(',') }); //return errors if present
        }

        let { url, alias } = req.body; //grab user input from body
        if (!url) return res.status(400).json({ error: 'no url' }); //return error if no url
        if (!alias) {
            alias = Math.random().toString(36).substring(2, 15); //generate "unique" alias if not specified
        }
        const newLink = await shortenerServices.addUrlAlias(url, alias);
        if (!newLink) {
            console.log('newLink', newLink);
            return res.status(400).json({ error: 'alias already exists' });
        }
        res.status(200).json({ url: `${req.headers.origin}/${alias}` });
    }),
};
