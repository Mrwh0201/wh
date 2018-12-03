<template>
    <div class="nav">
      <img :src='imgUrl' alt="">
    </div>
</template>

<script>
export default {
    name:"Nav",
    data(){
        return{
            imgUrl:require('../assets/logo.png')
        }
    }
}
</script>

<style>
.nav{
    width:100%;
    position: relative;
    text-align: left;
}
.nav>img{
    margin:10px 100px;
}
</style>
