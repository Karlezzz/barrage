<template>
    <div class="bc" v-if="isShowVote">
        <div class="box">
            <div class="head">
                <div class="title">投票</div>
                <div class="close" @click="closeVote">
                    <img src="../images/close.png" alt="">
                </div>
            </div>
            <div class="body">
                <div class="voteTopic">投票的主题</div>
                <div class="voteSelectArea">
                    <div class="voteSelect" v-if="!isVoted">
                        <div class="voteSelectItem" @click="selectThisVote">选项一</div>
                        <div class="voteSelectItem">选项二</div>
                        <div class="voteSelectItem">选项三</div>
                        <div class="voteSelectItem">选项四</div>
                    </div>
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
                </div>
            </div>
        </div>
    </div>
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
            selectThisVote(){
                this.isVoted = true
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
    }

    .box {
        width: 60%;
        height: 40%;
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
        margin-bottom: 10px;
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
        flex: 0.9;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .box .body .voteTopic{
        width: 100%;
        text-align: center;
        font-size: 15px;
        flex: 0.2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .voteSelectArea{
        flex: 0.8;
        display: flex;
        margin: 5px 0 5px 0;
        width: 100%;
    }
    .voteSelect{
        display: flex;
        justify-content: space-between;
        align-items:center;
        flex-direction: column;
        width: 100%;

    }
    .voteSelectItem{
        width: 80%;
        height: 20%;
        display: flex;
        align-items:center;
        padding-left: 5px;
        border:1px solid #8686866b ;
        border-radius: 10px;
        box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff00;
    }

    .voteResult{
        display: flex;
        justify-content: space-between;
        align-items:center;
        flex-direction: column;
        width: 100%;
    }
    .voteSelected{
        width: 100%;
    }
    .voteSelectedItem{
        display: inline-block;
        width: 80%;

        padding-left: 5px;
        border:1px solid #8686866b ;
        border-radius: 10px;
        box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
        background-color: #ffffff00;
    }

    .voteSelected span{
        display: inline-block;
        margin-left: 5px;
}
</style>