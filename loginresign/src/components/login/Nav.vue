<template>
    <div class="nav">
      <img :src='imgUrl' alt="">
    </div>
</template>

<script>
// import imgUrl from "../assets/logo.png"
export default {
    name:"Nav",
    data(){
        return{
            imgUrl:require('../../assets/logo.png')
        }
    }
}
</script>

<style>
.nav{
    width:100%;
    /* height:68px; */
    position: relative;
    text-align: left;
}
.nav>img{
    margin:10px 100px;
}
</style>
