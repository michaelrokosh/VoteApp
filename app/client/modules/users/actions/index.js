import logInOut from './log_in_out.js';
import registration from './registration.js';
import userSettings from './user_settings.js';

//групуємо actions до одного логічного розділу 
const auth = {
	signIn: logInOut.signIn,
	handleLogout: logInOut.handleLogout,
	signUp: registration.signUp
}

const actions = {
	auth,
	userSettings
}

export default actions;