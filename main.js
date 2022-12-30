// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue';
import App from './App';

// library imports
import 'bootstrap/dist/css/bootstrap.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'es6-promise/auto';
Vue.config.productionTip = false;
import 'babel-polyfill';
import Vuetify from 'vuetify';
import store from './store';
import common from "./common/common.json";
import axios from './axios-auth';
import VueAxios from 'vue-axios';
// import { Settings } from 'luxon'

// Settings.defaultLocale = 'es'
Vue.use(VueAxios,axios);
Vue.use(Vuetify);

import Vuex from 'vuex';
Vue.use(Vuex);
import VeeValidate from 'vee-validate';
const config = {
	events: 'blur'
};

export default Vue.use(VeeValidate, config);

import VuejsDialog from "vuejs-dialog"

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

// Tell Vue to install the plugin.
Vue.use(VuejsDialog)
import VueSignature from 'vue-signature-pad';

Vue.use(VueSignature);
import router from './router';
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
var token = localStorage.getItem(common.token.name);
if(to.path =='/'){
	if (!(token && token.length > 0)) {
		next();
	}else{
		window.location.href = window.location.origin + window.location.pathname + "#/ei"
		window.reload();
	}
}else{
	next();
	if (!(token && token.length > 0)) {
		next();
	}

}
})
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
