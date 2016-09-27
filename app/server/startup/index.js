import bootstrap from './bootstrap.jsx';
import fixtures from './fixtures.jsx';
import migrations from './migrations.jsx';

export default () => {
	bootstrap();
	fixtures();
	migrations();
}