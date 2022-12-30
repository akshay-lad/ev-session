<template>
    <div class="col-md-12">
        
        <div class="row form-group" style="padding-top:10px">
            <div class="col-xs-12 col-md-3">
                <label class="header-label" >User : {{user.ProviderName}}</label>
            </div>
            <div class="col-md-offset-3 col-xs-12 col-md-4" style="padding-left:10px">
                <label class="header-label" >Agency : {{user.CompanyName}}</label>
            </div>
        </div>
        <!-- <div class="margin-bottom-20">
            <a class="header-label" href="javascript:;">Select Session</a> <span class="margin-left-15">Session Date: {{currentDate}}</span>
        </div> -->
        <v-app id="inspire">
        <table border="1" class="table form-group table-striped table-hover table-bordered">
            <tr>
                <th>Session Type</th>
                <th>Child Name</th>
                <th>SA Number</th>
                <th>SA Type</th>
                <th>Start/End Date</th>
            </tr>
            <tbody  v-for="(session,k) in sessionList" :key="k">
                <tr>
                    <td>
                        <a href="javascript:;" v-if="!session.isOpen" @click="getSessionDetail(session,k)" ><i class="fa fa-plus-square" aria-hidden="true"></i></a>
                        <a href="javascript:;" v-else @click="session.isOpen=false"><i class="fa fa-minus-square" aria-hidden="true"></i></a>
                         {{session.SessionTypeDesc}}
                    </td>
                    <td>{{session.ChildName}}</td>
                    <td>{{session.ServiceAuthNumber}}</td>
                    <td>{{session.ServiceAuthType}}</td>
                    <td>{{displayDate}} {{session.SessionStartTimeDisp}} <br>{{displayDate}} {{session.SessionEndTimeDisp}}</td>
                </tr>
                <tr v-if="session.isOpen">
                    <td colspan="5">
                        <sessionDetail :user="user" :index="k" :cptCodeList="cptCodeList" :relationList="relationList"
                         :session="session.session" @getSession="getSessionDetail(session,k)" @updateList="getSessionList"></sessionDetail>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="sessionList.length==0">
            <tr >
                <td colspan="5">
                    No session available!!!
                </td>
            </tr>
            </tbody>
        </table>
        
        
        </v-app>
    </div>
