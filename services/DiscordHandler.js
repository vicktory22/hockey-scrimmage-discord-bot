module.exports = ({ discordChannelId }, scraper) => {
    const actionWords = { show: 'SHOW', shoot: 'SHOOT' };

    return {
        async onMessage(channelId, message) {
            // filter out messages in wrong channel
            if (channelId !== discordChannelId) {
                return '';
            }

            return this.handleMessage(message.toUpperCase());
        },

        async handleMessage(message) {
            if (message === actionWords.show) {
                return this.handleShow();
            }

            if (message === actionWords.shoot) {
                return this.handleShoot();
            }

            // we if the message is unknown
            return '';
        },

        async handleShow() {
            try {
                return scraper.fetch();
            } catch (e) {
                return 'An error occured trying to scrape.';
            }
        },

        handleShoot() {
            const outcome = Math.random() > 0.5 ? 'Scored!' : 'Missed :(';

            return `You ${outcome}`;
        },
    };
};
