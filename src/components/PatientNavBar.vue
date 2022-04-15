<template>
  <NavBar :user="user" v-on:tog="checkClickOutside($event)" :toggle="menuToggle" :menu="menuItems" />
</template>
<script>
export default {
  props: ["user", "toggle"],
  data(){
    return {
      menuItems: [{
        name: "Prescriptions",
        link: "/patient",
        icon: "assignment"
      }, {
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