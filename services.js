const config = require("./config");
const https = require("https");
const cheerio = require("cheerio");
const columnify = require("columnify");

const getHTML = async () => {
    return new Promise((resolve, reject) => {
        let body = "";
        https.get(config.site_url, (res) => {
            res.setEncoding("utf8");
            res.on("data", (data) => (body += data));
            res.on("end", () => resolve(body));
            res.on("error", (e) => reject(e));
        });
    });
};

const parseScrimmages = async (html) => {
    const scrimmages = [];

    const $ = cheerio.load(html);

    const scrimmageRows = $(".SUGtableouter > tbody > tr");

    scrimmageRows.each((index, scrimmage) => {
        if (index == 0) return; // header row
        scrimmages.push(parseScrimmage(scrimmage));
    });

    return scrimmages;
};

const parseScrimmage = (scrimmage) => {
    const columns = cheerio(scrimmage).children("td");

    let indexes = {};

    if (columns.length == 4) {
        indexes = { date: 0, time: 2, status: 3 };
    } else {
        indexes = { date: null, time: 0, status: 1 };
    }

    return parseColumns(columns, indexes);
};

const parseColumns = (columns, indexes) => {
    const parseColumn = (index) => cheerio(columns[index]).text().trim();
    const parseStatusColumn = (index) => {
        const slotsColumn = cheerio(columns[index]).find("p.SUGbigbold");
        return cheerio(slotsColumn[0]).text().trim().match(/\d+/g) + "/22";
    };

    const date = indexes.date == null ? "" : parseColumn(indexes.date);
    const time = parseColumn(indexes.time);
    const status = parseStatusColumn(indexes.status);

    return { date, time, status };
};

const fetch = async () => {
    const html = await getHTML();
    const scrimmages = await parseScrimmages(html);
    return columnify(scrimmages);
};

module.exports = { fetch };
