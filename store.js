import Vue from 'vue'
import Vuex from 'vuex'
import common from "./common/common.json";
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login_user:{
		},
		sessionDate:"",
		token:{
			name: common.token.name,
			user_detail: common.token.user_detail
		},
		selectedTab:'sessionNotes'
	},
});

export default store