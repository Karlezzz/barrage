<template>
    <div class="bc" v-if="isShowFunction">
        <div class="box" v-if="showFunction">
            <div class="head">
                <div class="close" @click="closeFunction">
                    <img src="../images/close.png" alt="">
                </div>
            </div>
            <div class="body">
                <div class="card" @click="isShowChangeName=true">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card" @click="isShowHand=true">
                    <div class="img">
                        <img src="../images/举手.png" alt="">
                    </div>
                    <div class="word">举手弹幕</div>
                </div>
                <div class="card" @click="isShowScore=true">
                    <div class="img">
                        
                        <img src="../images/考核打分.png" alt="">
                    </div>
                    <div class="word">阶段打分</div>
                </div>
                <div class="card" @click="isShowAdvice=true">
                    <div class="img">
                        <img src="../images/评价.png" alt="">
                    </div>
                    <div class="word">评价建议</div>
                </div>
            </div>
        </div>

        <ChangeName :isShowChangeName="isShowChangeName" @getCloseChangeName="getCloseChangeName"
            @changedNameClose="changedNameClose"></ChangeName>
        <Hand :isShowHand="isShowHand" @getCloseHand="getCloseHand" @handedMessageClose="handedMessageClose"></Hand>
        <Score :isShowScore="isShowScore" @getCloseScore="getCloseScore" @scoredClose="scoredClose"></Score>
        <Advice :isShowAdvice="isShowAdvice" @getCloseAdvice="getCloseAdvice" @advicedClose="advicedClose"></Advice>

    </div>
</template>

<script>
    import Advice from './Advice/Advice.vue'
    import Hand from './Hand/Hand.vue'
    import ChangeName from './ChangeName/ChangeName.vue'
    import Score from './Score/Score.vue'
    export default {
        name: 'Function',
        props: [
            'isShowFunction'
        ],
        data() {
            return {
                isShowChangeName: false,
                isShowHand: false,
                isShowScore: false,
                isShowAdvice: false
            }
        },
        components: {
            ChangeName,
            Hand,
            Score,
            Advice
        },
        methods: {
            closeFunction() {
                this.$emit('getCloseFunction', false)
            },
            getCloseChangeName(value) {
                this.isShowChangeName = false
            },
            changedNameClose() {
                this.closeFunction()
            },
            getCloseHand(value) {
                this.isShowHand = false
            },
            handedMessageClose() {
                this.closeFunction()
            },
            getCloseScore(value) {
                this.isShowScore = false
            },
            scoredClose() {
                this.closeFunction()
            },
            getCloseAdvice() {
                this.isShowAdvice = false
            },
            advicedClose() {
                this.closeFunction()
            }
        },
        computed: {
            showFunction() {
                if (this.isShowFunction == true) {
                    if (this.isShowChangeName == false && this.isShowHand == false && this.isShowScore == false && this
                        .isShowAdvice == false) return true
                    else if (this.isShowChangeName == true || this.isShowHand == true || this.isShowScore == true ||
                        this.isShowAdvice == true) return false
                }
            }
        }
    }
</script>

<style scoped>
    .bc {
        position: absolute;
        /* display: flex; */
        width: 1000px;
        height: 1000px;
        /* border-radius: 50%; */
        justify-content: center;
        align-items: center;
        /* overflow: hidden; */
    }

    .box {
        position: absolute;
        width: 2000px;
        height: 1000px;
        background: rgba(3, 59, 85, 0.739);
        top: 40%;
        left: 10%;
        border-radius: 1000px 1000px 0 0;
        border: 2px solid rgba(202, 202, 202, 0.164);
        box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.459);
        z-index: 9;
        
    }

    .box .head {
        display: inline-block;
        position: fixed;
        bottom: 5%;
        right: 7%;
    }

    .box .head .close {
        display: block;
        width: 35px;
        height: 35px;
        border: 1px solid white;
        border-radius: 50%;
    }

    .box .head .close img {
        width: 100%;
        height: 100%;
    }

    .box .body {
        display: inline-block;
        background-color: #918f8f7f;
        width: 600px;
        height: 400px;
        position: fixed;
        overflow: hidden;
        bottom: 0%;
        right: 0;
    }

    .body .card {
        position: absolute;
        width: 28%;
        height: 28%;
    }
    .body .card:nth-child(1){
        top: 35%;
        right: -5%;
    }
    .body .card:nth-child(2){
        bottom: 15%;
        right: 10%;
    }
    .body .card:nth-child(3){
        bottom: 5%;
        right: 15%;
    }
    .body .card:nth-child(4){
        bottom: 1%;
        right: 20%;
    }

    .body .card .img {
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 40%;
    }

    .body .card .img img {
        width: 100%;
        height: 100%;
    }

    .body .card .word {
        font-size: 70%;
        margin-top: 5px;
    }
</style>