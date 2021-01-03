const columnify = require("columnify");
const fp = require("lodash/fp");
const config = require("../config");
const scrimmageParser = require("./pageParser");

/**
 * Fetches the website html and returns object with
 * details of current scrimmages
 *
 * @return {string} - formatted scrimmage details
 */
const fetch = async () => {
    const document = await scrimmageParser.getDomDocument(config.url);

    return fp.pipe(
        scrimmageParser.getScrimmagesTable,
        scrimmageParser.extractScrimmageDetails,
        columnify
    )(document);
};

module.exports = { fetch };
