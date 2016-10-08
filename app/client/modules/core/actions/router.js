export default {
 	goTo({ FlowRouter }, routeName, selector) {
		if(!selector) {
			FlowRouter.go(routeName)
		} else {
			FlowRouter.go(routeName, selector)
		}
	},

	getPath({ FlowRouter }, routeName, selector) {

		if(!selector) {
			return FlowRouter.path(routeName)
		} else {
			return FlowRouter.path(routeName, selector)
		}
	}
}