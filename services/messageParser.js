const scrimmages = require("./scrimmages");

const handleMessage = async (message) => {
    if (message === "SHOW") {
        return await handleShow();
    }

    if (message === "SHOOT") {
        return handleShoot();
    }
};

const handleShow = async () => {
    try {
        return await scrimmages.fetch();
    } catch (error) {
        return "An error occured fetching scrimmages.";
    }
};

const handleShoot = () => {
    return getRandomInt(2) === 0 ? "You Scored!" : "You Missed :(";
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

module.exports = { handleMessage };
