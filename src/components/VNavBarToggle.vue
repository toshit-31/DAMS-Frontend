<template>
  <v-app-bar-nav-icon @click="toggleMenu()"></v-app-bar-nav-icon>
</template>

<script>
export default {
  data(){
    return {
      openState: false
    }
  },
  methods: {
    toggleMenu(){
      this.$emit("open");
    }
  }
}
</script>