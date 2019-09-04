<!--文本框-->
<template>
  <input type="password" :value="currentValue" @input="handleInput"/>
</template>

<script>
    export default {
      name: "PassWordBox",
      computed:{
        currentValue:function () {
          return this.value
        }
      },
      props: ['value'], //接收一个 value prop
      methods: {
        handleInput(event) {
          var value = event.target.value;
          this.$emit('input', value); //触发 input 事件，并传入新值
        }
      }
    }
</script>

<style scoped>
  input{
    width: 12rem;
    border: 0.1rem solid #ccc;
    padding: 0.5rem 0;
    border-radius: 0.2rem;
    padding-left:0.4rem;
    -webkit-box-shadow: inset 0 0.1rem 0.1rem rgba(0,0,0,.075);
    box-shadow: inset 0 0.1rem 0.1rem rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
  }
  input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 0.1rem 0.1rem rgba(0,0,0,.075),0 0 0.8rem rgba(102,175,233,.6);
    box-shadow: inset 0 0.1rem 0.1rem rgba(0,0,0,.075),0 0 0.8rem rgba(102,175,233,.6)
  }
</style>
