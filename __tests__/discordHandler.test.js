const DiscordHandler = require('../services/DiscordHandler');

describe('DiscordHandler Tests:', () => {
    const fakeScraper = {
        fetch() {
            return 'fake response';
        },
    };

    const handler = DiscordHandler({ discordChannelId: 12345 }, fakeScraper);

    test(`onMessage 'SHOOT' returns value`, async () => {
        const channelId = 12345;
        const message = 'SHOOT';

        const res = await handler.onMessage(channelId, message);

        expect(res).toContain('You');
    });

    test(`onMessage 'SHOW' it returns value of fetch()`, async () => {
        const channelId = 12345;
        const message = 'SHOW';

        const res = await handler.onMessage(channelId, message);

        expect(res).toBe('fake response');
    });
});
