<template>
  
</template>

<script>
export default {
  metaInfo: {
    title: "Logout"
  },
  mounted(){
    window.localStorage.clear();
    window.location.assign("/login");
  }
}
</script>