<template>

  <transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster">
    <div class="box_son" v-if="isShowColor">
      <div class="body">
        <div class="back" @click="back">
          <img src="../images/上拉.png" alt="">
        </div>
        <div class="bgShow">
          <div class="bgItem" v-for="(item,index) in this.colorList" :key="index" :style="{'background':item}" @click="selectBG(index)" tabindex="3"></div>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
  export default {
    name: 'BGSelect',
    props: ['isShowColor'],
    data() {
      return {
        colorList: ['rgb(178,200,187)', 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
          'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)', 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
          'linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)', 'linear-gradient(to right, #868f96 0%, #596164 100%)',
          'linear-gradient(to right, #a8caba 0%, #5d4157 100%)', 'linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%)'
        ]
      }
    },
    methods: {
      back() {
        this.$emit('getCloseColor', false)
      },
      selectBG(index){
        this.global.setStaticBG(this.colorList[index]) 
        this.$parent.changeSelectBG()
        localStorage.setItem('BG',this.global.staticBG)
      },
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
    height: 30%;
    border-radius: 30px;
    background-color: #626262;
  }


  .box .body {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 80%;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .box_son .body .back {
    display: inline-block;
    position: absolute;
    top: 0%;
    left: 5%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffff;
  }

  .box_son .body .back img {
    width: 100%;
    height: 100%;
  }

  .box_son .body .bgShow {
    position: absolute;
    left: 5%;
    bottom: -2%;
    height: 85%;
    width: 90%;
    overflow: scroll;
    /* background-color: #fff; */

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .box_son .body .bgShow .bgItem {
    float: left;
    width: 23%;
    height: 40%;
    border-radius: 20%;
    margin: 10px 0 0 0;
    border: 1px solid white;
  }
  .box_son .body .bgShow .bgItem:focus{
    border: 3px solid rgb(2, 227, 2);
  }
</style>