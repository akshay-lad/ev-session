<template>
    <div>
      <custHeader @change="changeDate"></custHeader>
      <add-session :session-date="sessionDate" v-if="selectedTab=='addNewSession'"></add-session>
      <session-notes :session-date="sessionDate" v-else></session-notes>
	</div>
</template>
<script>
import custHeader from './partials/header.vue';
import addSession from './partials/add-session.vue';
import sessionNotes from './partials/session-note.vue';
export default {
	data: () => ({
	}),
	components: {
		custHeader,
		addSession,sessionNotes
	},
	props: {
	},
	computed: {
		selectedTab(){
			return this.$store.state.selectedTab;
		},
		sessionDate(){
			return this.$store.state.sessionDate;
		}
		
	},
	methods: {
		changeDate() {
		
		}
	},
	mounted() {
		var date = new Date();
		var month = date.getMonth() + 1;
		month < 10 ? (month = "0" + month) : false;
		var day = date.getDate();
		day < 10 ? (day = "0" + day) : false;
		this.$store.state.sessionDate=`${date.getFullYear()}-${month}-${day}`;// month + "-" + day + "-" + date.getFullYear();
	}
};
</script>
<style>
.v-navigation-drawer {
  width: 400px !important;
}
.custom-remove {
  color: red;
}
.custom-remove-drawer{
  font-size: 20px;
}
.custom-btn {
  margin-left: 20px;
  margin-top: 10px;
}
td,
th {
  padding: 2px 5px;
}
.right-toggle {
  font-size: 30px;
  display: inline-block;
  vertical-align: middle;
}
.border-bottom {
  border-bottom: 1px solid #737373;
}
.display-inline {
  display: inline-block;
}
.padding-bottom-5 {
  padding-bottom: 5px;
}
.main-container {
  padding: 10px;
  padding-top: 70px;
}
.light-gray {
  background: lightgrey;
  padding: 5px;
}
.custom-fieldset {
  display: block;
  -webkit-margin-start: 2px;
  -webkit-margin-end: 2px;
  -webkit-padding-before: 0.35em;
  -webkit-padding-start: 0.75em;
  -webkit-padding-end: 0.75em;
  -webkit-padding-after: 0.625em;
  min-width: -webkit-min-content;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  position: relative;
  margin-top: 10px;
}
.custom-legend {
  display: block;
  -webkit-padding-start: 2px;
  -webkit-padding-end: 2px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;

  position: absolute;
  top: -13px;
  left: 30px;
  background: #fafafa;
  padding: 0 10px;
}
.vdp-datepicker .form-control{
background: #ffffff !important;
}

/* .vdp-datepicker__calendar-button {
  float: right;
  cursor: default;
}
.vdp-datepicker__calendar-button > i {
  cursor: default;
}
.custom-calendar > .vdp-datepicker {
  border: 1px solid;
  border-radius: 40px;
  padding: 5px 10px;
  cursor: default;
}
.date-input {
  width: 90px;
  cursor: default;
}
.date-input:focus {
  cursor: default;
  border: none;
  outline: none;
} */
.v-autocomplete {
  width: 100px;
}
.v-list__tile {
  height: 30px;
  font-size: 14px;
}
.right-drawer{
  font-size:20px;
}
@media only screen and (max-width: 758px) {
.right-drawer{
  font-size:18px;
}
.custom-remove-drawer{
  font-size: 18px;
}
  .v-toolbar__content {
    display: block;
  }
  body,
  .main-container,
  .v-input,
  .v-input .v-label,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-size: 12px;
  }
  .v-list__tile__action, .v-list__tile__avatar{
	  min-width: 30px !important;
  }
  .v-list__tile {
    height: 24px;
    font-size: 12px !important;
  }
  .v-autocomplete {
    width: 78px;
  }
}
.v-input{
  margin-top: 0;
}
.v-label{
  margin-bottom: 0;
    font-size: 13px;
    font-weight: unset;
    color: #000 !important;
    margin-top: 2px;
}
.chk-div:hover{
  background: #eeeeee;
}
.v-messages{
  min-height: 0;
}
.header-label {
  background-color: #fafafa;
  border: 1px solid;
  border-radius: 25px;
  padding: 10px;
  height: 100%;
  width: 100%;
  font-size: 11px;
}
a:hover, a:focus{
     text-decoration: none;
}
</style>
