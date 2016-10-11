import bootstrap from './bootstrap.js';
import fixtures from './fixtures.js';
import migrations from './migrations.js';

export default () => {
	bootstrap();
	fixtures();
	migrations();
}