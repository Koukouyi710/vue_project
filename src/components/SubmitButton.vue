<!--提交按钮-->
<template>
  <!--<button style="letter-spacing:10px;">登录</button>-->
  <input type="button" style="letter-spacing:10px;">
</template>

<script>
    export default {
        name: "SubmitButton"
    }
</script>

<style scoped>
  input{
    width: 13rem;
    font-size: 1rem;
    background: -webkit-linear-gradient(left, #000099, #2154FA);
    background: -o-linear-gradient(right, #000099, #2154FA);
    background: -moz-linear-gradient(right, #000099, #2154FA);
    background: linear-gradient(to right, #000099 , #2154FA);
    font-weight: bold;
    color: aliceblue;
    filter: brightness(1.4);
    border: 1px solid #ccc;
    padding: 0.5rem 0;
    text-align: center;
  }
  input:focus{
    border-color: #66afe9;
    outline: 0;
  }
</style>
