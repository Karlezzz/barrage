<template>
<transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
            leave-active-class="animate__animated animate__fadeOutUp animate__faster">
  <div class="box_son" v-if="isShowHand">
        <div class="body">
            <input type="text" v-model="handMessage" placeholder="快点发言吧...">
        </div>
        <div class="foot">
            <button @click="closeHand">取消</button>
            <button @click="sendHandMessage">确认</button>
        </div>
    </div>
</transition>
    

</template>

<script>
export default {
    name:'Hand',
    props:['isShowHand'],
    data() {
        return {
            handMessage:''
        }
    },
    methods:{
        closeHand(){
            this.$emit('getCloseHand',false)
        },
        sendHandMessage(){
            this.$bus.$emit('getHandMessage',this.handMessage)
            this.closeHand()
            this.$emit('handedMessageClose',false)
        }
    }
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
    top: 10%;
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box_son .body input {
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

  .box_son .body input:focus {
    outline: none;
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
    
