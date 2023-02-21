<template>
  <div class="bc" v-if="isShowScore">
    <div class="box">
        <div class="head">
            <div class="title">阶段打分</div>
            <div class="close" @click="closeScore"><img src="../../images/close.png" alt=""></div>
        </div>
        <div class="body">
            <div class="star">
                <ul>
                    <li v-for="(i,index) in count" :key="index" @click="grade(index)"
                    :class="index<=choseStar?'maxStar':'noStar'">
                        
                    </li>
                </ul>
            </div>
        </div>
        <div class="foot">
            <button @click="closeScore">取消</button>
            <button @click="sendScore">确认</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Score',
    props:['isShowScore'],
    data() {
        return {
            count:5,
            score:null,
            choseStar:null
        }
    },
    methods: {
        closeScore(){
            this.$emit('getCloseScore',false)
        },
        grade(index){
            this.choseStar=index
            this.score=index+1
        },
        sendScore(){
            this.closeScore()
            this.$emit('scoredClose',false)
        }
        
    },
}
</script>

<style scoped>
    .bc {
    position: absolute;
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .box {
    width: 60%;
    height: 20%;
    border-radius: 6px;
    background: rgba(180, 226, 248, 0.593);
    border: 2px solid rgba(202, 202, 202, 0.164);
    box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.459);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .box .head {
    flex: 0.1;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .box .head .title {
    display: inline-block;
    height: 30px;
    margin-top: 10px;
    margin-left: 5px;
    color: grey;
    font-size: 110%;
    letter-spacing: 2px;
  }

  .box .head .close {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 5px 5px 0 0;
  }

  .box .head .close img {
    width: 100%;
    height: 100%;
  }

  .box .body {
    flex: 0.5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .body input {
    border: none;
    width: 90%;
    height: 60%;
    border-bottom: 2px solid rgba(70, 70, 70, 0.637);
    font-size: 90%;
    font-weight: 700;
    padding-left: 10px;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    letter-spacing: 2px;
  }

  .box .body input:focus {
    outline: none;
  }

  .box .foot {
    flex: 0.4;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .box .foot button {
    width: 30%;
    height: 70%;
    border: none;
    margin-left: 10px;
    border-radius: 20%;
    color: white;
    letter-spacing: 2px;
    font-size: 50%;
    font-weight: 700;
  }

  .box .foot button:nth-child(1) {
    background-color: rgb(124, 223, 248);
  }

  .box .foot button:nth-child(2) {
    background-color: rgb(250, 209, 133);
  }

  .star ul{
    width: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content:space-around;
    margin-left: -2px;
  }
  .star ul li{
    width: 40px;
    height: 40px;
    margin-left: 4px;
    background-size: 40px 40px;
  }

  .maxStar{
    background: url(../../images/满星.png) no-repeat;
    background-size: 40px 40px;
  }
  .noStar{
    background: url(../../images/空星.png) no-repeat;
    background-size: 40px 40px;
  }
  
</style>