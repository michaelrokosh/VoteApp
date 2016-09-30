import { createApp } from 'mantra-core';
import initContext from './configs/context';

import coreModule from './modules/core';
import authModule from './modules/auth';
import pollsModule from './modules/polls';

const context = initContext();

const app = createApp(context);

app.loadModule(pollsModule);
app.loadModule(coreModule);
app.loadModule(authModule);

app.init()