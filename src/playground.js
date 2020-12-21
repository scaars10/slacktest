const { WebClient, LogLevel } = require('@slack/web-api');

const web = new WebClient('bogus token');

(async () => {
    await web.auth.test();

    console.log('Done!');
})();