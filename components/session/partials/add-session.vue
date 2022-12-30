<template>
    <div>
        <v-navigation-drawer v-if="drawer" v-model="drawer" right app>
            <v-alert
                :value="message.error.length>0"
                type="error"
                transition="scale-transition">
                {{message.error}}
            </v-alert>
            <table width="100%">
                <tr>
                <!-- <td width="70%">
                            <button @click="selectStudent" class="btn btn-sm btn-success custom-btn">Select</button>
                </td> -->
                <td width="100%" class="text-right" style="padding-right:20px">
                    <a href="javascript:;" class="custom-remove-drawer" @click="drawer = !drawer"><i class="fa fa-arrow-circle-left"></i></a>
                </td>
                </tr>
            </table>
            <div class="">
                <br>
                <label class="form-control">List of Posted Sessions for {{displayDate}}</label>
                <br>
                <table border="1" class="table table-striped table-hover table-bordered">
                    <tr>
                        <th>No</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Desc.</th>
                        <th>Notes Signed?</th>
                        <th></th>
                        <th>Child(s)</th>
                        <th></th>
                    </tr>
                    <tbody v-if="sessionList.length>0">
                    <tr  v-for="(session,k) in sessionList" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{session.SessionStartTimeDisp}}</td>
                        <td>{{session.SessionEndTimeDisp}}</td>
                        <td>{{session.SessionTypeDesc}}</td>
                        <td>{{session.SessionNoteSignatureStatus==3?'Yes':'No'}}</td>
                        <td><a :href="getFileUrl(session)" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>                        <td>{{session['Child Name']}}</td>
                        <td><a class="custom-remove" v-if="session.SessionNoteSignatureStatusDesc=='Not Signed'" @click="removeSession(session)"><i class="fa fa-times"></i></a></td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr >
                        <td colspan="8">
                            No session available!!!
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            
        </v-navigation-drawer>
        <div class="custom-fieldset">
            <span class="custom-legend">Add New Session</span>
            <div class="row form-group">
                <div class="col-md-2 col-xs-3">Session DT : </div>
                <div class="col-md-3 col-xs-5 custom-calendar" >
                    <datetime  @input="changeDate" disabled="disabled" :format="'MM/dd/yyyy'" :auto="true"  :input-class="'form-control'" :value="sessionDate"></datetime>
                </div>
                <div class="col-md-2 col-xs-4 " >
                    <!-- <datepicker @selected="changeDate" :format="'MM/dd/yyyy'" v-model="newSession.SessionDate" :input-class="'date-input'" :calendar-button="true" :calendar-button-icon="'fa fa-caret-down'" name="uniquename"></datepicker> -->
                    WE Date : {{nextSaturday}}
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-2 col-xs-3">Start Time: </div>
                <div class="col-md-3 col-xs-5">
                    <!-- <v-combobox @change="changeStartTime" v-model="newSession.StartTime"  :items="startTimeList" :item-text="'time'" :item-value="'time'" label="Start time" ></v-combobox> -->
                    <select class="form-control" @change="changeStartTime" v-model="newSession.StartTime">
                        <option v-for="(time,k) in startTimeList" :key="k" :disabled="time.isDisable">{{time.time}}</option>
                    </select>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-2 col-xs-3">End Time: </div>
                <div class="col-md-3 col-xs-5">
                    <!-- <v-combobox v-model="newSession.EndTime" :items="endTimeList" label="End time" ></v-combobox> -->
                    <select class="form-control" @change="changeEndTime" v-model="newSession.EndTime">
                        <option v-for="(time,k) in endTimeList" :key="k" :disabled="time.isDisable">{{time.time}}</option>
                    </select>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-2 col-xs-3">Dur: </div>
                <div class="col-md-8 col-xs-8 ">
                    <label class="border-bottom " style="vertical-align: top;">{{newSession.TotalHour}}</label> &nbsp;
                    <a class="right-drawer" @click.stop="drawer = !drawer"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-2 col-xs-3">Type: </div>
                <div class="col-md-3 col-xs-5 ">
                    <select class="form-control"  v-model="newSession.Type" @change="getTarget">
                        <option v-for="(type,k) in sessionTypeList" :key="k" :value="type.Id">{{type.SessionTypeDesc}}</option>
                    </select>
                </div>
            </div>
            <div class="row form-group" v-if="newSession.Type==4">
                <div class="col-md-2 col-xs-3">Target DT: </div>
                <div class="col-md-3 col-xs-5 ">
                    <select class="form-control" v-model="newSession.Target_DT">
                        <option v-for="(target,k) in targetList" :key="k" :value="target.SessionId">{{convertedDate(target.Id)}}</option>
                    </select>
                </div>
            </div>
            <div class="display-inline">
                <button class="btn btn-primary btn-sm" @click="saveSession">Save</button>
            </div>
        </div>
        <br>
        <div class="col-md-12">
            <div>
                <label class="form-control">List of Service Authorizations</label>
                <br>
                <table border="1" class="table table-striped table-hover table-bordered">
                    <tr>
                        <th></th>
                        <th>Child Name</th>
                        <th>SA#</th>
                        <th>Dur.</th>
                        <th>Units</th>
                        <th>Auth. Start</th>
                        <th>Auth. End</th>
                    </tr>
                    <tbody v-if="student_list.length>0">
                        <tr  v-for="(student,k) in student_list" :key="k" :class="selectedStudent==student?'selected':''">
                            <td><label  ><input type="radio" :name="'chkstudent_'+k" :id="'chkstudent_'+k"   v-model="selectedStudent" :value="student"></label></td>
                            <td>{{student.ChildName}}</td>
                            <td>{{student.serviceauthnumber}}</td>
                            <td>{{student.Dur}}</td>
                            <td>{{student.Units}}</td>
                            <td>{{student.ServiceAuthStartDate}}</td>
                            <td>{{student.ServiceAuthEndDate}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                    <tr >
                        <td colspan="7">
                            No Service available!!!
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import common from "./../../../common/common.json";
export default {
    components: {
	    Datetime
    },
    props:{
        sessionDate:{
        }
    },
    data: () => ({
        user: {},
        sessionList: [],
        sessionTypeList:[
            {'Id':1,'SessionTypeDesc':'Regular'},
            {'Id':2,'SessionTypeDesc':'Cancelled - Awaiting Make-Up'},
            {'Id':4,'SessionTypeDesc':'Make-Up'},
        ],
        dialog: null,
        message: {
            error: "",
            success: ""
        },
        selectedStudent:null,
        drawer: null,
        student_list: [],
        newSession: {
        	StartTime: "07:00 AM",
        	EndTime: "07:30 AM",
            TotalHour: "30 Min",
            Type: '1',
        	Students: []
        },
        startTimeList: [],
        endTimeList: [],
        targetList:[],
    }),
    watch: {
        sessionDate: function (val) {
            
            this.getSessionList();
            this.getAllStudent();
            this.getTarget();
        },
        selectedStudent: function (val) {
            this.getTarget();
        }
        
    },
    methods: {
        
        getFileUrl(session){
        let phpFile="data_setEIGenerateEINoteForm.php";
        switch (session.SessionTypeDesc) {
        case "Make-Up":
        phpFile="data_setEIGenerateMakeUpNoteForm.php";
        break;
        case "Regular":
        phpFile="data_setEIGenerateEINoteForm.php";
        break;
        default:
        phpFile="data_setEIGenerateCancelNoteForm.php";
        break;
        }
        return `${this.user.ProceduresDirectory}/${phpFile}?SessionId=${session.SessionId}`;
        },        
        
        convertedDate(date){
            var data=date.substring(0,10).split('-');
            return `${data[1]}/${data[2]}/${data[0]}`;
        },
        removeSession(session){
            var _vm=this;
            this.$dialog.confirm('Are you sure you want to delete?')
            .then(function (dialog) {
                _vm.axios.post('/session/remove',session)
                    .then(function(response){
                        if(response.data.status){
                            _vm.$dialog.alert("Session removed successfully.")
                            _vm.getSessionList();
                        }
                        else{
                            _vm.$dialog.alert("Some thing went wrong.")
                        }
                    })
                })
            .catch(function () {
            });
        },
        getTarget() {
            var self = this;
            if(this.newSession.Type!=4)
            {
                return;
            }
            var intDate=new Date(this.sessionDate);
            
            //intDate.addDays(14);
            intDate.setDate(intDate.getDate() - 14);
            var month = intDate.getMonth() + 1;
            month < 10 ? (month = "0" + month) : false;
            var day = intDate.getDate();
            day < 10 ? (day = "0" + day) : false;
            var date=`${intDate.getFullYear()}-${month}-${day}`;
            if(!this.selectedStudent){
                return;
            }
            this.axios.get(`/collections/target-dt-list?date=${date}&int_date=${this.sessionDate}&auth_number=${this.selectedStudent.serviceauthnumber}`)
            .then(function(response){
                if(response.data.status){
                    self.targetList=response.data.data;
                }
            })
        },
        getAllStudent() {
            var self = this;
            this.axios.get("/student/list?date=" + this.sessionDate.substring(0,10)).then(function(response) {
                var list = response.data.data;
                self.student_list = [];
                if (list && list.length > 0) {
                list.forEach(function(element) {
                    self.student_list.push({...element,isSelected:false});  
                });
                }
            });
        },
        validateSession(start,end){
            if (start.minitues > end.minitues) {
                this.$dialog.alert('Session Start Time has to be BEFORE End Time. Please Correct!');
                return false;
            }
            if (this.newSession.StartTime == this.newSession.EndTime) {
                this.$dialog.alert('Session Total Minutes = 0. Please Correct!');
                return false;
            }
            return true;
        },
        saveSession() {
            var studentName = "",id="";
            var sessionStartTime = this.convertTimeToMinitues(this.newSession.StartTime);
            var sessionEndTime = this.convertTimeToMinitues(this.newSession.EndTime);
            if(!this.validateSession(sessionStartTime,sessionEndTime)){
                return;
            }
            if (!(this.selectedStudent && this.selectedStudent.serviceauthnumber)) {
                this.$dialog.alert("Please Select Student.");
                return;
            }
            if (!(this.newSession.Type && this.newSession.Type>0)) {
                this.$dialog.alert("Please Select Type.");
                return;
            }
            if (this.newSession.Type==4 && !this.newSession.Target_DT) {
                this.$dialog.alert("Please Select Target Date.");
                return;
            }
            var _vm = this;
            var totalMin = sessionEndTime.minitues - sessionStartTime.minitues;
            var totalHours = totalMin / 60;
            var b={
                PayrollWeek:this.we_date,
                SessionDate : this.sessionDate,
                StartTime:sessionStartTime.time,
                EndTime:sessionEndTime.time,
                TotalHours:totalHours,
                TypeId:this.newSession.Type,
                UserId:this.user.UserId,
                Child_Ref_Number:this.selectedStudent.RefNumberNYEIS,
                TagetSessionId:this.newSession.Target_DT,
                RenderingProviderNPINumber:this.user.RenderingProviderNPINumber,
                ServiceAuthNumber:this.selectedStudent.serviceauthnumber,
            }
            var self = this;
            //this.axios.post('/savesession?studentId=' + this.newSession.Students[0].StudentId + '&startDate=' + new Date(this.newSession.SessionDate) + '&endDate=' + new Date(this.newSession.SessionDate) + '&dur=30&SessionDate=' + new Date(this.newSession.SessionDate) )
            this.axios.post("/session/create", b).then(function(response) {
                if (response.data.status) {
                    self.getSessionList();
                    self.getAllStudent();
                    self.$dialog.alert("Session Was Added Successfully.");
                    self.selectedStudent=null;
                }else{
                    if(response.data.data){
                        self.$dialog.alert(response.data.data);
                    }else{
                        self.$dialog.alert("Something went wrong!");
                    }
                }
            });
        },
        convertTimeToMinitues(data) {
            var time = data.substring(0, 5);
            var timeZ = data.substring(6, 8);
            var h = time.split(":")[0];
            var m = time.split(":")[1];
            if (timeZ == "PM") {
                if(h==12){
                    h = parseInt(h) ;
                }
                else{
                    h = parseInt(h) + 12;
                }
            }
            var obj = {
                minitues: parseInt(h) * 60 + parseInt(m)
            };
            h.length == 1 ? (h = "0" + h) : "";
            m.length == 1 ? (m = "0" + m) : "";
            obj["time"] = h + ":" + m;
            return obj;
        },
        changeStartTime() {
            var startminutes = this.convertTimeToMinitues(this.newSession.StartTime).minitues;
            var endminutes = this.convertTimeToMinitues(this.newSession.EndTime).minitues;
            var count = 0;
            for (let index = 0; index < this.startTimeList.length; index++) {
                if (this.startTimeList[index].time == this.newSession.StartTime) {
                    count = index;
                }
            }
            for (let index = 0; index < this.endTimeList.length; index++) {
                this.endTimeList[index].isDisable = index <= count;
            }
            var endIndex=count + 30;
            if(this.startTimeList.length==count+2){
                endIndex=count + 1;
            }
            if(this.startTimeList.length==count+1){
                endIndex=count;
            }
            this.newSession.EndTime = this.startTimeList[endIndex].time;
            endminutes = this.convertTimeToMinitues(this.newSession.EndTime).minitues;
            this.newSession.TotalHour = endminutes - startminutes + " Min";
        },
        changeEndTime() {
            var startminutes = this.convertTimeToMinitues(this.newSession.StartTime)
                .minitues;
            var endminutes = this.convertTimeToMinitues(this.newSession.EndTime)
                .minitues;
            if (startminutes < endminutes) {
                this.newSession.TotalHour = endminutes - startminutes + " Min";
            }
            // this.getSessionList();
        },
        changeDate() {
            this.newSession = {
                StartTime: "07:00 AM",
                EndTime: "07:30 AM",
                TotalHour: "30 Min",
                Type: '1',
                Students: []
            };
        },
        getSessionList(){
            var self = this;
            this.axios.get('/session/add-session-list?date='+this.sessionDate.substring(0,10))
            .then(function(response){
                if(response.data.status){
                    self.sessionList=response.data.data;
                    if(self.sessionList && self.sessionList.length>0){

                        var oldData=self.sessionList[self.sessionList.length-1].SessionEndTimeDisp;
                        oldData=oldData.length==7?"0"+oldData:oldData;
                        self.newSession = {
                            StartTime: oldData,
                            EndTime:"07:30 AM",
                            Type: '1',
                            TotalHour: "30 Min",
                        };
                        self.changeStartTime();
                    }else{
                        self.newSession = {
                            StartTime: "07:00 AM",
                            EndTime:"07:30 AM",
                            Type: '1',
                            TotalHour: "30 Min",
                        };
                        self.changeStartTime();
                    }
                }
            })
        },
    },
    computed:{
        displayDate: function() {
            //var date = new Date(this.sessionDate);
            // var month = date.getMonth() + 1;
            // month < 10 ? (month = "0" + month) : false;
            // var day = date.getDate();
            // day < 10 ? (day = "0" + day) : false;
            // return month + "/" + day + "/" + date.getFullYear();
            var date=this.sessionDate.split('-');
            return `${date[1]}/${date[2]}/${date[0]}`;
            //return this.sessionDate.replaceAll('/','-')
        },
        nextSaturday(){
            var d = new Date(this.sessionDate);
            var day = d.getDay();
            var diff = d.getDate() - day + (day == 0 ? +6 : 6);
            d = new Date(d.setDate(diff));
            var month = d.getMonth() + 1;
            month < 10 ? (month = "0" + month) : false;
            var day = d.getDate();
            day < 10 ? (day = "0" + day) : false;
            //var data=d.split('-');
            return month+"/"+day+"/"+d.getFullYear();
        },
    },
    mounted() {
        this.getAllStudent();
         this.getSessionList();
         this.user = JSON.parse(localStorage.getItem(common.token.user_detail));
        var hours=[7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10];
        var timeZone="AM";
        hours.forEach(h=>{
            for (let index = 0; index < 60; index++) {
            var time = h<10?"0"+h:h;
            var m=index<10?"0"+index:index;
            time+=":"+m+" "+timeZone;
            if(h==12 || (h==11 && m=="59")){
                timeZone="PM";
            }
            this.startTimeList.push({ time: time, isDisable: false });
            this.endTimeList.push({ time: time, isDisable: false });
            }
        })
    }
}
</script>
<style>
.selected{
    background-color: #afb2dc !important;
}
</style>
