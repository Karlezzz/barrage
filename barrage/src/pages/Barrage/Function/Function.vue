<template>
    <div>
        <transition enter-active-class="animate__animated animate__fadeInBottomRight animate_slow"
            leave-active-class="animate__animated animate__fadeOutBottomRight">
            <div class="box" v-if="isShowFunction"
                :style="{'background':this.global.getIsSun()?'rgba(0, 0, 0, 0.478)':'linear-gradient(to right, #62605d 0%, #304352 100%)'}">
                <div class="head">
                    <div class="close" @click="closeFunction">
                        <img src="../images/close.png" alt="">
                    </div>
                </div>
                <div class="body">
                    <div class="card" @click="showSonFunction(1)">
                        <div class="img">
                            <img src="../images/修改 (1).png" alt="">
                        </div>
                        <div class="word">修改名称</div>
                    </div>
                    <div class="card" @click="showSonFunction(2)">
                        <div class="img">
                            <img src="../images/举手（1）.png" alt="">
                        </div>
                        <div class="word">举手弹幕</div>
                    </div>
                    <div class="card" @click="showSonFunction(3)">
                        <div class="img">

                            <img src="../images/考核打分.png" alt="">
                        </div>
                        <div class="word">阶段打分</div>
                    </div>
                    <div class="card" @click="showSonFunction(4)">
                        <div class="img">
                            <img src="../images/评价 (1).png" alt="">
                        </div>
                        <div class="word">评价建议</div>
                    </div>
                    <div class="card" @click="showSonFunction(5)">
                        <div class="img">
                            <img src="../images/投票.png" alt="">
                        </div>
                        <div class="word">历史投票</div>
                    </div>
                </div>
            </div>
        </transition>
        <ChangeName :isShowChangeName="sonFunctionState.isShowChangeName" @getCloseChangeName="getCloseChangeName"
            @changedNameClose="changedNameClose"></ChangeName>
        <Hand :isShowHand="sonFunctionState.isShowHand" @getCloseHand="getCloseHand"
            @handedMessageClose="handedMessageClose"></Hand>
        <Score :isShowScore="sonFunctionState.isShowScore" @getCloseScore="getCloseScore" @scoredClose="scoredClose">
        </Score>
        <Advice :isShowAdvice="sonFunctionState.isShowAdvice" @getCloseAdvice="getCloseAdvice"
            @advicedClose="advicedClose"></Advice>
        <Vote :isShowVote="sonFunctionState.isShowVote" @getCloseVote="getCloseVote"></Vote>

    </div>
</template>

<script>
    import 'animate.css';
    import Advice from './Advice/Advice.vue'
    import Hand from './Hand/Hand.vue'
    import ChangeName from './ChangeName/ChangeName.vue'
    import Score from './Score/Score.vue'
    import Vote from './Vote/Vote.vue'
    export default {
        name: 'Function',
        props: [
            'isShowFunction'
        ],
        data() {
            return {
                sonFunctionState: {
                    isShowChangeName: false, //1
                    isShowHand: false, //2
                    isShowScore: false, //3
                    isShowAdvice: false, //4
                    isShowVote: false, //5
                }

            }
        },
        components: {
            ChangeName,
            Hand,
            Score,
            Advice,
            Vote
        },
        methods: {
            showSonFunction(fun) {
                //排他，防止多个子功能界面同时出现
                //1==changeName 2==hand 3==score 4==advice
                for (let i in this.sonFunctionState) {
                    this.sonFunctionState[i] = false
                }
                if (fun == 1) this.sonFunctionState.isShowChangeName = true
                if (fun == 2) this.sonFunctionState.isShowHand = true
                if (fun == 3) this.sonFunctionState.isShowScore = true
                if (fun == 4) this.sonFunctionState.isShowAdvice = true
                if (fun == 5) this.sonFunctionState.isShowVote = true
            },
            closeFunction() {
                //关闭Function组件界面
                this.$emit('getCloseFunction', false)
                for (let i in this.sonFunctionState) {
                    this.sonFunctionState[i] = false
                }
            },
            getCloseChangeName(value) {
                this.sonFunctionState.isShowChangeName = false
            },
            changedNameClose() {
                this.closeFunction()
            },
            getCloseHand(value) {
                this.sonFunctionState.isShowHand = false
            },
            handedMessageClose() {
                this.closeFunction()
            },
            getCloseScore(value) {
                this.sonFunctionState.isShowScore = false
            },
            scoredClose() {
                this.closeFunction()
            },
            getCloseAdvice() {
                this.sonFunctionState.isShowAdvice = false
            },
            advicedClose() {
                this.closeFunction()
            },
            getCloseVote() {
                this.sonFunctionState.isShowVote = false
            }

        },
    }
</script>

<style scoped>
    .box {
        position: absolute;
        width: 100%;
        height: 50%;
        bottom: 0;
        right: 0;
        border-top-left-radius: 100%;
        z-index: 9;
    }

    .box .head {
        display: inline-block;
        position: absolute;
        bottom: 5%;
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

    .body .card:nth-child(5) {
        bottom: 45%;
        right: 15%;
    }

    .body .card:nth-child(5) .img {
        background-color: rgba(32, 178, 171, 0.792);
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