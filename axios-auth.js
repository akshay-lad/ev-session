import axios from "axios";
import common from "./common/common.json";
let instance = axios.create({
  baseURL: `https://ewebstaffing.com:9004`,
});
 
instance.interceptors.request.use(
  function(config){
    config.headers.authorization = localStorage.getItem(common.token.name);
    config.headers.estaff_ei = localStorage.getItem(common.token.user_detail);
    return config;
  },
  function(error){ Promise.reject(error)}
);
instance.interceptors.response.use(function(response){
  return response;
}, function(error){
  if(error.response.status==401){
    localStorage.removeItem(common.token.name);
    localStorage.removeItem(common.token.user_detail);
       window.location.href = window.location.origin + window.location.pathname;
  }
    return Promise.reject(error)
})
export default  instance;
