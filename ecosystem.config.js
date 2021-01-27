// THIS CONFIG IS USED BY PM2
module.exports = {
    apps: [
        {
            name: 'Hockey Bot',
            script: './index.js',
            env_production: {
                NODE_ENV: 'production',
                NODE_PATH: '.',
            },
        },
    ],
};
