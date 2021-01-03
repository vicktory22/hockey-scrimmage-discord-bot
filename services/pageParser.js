const { JSDOM } = require("jsdom");

const getDomDocument = async (url) => {
    const dom = await JSDOM.fromURL(url);
    return dom.window.document;
};

const extractScrimmageDetails = (scrimmageTable) => {
    const scrimmages = scrimmageTable.rows;
    const parsedScrimmages = [];

    // start at 1 because first row is header
    for (let i = 1; i < scrimmages.length; i++) {
        const scrimmage = parseScrimmage(scrimmages[i]);
        parsedScrimmages.push(scrimmage);
    }

    return parsedScrimmages;
};

const parseScrimmage = (scrimmage) => {
    let parseMap = { date: 0, time: 2, status: 3 };

    if (scrimmage.childElementCount == 2) {
        parseMap = { date: null, time: 0, status: 1 };
    }

    const fields = {};

    fields.date = "";
    if (parseMap.date !== null) {
        fields.date = parseDateColumn(scrimmage.children[parseMap.date]);
    }
    fields.time = parseTimeColumn(scrimmage.children[parseMap.time]);
    fields.status = parseStatusColumn(scrimmage.children[parseMap.status]);

    return fields;
};

const parseDateColumn = (column) => {
    const date = column.children[0].innerHTML.trim();
    const formatted = date.split(" ")[0].split("/").splice(0, 2).join("/");
    return formatted;
};

const parseTimeColumn = (column) => {
    const time = column.children[0].innerHTML.trim();
    const formatted = time.split("-")[0].trim();
    return formatted;
};

const parseStatusColumn = (column) => {
    const status = column
        .getElementsByClassName("SUGbigbold hrow")[0]
        .innerHTML.trim();
    const formatted = status.match(/\d+/g) + "/22";
    return formatted;
};

const getScrimmagesTable = (document) =>
    getFirstElement("SUGtableouter", document);

const getFirstElement = (indentifier, document) => {
    return document.getElementsByClassName(indentifier)[0];
};

module.exports = {
    getDomDocument,
    getScrimmagesTable,
    extractScrimmageDetails,
};
