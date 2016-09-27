import { createApp } from 'mantra-core';
import initContext from './configs/context';

import coreModule from './modules/core';


const context = initContext();
console.log(context);
const app = createApp(context);
