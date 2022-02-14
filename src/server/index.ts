import * as Hapi from '@hapi/hapi';
import * as Pino from 'hapi-pino';
import * as Qs from 'qs';
import config from './config/config';
import { handleValidationError } from './utils';
import { pinoConfig } from './config/pino';
import routes from './routes';
import { dbInit } from './models';
// import {
//     readingContractEventsDeposit,
//     readingContractEventsWithdraw,
//     recordingAllEvents
// } from './utils/blockchain';



const init = async () => {
    const server = await new Hapi.Server({
        port: config.server.port,
        host: config.server.host,
        query: {
            parser: (query) => Qs.parse(query),
        },
        routes: {
            validate: {
                options: {
                    abortEarly: false,
                },
                failAction: handleValidationError,
            },
            response: {
                failAction: 'log',
            },
        },
    });
    server.realm.modifiers.route.prefix = '/api';
    // Регистрируем расширения
    await server.register([
        { plugin: Pino, options: pinoConfig(false), },
    ]);

    await dbInit();

    // await readingContractEventsDeposit();
    // await readingContractEventsWithdraw();
    // await recordingAllEvents('Deposit');
    // await recordingAllEvents('Withdraw');

    server.route(routes);

    // Запускаем сервер
    try {
        await server.start();
        server.log('info', `Server running at: ${server.info.uri}`);
    } catch (err) {
        server.log('error', JSON.stringify(err));
    }

    return server;
};

export { init };
