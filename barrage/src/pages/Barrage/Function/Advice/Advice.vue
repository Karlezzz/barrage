<template>
  <transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster">
    <div class="box_son" v-show="isShowAdvice"
      :style="{'background':this.global.getIsSun()?'rgba(0, 0, 0, 0.478)':'linear-gradient(to right, #62605d 0%, #304352 100%)'}">
      <div class="body">
        <textarea name="" id="" cols="20" rows="3" v-model="advice" placeholder="留下宝贵建议..."></textarea>
      </div>
      <div class="foot">
        <button @click="closeAdvice">取消</button>
        <button @click="sendAdvice">提交</button>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Advice',
    props: ['isShowAdvice'],
    data() {
      return {
        advice: ''
      }
    },
    methods: {
      closeAdvice() {
        this.$emit('getCloseAdvice', false)
      },
      sendAdvice() {
        this.closeAdvice()
        //发送数据
        this.$emit('advicedClose', false)
      }
    },
  }
</script>

<style scoped>
  .box_son {
    position: absolute;
    top: 0;
    left: 5%;
    background-color: rgba(0, 0, 0, 0.478);
    width: 90%;
    height: 20%;
    border-radius: 30px;
  }


  .box_son .body {
    position: absolute;
    top: 15%;
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box_son .body textarea {
    border: none;
    width: 90%;
    height: 60%;
    border-bottom: 2px solid rgb(255, 255, 255);
    font-size: 90%;
    font-weight: 700;
    padding-left: 10px;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    letter-spacing: 2px;
  }

  .box_son .body textarea:focus {
    outline: none;
  }

  .box_son .body textarea::placeholder {
    color: white;
  }

  .box_son .foot {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .box_son .foot button {
    width: 30%;
    height: 70%;
    border-radius: 20px;
    border: none;
    color: white;
    font-size: 100%;
    letter-spacing: 5px;
    text-align: center;
  }

  .box_son .foot button:nth-child(1) {
    background-color: lightcoral;
  }

  .box_son .foot button:nth-child(2) {
    background-color: lightblue;
  }
</style>