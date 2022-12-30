<template>
    <div class="col-md-12">
        <div class="row" style="padding-top:10px">
            <v-stepper v-if="isLoad" v-model="stepper.active" vertical>
                <v-stepper-step :complete="stepper.active > 1" step="1">
                    CPT Codes
                </v-stepper-step>

                <v-stepper-content step="1">
                    <div class="form-group" :class="errors.has('CPTCode1'+index)?'has-error':''">
                        <div class="row">
                            <div class="col-md-2">
                                <label>CPT Code1 : <span class="font-red">*</span></label>
                            </div>
                            <div class="col-md-6">
                                <select class="form-control" v-model="session.CPTCode1" 
                                v-validate="'required'" :name="'CPTCode1'+index" data-vv-as="CPTCode">
                                    <option v-for="(code,key) in cptCodeList" :key="key" :value="code.CPTCode">{{code.CPTCodeDesc}}</option>
                                </select>
                                <span class="help-block font-red" v-if="errors.has('CPTCode1'+index)">
                                    <strong>{{ errors.first('CPTCode1'+index) }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" :class="errors.has('CPTCode2'+index)?'has-error':''">
                        <div class="row">
                            <div class="col-md-2">
                                <label>CPT Code2 : <span class="font-red">*</span> </label>
                            </div>
                            <div class="col-md-6">
                                <select class="form-control" v-model="session.CPTCode2"
                                v-validate="'required'" :name="'CPTCode2'+index"  data-vv-as="CPTCode">>
                                    <option v-for="(code,key) in cptCodeList" :key="key" :value="code.CPTCode">{{code.CPTCodeDesc}}</option>
                                </select>
                                 <span class="help-block font-red" v-if="errors.has('CPTCode2'+index)">
                                    <strong>{{ errors.first('CPTCode2'+index) }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-2">
                                <label>CPT Code3 :  </label>
                            </div>
                            <div class="col-md-6">
                                <select class="form-control" v-model="session.CPTCode3">
                                    <option v-for="(code,key) in cptCodeList" :key="key" :value="code.CPTCode">{{code.CPTCodeDesc}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-2">
                                <label>CPT Code4 :  </label>
                            </div>
                        <div class="col-md-6">
                            <select class="form-control" v-model="session.CPTCode4">
                                <option v-for="(code,key) in cptCodeList" :key="key" :value="code.CPTCode">{{code.CPTCodeDesc}}</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <v-btn color="primary" @click="validateFirst">Continue</v-btn>
                    <!-- <v-btn flat @click="stepper.active--">Cancel</v-btn> -->
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 2" step="2">Session Participants</v-stepper-step>

                <v-stepper-content step="2">
                    <div class="form-group">
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionPartChild"> Child
                        </div>
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionPartParent"> Parent/Caregiver
                        </div>
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionPartOther"> Other 
                        </div>
                        <div class="display-inline-block width-30-per v-align-top" :class="errors.has('SessionPartOtherDesc'+index)?'has-error':''">
                            <input type="textbox" class="form-control " v-model="session.SessionPartOtherDesc"
                            :name="'SessionPartOtherDesc'+index" data-vv-as="other" v-validate="session.SessionPartOther?'required':''"  >
                            <span class="help-block font-red" v-if="errors.has('SessionPartOtherDesc'+index)">
                                <strong>{{ errors.first('SessionPartOtherDesc'+index) }}</strong>
                            </span>
                        </div>
                    </div>
                    <v-btn color="primary" @click="validateSecond">Continue</v-btn>
                    <v-btn flat @click="stepper.active--">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 3" step="3">
                    Describe the progress that child has made toward thee IFSP outcome since the last session.
                </v-stepper-step>

                <v-stepper-content step="3">
                    <div class="form-group" :class="errors.has('ProgressNotes'+index)?'has-error':''">
                        <textarea rows="3" class="form-control" :name="'ProgressNotes'+index" v-validate="'required'"
                         v-model="session.ProgressNotes" data-vv-as="Progress Notes"></textarea>
                        <span class="help-block font-red" v-if="errors.has('ProgressNotes'+index)">
                            <strong>{{ errors.first('ProgressNotes'+index) }}</strong>
                        </span>
                    </div>
                    <v-btn color="primary" @click="validateThree">Continue</v-btn>
                    <v-btn flat @click ="stepper.active--">Cancel</v-btn>
                </v-stepper-content>
                
                <v-stepper-step :complete="stepper.active > 4" step="4">
                    Additional information about the session(as appropriate):
                </v-stepper-step>
                <v-stepper-content step="4">
                    <div class="form-group">
                        <textarea rows="3" class="form-control" v-model="session.ProgressNotesAdditional"></textarea>
                    </div>
                    <v-btn color="primary" @click="validateFour">Continue</v-btn>
                    <v-btn flat @click="stepper.active--">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 5" step="5">
                    IFSP Functional outcome(s) and Objective(s) addressed during this session:
                </v-stepper-step>
                <v-stepper-content step="5">
                    <div class="form-group" >
                        <v-flex>
                          <v-select
                           v-model="selectedOutComes"
                            :items="outComesList"
                            label="Select Item"
                            attach
                            multiple
                            item-text="IFSPOutcomeDesc"
                            item-value="id"
                        >
                        </v-select>
                        </v-flex>
                    </div>
                    <v-btn color="primary" @click="validateFive">Continue</v-btn>
                    <v-btn flat @click="stepper.active--">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 6" step="6">
                   Routine Activities worked on during the session:
                </v-stepper-step>
                <v-stepper-content step="6">
                    <div class="form-group">
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionActADL"> ADL
                        </div>
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionActPlay"> Play/Social
                        </div>
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionActComm"> Comm/Errand
                        </div>
                        <div class="display-inline-block padding-5 v-align-top">
                            <input type="checkbox" v-model="session.SessionActOther"> Other 
                        </div>
                        <div class="v-align-top display-inline-block width-30-per" :class="errors.has('SessionActOtherDesc'+index)?'has-error':''">
                            <input type="textbox" class="form-control" v-model="session.SessionActOtherDesc"
                            :name="'SessionActOtherDesc'+index" data-vv-as="other" v-validate="session.SessionActOther?'required':''"  >
                            <span class="help-block font-red" v-if="errors.has('SessionActOtherDesc'+index)">
                                <strong>{{ errors.first('SessionActOtherDesc'+index) }}</strong>
                            </span>
                        </div>
                    </div>
                    <v-btn color="primary" @click="validateSix">Continue</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 7" step="7">
                   Strategies used within the Routine Activities:
                </v-stepper-step>
                <v-stepper-content step="7">
                    <div class="form-group">
                        <div class="v-align-top display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrMdl"> Modeling
                        </div>
                        <div class="v-align-top display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrCues"> Cues
                        </div>
                        <div class="v-align-top display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrPrm"> Prompts
                        </div>
                        <div class=" v-align-top display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrPos"> Positioning
                        </div>
                        <div class="v-align-top  display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrAst"> Assist. Tech
                        </div>
                        <div class="v-align-top display-inline-block padding-5">
                            <input type="checkbox" v-model="session.SessionStrOther"> Other 
                        </div>
                        <div class="v-align-top display-inline-block width-30-per" :class="errors.has('SessionStrOtherDesc'+index)?'has-error':''">
                            <input type="textbox" class="form-control" v-model="session.SessionStrOtherDesc"
                            :name="'SessionStrOtherDesc'+index" data-vv-as="other" v-validate="session.SessionStrOther?'required':''"  >
                            <span class="help-block font-red" v-if="errors.has('SessionStrOtherDesc'+index)">
                                <strong>{{ errors.first('SessionStrOtherDesc'+index) }}</strong>
                            </span>
                        </div>
                        <!-- <input type="textbox" class="form-control display-inline-block width-30-per"> -->
                    </div>
                    <v-btn color="primary" @click="validateSeven">Continue</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 8" step="8">
                   How did you work with the parent/caregiver?
                </v-stepper-step>
                <v-stepper-content step="8">
                    <div class="form-group">
                        <div>
                            <div class="v-align-top display-inline-block padding-5">
                                <input type="checkbox" v-model="session.SessionWorkObs"> Observed parent/caregiver and child during routines
                            </div>
                            <div class="v-align-top display-inline-block padding-5">
                                <input type="checkbox" v-model="session.SessionWorkTri"> Parent/caregiver tried activity, feedback exchanged
                            </div>
                        </div>
                        <div>
                            <div class="v-align-top display-inline-block padding-5">
                                <input type="checkbox" v-model="session.SessionWorkDem"> Demonstarted activity to parent/caregiver
                            </div>
                            <div class="v-align-top display-inline-block padding-5">
                                <input type="checkbox" v-model="session.SessionWorkRev"> Reviewed commnincation tool with parent/caregiver
                            </div>
                        </div>
                        <div >
                            <div class="v-align-top display-inline-block padding-5">
                                <input type="checkbox" v-model="session.SessionWorkOther"> Other 
                            </div>
                            <div class="v-align-top display-inline-block width-30-per" :class="errors.has('SessionWorkOtherDesc'+index)?'has-error':''">
                                <input type="textbox" class="form-control" v-model="session.SessionWorkOtherDesc"
                                :name="'SessionWorkOtherDesc'+index" data-vv-as="other" v-validate="session.SessionWorkOther?'required':''"  >
                                <span class="help-block font-red" v-if="errors.has('SessionWorkOtherDesc'+index)">
                                    <strong>{{ errors.first('SessionWorkOtherDesc'+index) }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <v-btn color="primary" @click="validateEight">Continue</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 9" step="9">
                    What strat/act. did you/parent/caregiver collbratively agree to do to support their child learning /dev. between visits?
                </v-stepper-step>

                <v-stepper-content step="9">
                    <div class="form-group" :class="errors.has('ProgressNotesStat'+index)?'has-error':''">
                        <textarea rows="3" class="form-control" :name="'ProgressNotesStat'+index" data-vv-as="ProgressNotesStat"
                        v-validate="'required'" v-model="session.ProgressNotesStat" >
                        </textarea>
                        <span class="help-block font-red" v-if="errors.has('ProgressNotesStat'+index)">
                            <strong>{{ errors.first('ProgressNotesStat'+index) }}</strong>
                        </span>
                    </div>
                    <v-btn color="primary" @click="validateNine">Continue</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="stepper.active > 10" step="10">
                    Therapist Signature
                </v-stepper-step>

                <v-stepper-content step="10">
                    <div class="form-group" v-if="stepper.active > 9">
                        <VueSignaturePad
                            class="signature"
                            :id="'therapist_signature'+index"
                            width="400px"
                            height="100px"
                            :ref="'therapist_signature'+index"
                        />
                    </div>
                    <v-btn color="primary" @click="validateTen">Continue</v-btn>
                    <v-btn flat @click="$refs['therapist_signature'+index].clearSignature();" >Reset</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>


                <v-stepper-step :complete="stepper.active > 11" step="11">
                    Parent/Caregiver Name/Signature
                </v-stepper-step>

                <v-stepper-content step="11">
                    <div class="form-group" :class="errors.has('relation'+index)?'has-error':''" >
                        <label>Relationship to Child</label>
                        <select class="form-control width-40-per" v-model="session.ParentCaregiverRelToChildId" :name="'relation'+index" v-validate="'required'" >
                            <option v-for="(relation,key) in relationList" :key="key" :value="relation.ChildRelationshipTypeId">{{relation.ChildRelationshipTypeDesc}}</option>
                        </select>
                        <span class="help-block font-red" v-if="errors.has('relation'+index)">
                            <strong>{{ errors.first('relation'+index) }}</strong>
                        </span>
                    </div>
                    <div class="form-group" :class="errors.has('ParentCaregiverSignatureName'+index)?'has-error':''">
                        <label>Name</label>
                        <input type="text" class="form-control width-40-per" v-model="session.ParentCaregiverSignatureName" :name="'ParentCaregiverSignatureName'+index" v-validate="'required'" >
                        <span class="help-block font-red" v-if="errors.has('ParentCaregiverSignatureName'+index)">
                            <strong>{{ errors.first('ParentCaregiverSignatureName'+index) }}</strong>
                        </span>
                    </div>
                    <div class="form-group" v-if="stepper.active > 10">
                        <VueSignaturePad
                        class="signature"
                            :id="'parent_signature'+index"
                            width="400px"
                            height="100px"
                            :ref="'parent_signature'+index"
                        />
                    </div>
                    <v-btn color="primary" @click="validateElevan">Continue</v-btn>
                    <v-btn flat @click="$refs['parent_signature'+index].clearSignature();" >Reset</v-btn>
                    <v-btn flat @click="stepper.active--" >Cancel</v-btn>
                </v-stepper-content>

            </v-stepper>
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
    data: () => ({
        isLoad:false,
        stepper:{
            'active':1.
        },
        sesseionDetail:{},
        
        outComesList: [],
        selectedOutComes:[],

    }),
    props:{
        session:{
            required:false,
        },
        user:{
            required:false,
        },
        index:{
            required:false,
        },
        cptCodeList:{
            required:false,
        },
        relationList:{
            required:false,
        },
    },
    methods: {
        validateFirst(){
            var _vm=this;
            this.$validator.validate('CPTCode1'+this.index).then((result) => { 
                _vm.$validator.validate('CPTCode2'+this.index).then((result2) => { if (result && result2){
                    _vm.session['StatusId']=1;
                    _vm.updateSession(_vm.stepper.active+1);
                }});
            });
        },
        validateSecond(){
            if(this.session.SessionPartOther){
                this.$validator.validate('SessionPartOtherDesc'+this.index).then((result) => { 
                    if (result){
                        this.updateSession(this.stepper.active+1);
                        return;
                    }
                    return;
                });
            }else{
                if(!(this.session.SessionPartChild || this.session.SessionPartParent)){
                    alert("Please select atleast one");
                    return;
                }
                this.updateSession(this.stepper.active+1);
            }
        },
        validateThree(){
            this.$validator.validate('ProgressNotes'+this.index).then((result) => { if (result){
                var nextStep=this.session.SessionTypeDesc=='Cancelled - Awaiting Make-Up'?10:this.stepper.active+1;
                this.updateSession(nextStep);
            }});},
        validateFour(){
            this.updateSession(this.stepper.active+1);
        },
        validateFive(){
            // this.$validator.validate('OutcomeLine1').then((result) => { if (result){this.stepper.active++}});
            if(this.selectedOutComes.length>0){
                this.session['OutcomeLine1']=this.selectedOutComes.join(',');
                this.updateSession(this.stepper.active+1);
            }else{
                alert("Select atleast one outcomes");
            }
        },
        validateSix(){
             if(this.session.SessionActOther){
                this.$validator.validate('SessionActOtherDesc'+this.index).then((result) => { 
                    if (result){
                        this.updateSession(this.stepper.active+1);
                        return;
                    }
                    return;
                });
            }else{
                if(!(this.session.SessionActADL || this.session.SessionActPlay || this.session.SessionActComm)){
                    alert("Please select atleast one");
                    return;
                }
                this.updateSession(this.stepper.active+1);
            }
        },
        validateSeven(){
            if(this.session.SessionStrOther){
                this.$validator.validate('SessionStrOtherDesc'+this.index).then((result) => { 
                    if (result){
                        this.updateSession(this.stepper.active+1);
                        return;
                    }
                    return;
                });
            }else{
                if(!(this.session.SessionStrMdl || this.session.SessionStrCues || this.session.SessionStrPrm
                ||this.session.SessionStrPos || this.session.SessionStrAst )){
                    alert("Please select atleast one");
                    return;
                }
                this.updateSession(this.stepper.active+1);
            }
        },
        validateEight(){
            if(this.session.SessionWorkOther){
                this.$validator.validate('SessionWorkOtherDesc'+this.index).then((result) => { 
                    if (result){
                        this.updateSession(this.stepper.active+1);
                        return;
                    }
                    return;
                });
            }else{
                if(!(this.session.SessionWorkObs || this.session.SessionWorkTri || this.session.SessionWorkDem
                || this.session.SessionWorkRev )){
                    alert("Please select atleast one");
                    return;
                }
                this.updateSession(this.stepper.active+1);
            }
        },
        validateNine(){
            this.$validator.validate('ProgressNotesStat'+this.index).then((result) => {
                if (result){
                    this.updateSession(this.stepper.active+1);
                }
            });},
        validateTen(){
            var  therapist_data=this.getSign("therapist_signature"+this.index);
            this.session['therapist_sign']=therapist_data;
            this.session['ProviderSignatureName']=this.user.ProviderName;
            this.session['ProviderSignatureDateTime']=new Date();
            this.session['ProviderSignatureFileName']=`child_sign_${this.session.SessionId}.png`;
            this.session['StatusId']=this.session.SessionTypeDesc=='Cancelled - Awaiting Make-Up'?3:1;
            this.updateSession(this.stepper.active+1);
        },
        validateElevan(){
            var _vm=this;
            this.$validator.validate('ParentCaregiverSignatureName'+this.index).then((result) => {
                this.$validator.validate('relation'+this.index).then((result2) => {
                    
                    if (result && result2){
                        var  parent_data=this.getSign("parent_signature"+this.index); 
                        this.session['parent_sign']=parent_data;
                        this.session['ParentCaregiverSignatureDateTime']=new Date();
                        this.session['ParentCaregiverSignatureFileName']=`parent_sign_${this.session.SessionId}.png`;
                        
                        this.session['UserId']=this.user.UserId;
                        this.session['StatusId']=3;
                        this.session['SignatureStatusId']=1;
                        this.updateSession(this.stepper.active+1);
                    }
                });
            });
        },
        getSign(ref){
            const { isEmpty, data } = this.$refs[ref].saveSignature();
            return data;
        },
        updateSession(nextStep){
            var _vm=this;
            this.$nextTick(() => {
                this.axios.post('/session/save',this.session)
                    .then(function(response){
                        if(response.data.status){
                            if(_vm.stepper.active==11 || _vm.session['StatusId']==3){
                                _vm.$dialog.alert("Session Notes Signed Successfully!!!")
                                _vm.$emit("updateList");
                            }
                            else{
                                _vm.stepper.active=nextStep;
                                if((nextStep==2) || (nextStep==10) ){
                                    _vm.$emit("getSession");
                                }
                            }
                        }
                        else{
                            alert("Something went wrong...")

                        }
                    }) 
            })
        },
        
        getOutComes(){
            var self = this;
            this.axios.get('/collections/out-comes?IFSPNumberNYEIS='+this.session.IFSPNumberNYEIS)
            .then(function(response){
                if(response.data.status){
                    self.outComesList=response.data.data;
                    if(self.session['OutcomeLine1'])
                    {
                        self.selectedOutComes=self.session['OutcomeLine1'].split(',').map(Number);
                    }
                }
            })
        },
        getSessionDetail(){
            var self = this;
            this.axios.get('/session/session-detail')
            .then(function(response){
                if(response.data.status){
                    self.sesseionDetail=response.data.data;
                }
            })
        },
    },
     mounted() {
        this.getOutComes();
        this.session.SessionTypeDesc=='Cancelled - Awaiting Make-Up'?this.$set(this.stepper,'active',3):this.stepper.active=1;
        setTimeout(() => {
            this.isLoad=true;
        }, 10);
    }
}
</script>
<style scoped>
.signature{
     border:  3px solid #4bc5e8;
  border-radius: 5px;
}
.v-menu__content{
    /* overflow-x: scroll !important; */
}
.v-select div{
    /* position: relative !important; */
}
.v-menu__content{
    /* position: relative !important; */
}
</style>
