const { JSDOM } = require('jsdom');

/**
 * Pull the html from the url and return jsdom object
 *
 * @param {string} url - The url we are fetching html from
 * @return {Object} - The jsdom object
 */
const getDomDocument = async (url) => {
    const dom = await JSDOM.fromURL(url);
    return dom.window.document;
};

const parseDateString = (dateString) => {
    if (dateString === null) return null;
    return dateString.innerHTML.split(' ')[0].split('/').splice(0, 2).join('/');
};

const parseTimeString = (timeString) =>
    timeString.innerHTML.split('-')[0].trim();

const parseStatusString = (statusString) => {
    const status = statusString.innerHTML.split(' ');

    if (status.length > 3) {
        return status.splice(0, 3).join(' ');
    }

    return 'Filled';
};

const parseScrimmage = (scrimmage) => {
    const columns = scrimmage.querySelectorAll('span.SUGbigbold');
    const fields = {};

    if (scrimmage.childElementCount === 2) {
        fields.date = null;
        [fields.time, fields.status] = columns;
    } else {
        [fields.date, fields.time, fields.status] = columns;
    }

    fields.date = parseDateString(fields.date);
    fields.time = parseTimeString(fields.time);
    fields.status = parseStatusString(fields.status);

    return fields;
};

/**
 * Parses the table htmlelement
 *
 * @param {Object} scrimmageTable - The jsdom htmlelement
 * @return {array} - array of parsed scrimmages
 */
const extractScrimmageDetails = (scrimmageTable) => {
    const scrimmages = scrimmageTable.rows;
    const parsedScrimmages = [];

    // start at 1 because first row is header
    for (let i = 1; i < scrimmages.length; i += 1) {
        const scrimmage = parseScrimmage(scrimmages[i]);
        parsedScrimmages.push(scrimmage);
    }

    return parsedScrimmages;
};

const getFirstElement = (indentifier, document) =>
    document.getElementsByClassName(indentifier)[0];

const getScrimmagesTable = (document) =>
    getFirstElement('SUGtableouter', document);

module.exports = {
    getDomDocument,
    getScrimmagesTable,
    extractScrimmageDetails,
};
