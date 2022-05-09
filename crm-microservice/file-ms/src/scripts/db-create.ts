import { createConnection, ConnectionOptions } from 'typeorm';

import { configuration } from '../config/configuration';

async function create() {
    try {
        const connection = await createConnection(configuration.database as ConnectionOptions);

        await connection.synchronize(true);
    } catch (err) {
        console.log(err);
    }
}

create();
