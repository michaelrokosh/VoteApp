import LogInOut from './log_in_out.js';
import registration from './registration.js';

const auth = {
	SignIn: LogInOut.SignIn,
	HandleLogout: LogInOut.HandleLogout,
	SignUp: registration.SignUp
}

const actions = {
	auth
}

export default actions;