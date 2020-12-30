const cheerio = require("cheerio");

const columnMap = {
    2: { date: null, time: 0, status: 1 },
    4: { date: 0, time: 2, status: 3 },
};

/**
 * Parse the html page and return array of selected elements
 *
 * @param {string} domSelector - selector for which elements to pull
 * @param {string} dom -  the webpage html
 * @return {array} - array of all the elements in html
 */
const parseElements = (domSelector, dom) => {
    const $ = loadCheerio(dom);

    let elements = [];

    $(domSelector).each((index, element) => {
        if (index == 0) return;
        elements.push($(element).toString());
    });

    return elements;
};

/**
 * Takes each <tr> row passed in and extracts the
 * date, time and current status
 *
 * @param {string} html - the <tr> element
 * @return {Object} scrimmage data
 */
const scrimmageDetails = (html) => {
    const $ = loadCheerio(html);

    const columns = $(html).children("td");

    return parseColumns(columns);
};

const parseColumns = (columns) => {
    const parseStatusColumn = (index) => {
        const slotsColumn = cheerio(columns[index]).find("p.SUGbigbold");
        return cheerio(slotsColumn[0]).text().trim().match(/\d+/g) + "/22";
    };

    const currMap = columnMap[columns.length];

    const date = parseDateColumn(columns[currMap.date]);
    const time = parseTimeColumn(columns[currMap.time]);
    const status = parseStatusColumn(columns[currMap.status]);

    return { date, time, status };
};

const parseColumn = (td) => {
    return cheerio(td).text().trim();
};

const parseDateColumn = (dateElement) => {
    if (dateElement === null) return "";

    const unformattedDate = parseColumn(dateElement);

    // we should have a date in the '01/01/2000 (Sat.)' format
    const formattedDate = unformattedDate
        .split(" ")[0]
        .split("/")
        .splice(0, 2)
        .join("/");

    return formattedDate;
};

const parseTimeColumn = (timeElement) => {
    const unformattedDate = parseColumn(timeElement);

    // we should have a string in the format '7:00pm - 8:00pm'
    const times = unformattedDate.split("-");

    return times[0].trim();
};

const loadCheerio = (html) => {
    return cheerio.load(html);
};

module.exports = { parseElements, scrimmageDetails };
