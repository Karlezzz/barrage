<template>
    <!-- enter-active-class="animate_animated animate__fadeInBottomRight "
        leave-active-class="animate_animated animate__fadeOutBottomRight" -->
    <transition name="plus-icon">
        <div v-show="isShowFunction">
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

            <!-- <ChangeName :isShowChangeName="isShowChangeName" @getCloseChangeName="getCloseChangeName"
            @changedNameClose="changedNameClose"></ChangeName>
        <Hand :isShowHand="isShowHand" @getCloseHand="getCloseHand" @handedMessageClose="handedMessageClose"></Hand>
        <Score :isShowScore="isShowScore" @getCloseScore="getCloseScore" @scoredClose="scoredClose"></Score>
        <Advice :isShowAdvice="isShowAdvice" @getCloseAdvice="getCloseAdvice" @advicedClose="advicedClose"></Advice> -->

        </div>
    </transition>

</template>

<script>
    import 'animate.css';
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

.plus-icon-enter-active{
    transition: opacity 1s;
  }
  .plus-icon-enter{
     opacity: 0;
  }
  .plus-icon-leave-active{
    transition: opacity 1s;
  }
  .plus-icon-leave-to{
    opacity: 0;
  }


    .box {
        position: absolute;
        width: 100%;
        height: 50%;
        background: rgb(2, 85, 123);
        bottom: 0;
        right: 0;
        /* border-radius: 50%; */
        border-top-left-radius: 100%;
        border: 2px solid rgba(202, 202, 202, 0.164);
        box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.459);
        z-index: 9;

    }

    .box .head {
        display: inline-block;
        position: absolute;
        bottom: 7%;
        right: 5%;
        z-index: 999;
    }

    .box .head .close {
        display: block;
        width: 35px;
        height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.453);
        border-radius: 50%;
        z-index: 999;
    }

    .box .head .close img {
        width: 100%;
        height: 100%;
    }

    .box .body {
        background-color: #918f8f7f;
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        bottom: 0;
        right: 0;
        border-top-left-radius: 100%;
        z-index: 8;
    }

    .body .card {
        position: absolute;
        width: 50px;
        height: 50px;
    }

    .body .card:nth-child(1) {
        bottom: 75%;
        right: 10%;

    }

    .body .card:nth-child(1) .img {
        bottom: 75%;
        right: 10%;
        background-color: rgba(240, 128, 128, 0.792);
    }

    .body .card:nth-child(2) {
        bottom: 60%;
        right: 35%;
    }

    .body .card:nth-child(2) .img {
        background-color: rgba(173, 216, 230, 0.792);
    }

    .body .card:nth-child(3) {
        bottom: 40%;
        right: 55%;
    }

    .body .card:nth-child(3) .img {
        background-color: rgba(255, 160, 122, 0.792);
    }

    .body .card:nth-child(4) {
        bottom: 10%;
        right: 70%;
    }

    .body .card:nth-child(4) .img {
        background-color: rgba(144, 238, 144, 0.792);
    }

    .body .card .img {
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
        text-align: center;
        color: white;
    }
</style>