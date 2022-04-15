<template>
  <div id="nav-overlay">
    <v-btn tile x-small elevation="0" dark color="#082032" class="nb-close py-4 open" @click="toggle()"><v-icon>{{icon}}</v-icon></v-btn>
  <div id="navbar" class="sidenav">
    <!-- <div class="toggle-icon">
      <v-btn tile x-small elevation="0" dark color="#082032" class="nb-close py-4" @click="toggle()"><v-icon>{{icon}}</v-icon></v-btn>
    </div> -->
    <div id="userDetailSection">
    <img src="/logo.png" id="user-icon">
    <p class="pharmacyDetails">{{user.fullName}}</p>
    <p id="userNumber">{{user.loginId}}</p>
    
    <v-divider dark class="my-5" />

    </div>
    <!-- <hr class="bottomLineNav"> -->
    <div class="d-flex flex-column justify-space-around">
      <div class="menuItems d-flex justify-start py-5 pl-8" v-for="o in $props.menu" :key="o.name">
        <i :class="'fas fa-'+o.icon+' icons'"></i><a :to="o.link">{{o.name}}</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ["user", "menu"],
  data(){
    return {
      openState: true,
      icon: "clear"
    }
  },
  mounted(){
    const self = this;
    window.onresize = function(){
      self.openState = true;
      self.toggle();
      // window.document.getElementById("navbar").style.left = "-"+window.getComputedStyle(window.document.getElementById("navbar")).getPropertyValue("width");
    }
    window.ondeviceorientation = window.onresize
  },
  methods: {
    toggle(){
      if(this.openState == true){
        window.document.querySelector(".nb-close").classList.add("close");
        window.document.querySelector(".nb-close").classList.remove("open");
        window.document.getElementById("nav-overlay").style.left = "-100%";
        this.icon = "menu"
        this.openState = false;
      } else {
        window.document.querySelector(".nb-close").classList.add("open");
        window.document.querySelector(".nb-close").classList.remove("close");
        window.document.getElementById("nav-overlay").style.left = "0";
        this.icon = "clear"
        this.openState = true;
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap');

#nav-overlay{
width:100%;
height:100%;
position: fixed;
left:0;
top:0;
background-color:#ffffffcc;
z-index:99;
transition:0.2s;
}

.sidenav {
height: 100%;
width: 23%;
background-color: #082032; 
overflow-x: visible;
transition: 0.5s;
padding-top: 60px;
}
.toggle-icon {
  visibility:hidden;
}
.icons{
display: inline;
color: #818181;
font-size: 1.5rem;
transition:0.2s;
}
.nb-close {
  visibility:hidden;
}
.sidenav a {
/* padding: 8px 8px 8px 32px; */
display:inline-block;
text-decoration: none;
font-size: min(18px, max(14px, 1.2vw));
color: #dbdbdb  !important;
display: inline;
transition: 0.2s;
font-family: 'Montserrat', sans-serif;
margin-left: 1vw;
}

#quote{
margin-top: 10%;
width: 60%;
margin-left: 15%;

}
.menuItems{
  width:100%;
}
.menuItems:hover {
color:white;
background-color: rgba(255, 255, 255, 0.05);
}
.sidNavElements{
margin-top: 10%;
width: 60%;
margin-left: 20%;
}
.sidenav .menuItems:hover a, .sidenav .menuItems:hover .icons {
color: #f1f1f1;
}
.sidenav .closebtn {
position: absolute;
top: 0;
right: 25px;
font-size: 36px;
margin-left: 50px;
}
#user-icon{
margin: auto;
/* margin-left: 21%; */
height: 75px;
width: 75px;
background-color: #fff;
color: #fff;
border-radius: 50%;
}
.pharmacyDetails{
color: #C8C6C6;
font-size: 1.2rem;
font-family: 'Montserrat', sans-serif;
/* margin-left: 9%; */
margin:10px auto;
font-weight: 500;
}
#userDetailSection{
/* margin-left: 15%; */
display:flex;
flex-direction: column;
justify-content: space-between;
align-content: center;
font-family: 'Montserrat', sans-serif;
}
#userNumber{
/* margin-left: 18%; */
margin: 5px auto;
font-family: 'Montserrat', sans-serif;
color: #C8C6C6;
font-size: 1.08rem;
/* font-size: 1vw; */
font-weight: 500;
cursor: pointer;
/* margin-top: 7%; */
}

#sideNavebar{
display: none;
}

#navbarClose{
display: none;
} 
#HeadTop{
height: 20vh;
width: 100vw;
background-image: linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);
clip-path: ellipse(100% 55% at 48% 44%);
text-align: center;
}
.topHeading
{
font-family: 'Montserrat', sans-serif;
font-size: 2rem;
font-weight: 600;
margin-left: 15%;
padding-top: 3%;
}
@media screen and (max-width: 1370px){
  .nb-close {
    position:absolute;
    visibility:visible;
    top:px;
    transition:0.2s;
  }
  .nb-close.open {
    right:calc(40% - 40px);
  }
  .nb-close.close {
    right:-40px;
  }
  .sidenav {width:40%}
  .topHeading{margin-left:0}
}
@media screen and (max-width: 750px) {
.sidenav {padding-top: 15px;}
.sidenav a {font-size: 18px;}
#userDetailSection{
/* margin-left: 15%; */
margin-top: 10%;
font-family: 'Montserrat', sans-serif;
}

#userNumber{
/* font-size: 2vh; */
font-size: 1rem;
}

.prescription_Table{

padding-right: 10%;
margin-right: 10%;
height: 250px;
width: 250px;
overflow:scroll;
margin-left: 8%;
margin-top: 5%;
}

#sideNavebar{
display: inline;
color:#aa81f5;
}
#navbarClose{
display: inline;
} 

.sidenav {
width: 70%;
}
.sidenav a{
font-size: 0.9rem;
margin-left:2vw;
}

.topHeading
{
font-family: 'Montserrat', sans-serif;
font-size: 1.5rem;
font-weight: 600;
margin-left: 0%;
margin-right: 2%;
padding-top: 10%;
}
.pharmacyDetails{
font-size: 1.2rem;
/* margin-right: 3%; */
}
.prescription_Table {
  margin:10px auto;
  width:90%;
}
}
</style>