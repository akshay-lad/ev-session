<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title v-if="isShowChangePassword">Change Password</v-toolbar-title>
                <v-toolbar-title v-else>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-if="isShowChangePassword">
                  <!-- <div :class="errors.first('login') && errors.first('login').length>0?'has-error':''"> -->
                  <v-text-field prepend-icon="lock" name="old_password" v-model="change_password.old_password" label="Old Password" type="password"></v-text-field>
                  <!-- <span v-if="errors.first('login') && errors.first('login').length>0">
                    {{errors.first('login')}}
                    </span>
                  </div> -->
                  <v-text-field prepend-icon="lock" name="new_password" v-model="change_password.new_password" label="New Password" type="password"></v-text-field>
                  <v-text-field prepend-icon="lock" name="conf_new_password" v-model="change_password.conf_new_password" label="Confirm New Password" type="password"></v-text-field>
                </v-form>
                <v-form v-else>
                  <!-- <div :class="errors.first('login') && errors.first('login').length>0?'has-error':''"> -->
                  <v-text-field prepend-icon="person" name="login" v-model="login.user_name" label="Login" type="text"></v-text-field>
                  <!-- <span v-if="errors.first('login') && errors.first('login').length>0">
                    {{errors.first('login')}}
                    </span>
                  </div> -->
                  <v-text-field id="password" prepend-icon="lock" v-model="login.password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="isShowChangePassword" color="primary" @click="changePassword">Change Passwword</v-btn>
                <v-btn v-else color="primary" @click="validateUser">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import common from "./../../common/common.json";
  export default {
    data: () => ({
      isShowChangePassword:false,
      drawer: null,
      change_password: {},
      user:{},
      login:{
          user_name:'',
          password:'',
      },
      we_date: new Date(),
      user_data:{
          id:1,
          user_name:'admin',
          password:'admin',
          name:'Jill Kelly (ST)',
          agency:'RCM'
      }
    }),
    props: {
      source: String
    },
    methods:{
      changePassword() {
      var self = this;
      if (this.change_password.new_password != this.change_password.conf_new_password) {
         self.$dialog.alert("New password and Confirmation password does not match!!");
        return;
      }
      this.change_password['userId']=this.user.UserId;
      this.axios
        .post("/users/changePassword", this.change_password)
        .then(function(response) {
          if (response.data.status) {
             self.$dialog.alert(response.data.data);
            window.location.reload();
            self.dialog = false;
            self.change_password = {};
            //self.$store.state.login_user=self.user_data;
            //self.$router.push("/therapy")
          } else {
             self.$dialog.alert(response.data.data);
          }
        });
    },
        validateUser(){
          var self = this;
            this.axios.post('/users/login',{'Login':this.login.user_name,'Password': this.login.password})
             .then(function(response){
               if(response.data.status){
                self.user=response.data.data;
                //self.user.ResetFL=false;
                 if(self.user.ResetFL){
                    self.isShowChangePassword=true;

                 }else{
                   localStorage.setItem(common.token.user_detail,JSON.stringify(response.data.data))
                  localStorage.setItem(common.token.name,response.data.token)
                
                   window.location.href=window.location.origin+window.location.pathname+"#/ei"
                 }
                //localStorage.setItem("user",JSON.stringify(response.data.data))
                //localStorage.setItem("t_token",response.data.token)
                // this.$dialog.alert("Login successfull.")
//                window.location.reload();
              //  window.location.href=window.location.origin+window.location.pathname+"#/therapy"

               }else{
                 self.$dialog.alert("Login Fail.");
               }
             }).catch(function (error) {
                    console.log(error);
            });
            //  if(this.login.user_name==this.user_data.user_name && this.login.password && this.user_data.password){
            //     this.$dialog.alert("Login successfull")
            //      this.$store.state.login_user=this.user_data;
            //      this.$router.push("/therapy")
            //  }
        },
        getAll(){
             this.axios.get('/users/list')
             .then(function(response){
                 console.log("response=>",response);
             })
        }
    },
    mounted(){
       
      // var day=date.getDate() – date.getDay() + 7;
      // this.we_date=new Date(date.getFullYear(), date.getMonth(),( ));
      //  this.getAll()
    }
  }
</script>