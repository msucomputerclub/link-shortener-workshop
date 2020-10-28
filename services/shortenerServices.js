const Link = require('../models/LinkModel');

module.exports = {
    getUrlByAlias: async (alias) => {
        const link = await Link.findOne({ alias });
        if (!link) {
            return 0;
        }
        return link.url;
    },
    addUrlAlias: async (url, alias) => {
        const existingLink = await Link.findOne({ alias });
        if (!existingLink) {
            const link = new Link({
                alias,
                url,
            }).save();
            return link;
        } else {
            console.log('link exists', existingLink);
            return 0;
        }
    },
};
