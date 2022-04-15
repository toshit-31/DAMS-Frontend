<template>
  <NavBar :user="user" :menu="menuItems" />
</template>

<script>
export default {
  props: ["user"],
  data(){
    return {
      menuItems: [{
        name: "Open to Quote",
        link: "quotable",
        icon: "prescription"
      }, {
        name: "Pending Quotes",
        link: "quoted",
        icon: "tasks"
      }, {
        name: "Quotes Confirmed",
        link: "quotes-confirmed",
        icon: "clipboard-check"
      }, {
        name: "Quotes Completed",
        link: "quotes-completed",
        icon: "check"
      }, {
        name: "Inventory",
        link: "inventory",
        icon: "boxes"
      }],
    }
  }
}
</script>