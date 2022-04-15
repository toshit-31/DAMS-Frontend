<template>
  <NavBar :user="user" v-on:tog="checkClickOutside($event)" :toggle="menuToggle" :menu="menuItems" />
</template>
<script>
export default {
  props: ["user", "toggle"],
  data(){
    return {
      menuItems: [{
        name: "Appointments",
        link: "/doctor/appointments",
        icon: "today"
      }, {
        name: "Patients",
        link: "/doctor/patient/search",
        icon: "person"
      // }, {
      //   name: "Write Prescription",
      //   link: "/prescription/m/write",
      //   icon: "local_hospital"
      }, {
        name: "Medicines",
        link: "/doctor/meds",
        icon: "medication"
      },{
        name: "Logout",
        link: "/logout",
        icon: "logout"
      }]
    }
  },
  methods: {
    checkClickOutside(bool){
      if(bool == false) this.$emit("tog", false);
    }
  },
  computed: {
    menuToggle(){
      return this.$props.toggle;
    }
  }
}
</script>