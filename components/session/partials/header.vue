<template>
    <div class="well well-sm header-well padding-20 row font-lg">
        <span class="font-bold col-md-5 col-xs-12 main-title">eWebStaffing EI</span>
        <div class="col-md-7 col-xs-12 right-block">
            <!-- <datetime  @input="changeDate" :format="'MM/dd/yyyy'" :auto="true"  :input-class="'display-inline-block form-control'" v-model="sessionDate"></datetime> -->
            <div class="display-inline date-block">
                <label>Session Date:</label>
                <datepicker v-model="sessionDate" @input="changeDate" :format="'MM/dd/yyyy'" :input-class="'form-control'"></datepicker>
            </div>
            <a class="header-link" :class="$store.state.selectedTab=='addNewSession'?'active':''" href="javascript:;" @click="changeTab('addNewSession')">Add New Session</a>
            <a class="header-link" :class="$store.state.selectedTab=='sessionNotes'?'active':''" href="javascript:;" @click="changeTab('sessionNotes')">Session Notes</a>
            <a class="header-link" @click="logout"  href="javascript:;">Logoff</a>
        </div>
    </div>
</template>
<script>
import common from "./../../../common/common.json";
import {Datetime} from 'vue-datetime';
import Datepicker from 'vuejs-datepicker';
import 'vue-datetime/dist/vue-datetime.css';
export default {
    components: {
        Datetime,
        Datepicker
    },
    data: () => ({
        sessionDate:new Date(),
    }),
    props:{

    },
    methods:{
    convertedDate(date){
            var month = date.getMonth() + 1;
            month < 10 ? (month = "0" + month) : false;
            var day = date.getDate();
            day < 10 ? (day = "0" + day) : false;
            return `${date.getFullYear()}-${month}-${day}`;
        },
        changeTab(tab){
            this.$store.state.selectedTab=tab;
        },
        changeDate() {
            //console.log("this.sessionDate=>",this.sessionDate,new Date(this.sessionDate));
            this.$store.state.sessionDate=this.convertedDate(new Date(this.sessionDate));
            this.$emit("change");
		},
        logout() {
            localStorage.removeItem(common.token.name);
            localStorage.removeItem(common.token.user_detail);
            window.location.href = window.location.origin + window.location.pathname;
        },
    },
    mounted(){
        //this.sessionDate=this.$store.state.sessionDate;
        //this.sessionDate=this.convertedDate(new Date());
    },
}
</script>
<style scoped>
.active{
    color: #dcb90b !important;
}
.header-link{
    color: black;
    font-weight: 700 !important;
    display: inline-block;
    margin-left: 20px !important;
}
.vdatetime{
    display: inline-block;
}
.right-block{
        text-align: right;
}
.vdp-datepicker{
    display: inline-block;
    
}
@media only screen and (max-width: 768px) {
    .header-well{
        height: 130px;
    }
    .header-link{
        display: inline-block;
        font-size: 12px;
        margin-left: 0px !important;
        margin-top: 10px !important;
        margin-right: 10px !important;
    }
    .vdp-datepicker{
       display: inline-block;
        width: 50%;    
    }
    .vdatetime{
        width: 60%;
        margin-top: 10px !important;
    }
    .right-block{
        text-align: left;
    }
    .main-title{
        text-align: center;
        font-size: 22px;
        margin-bottom: 5px;
    }
    .date-block{
        position: absolute;
        top: 40px;
    }
}
</style>
