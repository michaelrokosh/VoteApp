import logInOut from './log_in_out.js';
import registration from './registration.js';

//групуємо всі actions до одного логічного розділу 
const auth = {
	signIn: logInOut.signIn,
	handleLogout: logInOut.handleLogout,
	signUp: registration.signUp
}

const actions = {
	auth
}

export default actions;