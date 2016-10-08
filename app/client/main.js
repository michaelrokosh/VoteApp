import { createApp } from 'mantra-core';
import initContext from './configs/context';

import { bootstrap } from './modules/core/bootstrap.js';

import coreModule from './modules/core';
import usersModule from './modules/users';
import pollsModule from './modules/polls';

bootstrap();

const context = initContext();


const app = createApp(context);

app.loadModule(pollsModule);
app.loadModule(coreModule);
app.loadModule(usersModule);

app.init()