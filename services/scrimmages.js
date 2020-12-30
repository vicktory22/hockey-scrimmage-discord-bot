const axios = require("axios");
const fp = require("lodash/fp");
const config = require("../config");
const { parseElements, scrimmageDetails } = require("./parser");

/**
 * Fetches the website html and returns object with
 * details of current scrimmages
 *
 * @return {Object} - scrimmage details
 */
const fetch = async () => {
    const { status, data } = await axios.get(config.url);

    if (status !== 200) handleUnsuccessful();

    return fp.pipe(parseScrimmageRows, extractScrimmageDetails)(data);
};

const parseScrimmageRows = (html) =>
    parseElements(".SUGtableouter > tbody > tr", html);

const extractScrimmageDetails = (scrimmages) => {
    return scrimmages.map((scrimmage) => {
        return scrimmageDetails(scrimmage);
    });
};

const handleUnsuccessful = () => {
    throw "Unable to connect to the website.";
};

module.exports = { fetch };
