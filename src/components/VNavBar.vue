<template>
  <v-navigation-drawer color="#082032" fixed temporary v-on:input="$emit('tog', $event)" :value="toggle">
    <div id="userDetailSection" class="mt-10">
    <img src="/logo.png" id="user-icon">
    <p id="userName">{{user.fullName || user.name || "User"}}</p>
    <p id="userNumber">{{user.loginId || "9876-543-210"}}</p>
    <v-divider dark class="my-5" />
    </div>
    <v-list>
      <v-list-item v-for="m,i in menu" :key="i" :to="m.link" >
        <v-list-item-icon><v-icon class="list-color">{{m.icon}}</v-icon></v-list-item-icon>
        <v-list-item-title class="list-color">{{m.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["toggle", "user", "menu"]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

#nav-btn {
  position:absolute;
  left:0
}
#userDetailSection{
display:flex;
flex-direction: column;
justify-content: space-between;
align-content: center;
font-family: 'Montserrat', sans-serif;
}
#user-icon{
margin: auto;
height: 75px;
width: 75px;
background-color: #fff;
color: #fff;
border-radius: 50%;
}
#userName{
color: #C8C6C6;
font-size: 1.2rem;
font-family: 'Montserrat', sans-serif;
margin:10px auto;
font-weight: 500;
}
.list-color {
  color: #C8C6C6 !important;
}
#userNumber{
margin: 5px auto;
font-family: 'Montserrat', sans-serif;
color: #C8C6C6;
font-size: 1.08rem;
font-weight: 500;
cursor: pointer;
}
/* global */
#HeadTop{
min-height:180px;
height: 20vh;
width: 100vw;
background-image: linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);
clip-path: ellipse(100% 55% at 48% 44%);
text-align: center;
}
.topHeading
{
font-family: Montserrat, sans-serif;
font-size: 2rem;
font-weight: 600;
margin:auto;
/* margin-left: 15%; */
padding-top: 3%;
}
@media screen and (max-width: 1370px){
  .topHeading{margin-left:0}
}
@media screen and (max-width: 750px) {
  .topHeading
  {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 10%;
  }
}
</style>