</template>
<script>
import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import common from "./../../../common/common.json";
import sessionDetail from './session-detail.vue'
export default {
    components: {
	    Datetime,sessionDetail
    },
    data: () => ({
        user: {},
        sessionList: [],
        cptCodeList: [],
        relationList:[],
    }),
    computed:{
        currentDate(){
            return this.$store.state.sessionDate;
        },
        displayDate(){
            var data=this.currentDate.split('-');
            return data[1]+"/"+data[2]+"/"+data[0];
        }
    },
    watch: {
        currentDate: function (val) {
            this.getSessionList();
        }
    },
    methods: {
        getSessionDetail(session,k){
            var self = this;
            if(!(this.currentDate && this.currentDate.length>0)){
                return;
            }
            this.axios.get(`/session/session-detail?SessionDate=${this.currentDate}&SessionId=${session.SessionId}`)
            //this.axios.get('/session/session-note-list?date=2019-04-24')
            .then(function(response){
                if(response.data.status && response.data.data){
                    //self.sessionList=response.data.data;
                    self.sessionList[k]['session']=response.data.data[0];
                    self.$set(self.sessionList[k].session,'Id',self.sessionList[k].SessionId);
                    self.$set(self.sessionList[k].session,'IFSPNumberNYEIS',self.sessionList[k].IFSPNumberNYEIS);                }
                    self.sessionList[k].isOpen=true;

            })

        },
        getSessionList(){
            var self = this;
            if(!(this.currentDate && this.currentDate.length>0)){
                return;
            }
            this.axios.get('/session/session-note-list?date='+this.currentDate)
            //this.axios.get('/session/session-note-list?date=2019-04-24')
            .then(function(response){
                if(response.data.status){
                    // response={"status":true,"data":[{"SessionId":120,"ChildName":"Belen Bahnan","ServiceAuthNumber":"7501805","ServiceTypeId":"OT","ServiceAuthType":"OT - Facility","SessionTypeDesc":"Regular","SessionStartTimeDisp":"8:00 AM","SessionStartTime":"08:00:00","SessionEndTimeDisp":"8:30 AM","SessionEndTime":"08:30:00","SessionLengthDisp":"30","SessionNoteId":null},{"SessionId":126,"ChildName":"Liam Rodriguez","ServiceAuthNumber":"7321815","ServiceTypeId":"OT","ServiceAuthType":"OT - Facility","SessionTypeDesc":"Regular","SessionStartTimeDisp":"8:00 AM","SessionStartTime":"08:00:00","SessionEndTimeDisp":"8:30 AM","SessionEndTime":"08:30:00","SessionLengthDisp":"30","SessionNoteId":null},{"SessionId":123,"ChildName":"Jonathan (Twin B) Lin","ServiceAuthNumber":"7315073","ServiceTypeId":"OT","ServiceAuthType":"OT - Facility","SessionTypeDesc":"Regular","SessionStartTimeDisp":"9:00 AM","SessionStartTime":"09:00:00","SessionEndTimeDisp":"9:30 AM","SessionEndTime":"09:30:00","SessionLengthDisp":"30","SessionNoteId":null},{"SessionId":124,"ChildName":"Joseph (Twin A) Lin","ServiceAuthNumber":"7315042","ServiceTypeId":"OT","ServiceAuthType":"OT - Facility","SessionTypeDesc":"Regular","SessionStartTimeDisp":"9:30 AM","SessionStartTime":"09:30:00","SessionEndTimeDisp":"10:00 AM","SessionEndTime":"10:00:00","SessionLengthDisp":"30","SessionNoteId":null},{"SessionId":125,"ChildName":"Zoe Reiner","ServiceAuthNumber":"7019721","ServiceTypeId":"OT","ServiceAuthType":"OT - Basic","SessionTypeDesc":"Regular","SessionStartTimeDisp":"10:00 AM","SessionStartTime":"10:00:00","SessionEndTimeDisp":"10:30 AM","SessionEndTime":"10:30:00","SessionLengthDisp":"30","SessionNoteId":null},{"SessionId":60,"ChildName":"Rendi Fu","ServiceAuthNumber":"7331288","ServiceTypeId":"OT","ServiceAuthType":"OT - Facility","SessionTypeDesc":"Regular","SessionStartTimeDisp":"1:00 PM","SessionStartTime":"13:00:00","SessionEndTimeDisp":"1:30 PM","SessionEndTime":"13:30:00","SessionLengthDisp":"30","SessionNoteId":null}]};
                    // self.sessionList=response.data;
                    self.sessionList=response.data.data;
                    for (let index = 0; index < self.sessionList.length; index++) {
                        self.$set(self.sessionList[index],'isOpen',false);
                        self.$set(self.sessionList[index],'session',{'Id':self.sessionList[index].SessionId});
                        self.$set(self.sessionList[index],'session',{'IFSPNumberNYEIS':self.sessionList[index].IFSPNumberNYEIS});
                    }
                }
            })
        },
        getRelationList(){
            var self = this;
            this.axios.get('/collections/relation-list')
            .then(function(response){
                if(response.data.status){
                    self.relationList=response.data.data;
                }
            })
        },
        getCPTCodes(){
            var self = this;
            this.axios.get('/collections/cpt-codes')
            .then(function(response){
                if(response.data.status){
                    self.cptCodeList=response.data.data;
                }
            })
        },
    },
     mounted() {
        this.user = JSON.parse(localStorage.getItem(common.token.user_detail));
        this.getCPTCodes();
        this.getRelationList();
        this.getSessionList();
        
    }
}
</script>
