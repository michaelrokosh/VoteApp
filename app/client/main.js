import { createApp } from 'mantra-core';
import initContext from './configs/context';

import bootstrap from './configs/bootstrap.js';

import coreModule from './modules/core';
import authModule from './modules/auth';
import pollsModule from './modules/polls';

const context = initContext();
bootstrap();

const app = createApp(context);
app.loadModule(pollsModule);
app.loadModule(coreModule);
app.loadModule(authModule);

app.init()