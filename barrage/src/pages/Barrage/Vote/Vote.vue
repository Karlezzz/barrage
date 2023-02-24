<template>
    <transition enter-active-class="animate__animated animate__slideInDown animate__faster"
        leave-active-class="animate__animated animate__slideOutUp animate__faster">
        <div class="box_son" v-if="isShowVote">
            <div class="body">
                <div class="back" @click="closeVote">
                    <img src="../images/back.png" alt="">
                </div>
                <div class="voteTopic">今天几点下课</div>
                <div class="voteSelectArea">
                        <div class="voteSelect" v-if="!isVoted" @click="selectThisVote">
                        <div class="voteSelectItem">选项一</div>
                        <div class="voteSelectItem">选项二</div>
                        <div class="voteSelectItem">选项三</div>
                        <div class="voteSelectItem">选项四</div>
                    </div>
                    <transition enter-active-class="animate__animated animate__flipInX "
                        leave-active-class="animate__animated animate__fadeOut animate__faster">
                        <div class="voteResult" v-if="isVoted">
                            <div class="voteSelected">
                                <div class="voteSelectedItem">选项一</div>
                                <span class="resultNumber">10%</span>
                            </div>
                            <div class="voteSelected">
                                <div class="voteSelectedItem">选项二</div>
                                <span class="resultNumber">30%</span>
                            </div>
                            <div class="voteSelected">
                                <div class="voteSelectedItem">选项三</div>
                                <span class="resultNumber">40%</span>
                            </div>
                            <div class="voteSelected">
                                <div class="voteSelectedItem">选项四</div>
                                <span class="resultNumber">20%</span>
                            </div>
                        </div>
                    </transition>


                </div>
            </div>
        </div>
    </transition>


</template>

<script>
    export default {
        props: ['isShowVote'],
        data() {
            return {
                isVoted: false
            }
        },
        methods: {
            closeVote() {
                this.$emit('getCloseVote', false)
            },
            selectThisVote() {
                this.isVoted = true
            },
            recallVote(){
                this.isVoted=false
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
        min-height: 20%;
        border-radius: 30px;
    }



    .box_son .body {
        width: 100%;
        margin-bottom: 5%;
    }

    .box_son .body .back {
        display: inline-block;
        position: absolute;
        top: 5%;
        left: 10%;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ffffff;
    }

    .box_son .body .back img {
        width: 100%;
        height: 100%;
    }

    .box_son .body .voteTopic {
        margin-top: 5%;
        width: 100%;
        text-align: center;
        font-size: 100%;
        letter-spacing: 2px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .voteSelectArea {
        margin-top: 2%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .voteSelect {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin: 2% 0 5% 0;
    }

    .voteSelectItem {
        width: 80%;
        height: 20%;
        display: flex;
        align-items: center;
        margin-top: 4%;
        border: 1px solid #8686866b;
        border-radius: 10px;
        box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
        background-color: #00000059;

        padding: 2% 0 2% 5%;
        color: white;
    }

    .voteResult {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin: 2% 0 5% 10%;
    }

    .voteSelected {
        width: 90%;
    }

    .voteSelectedItem {
        display: inline-block;
        width: 70%;
        height: 20%;
        margin-top: 4%;
        border: 1px solid #8686866b;
        border-radius: 10px;
        box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
        background-color: #00000059;
        padding: 2% 0 2% 5%;
        color: white;
    }

    .voteSelected span {
        display: inline-block;
        margin-left: 10px;
        color: white;
    }
</style>