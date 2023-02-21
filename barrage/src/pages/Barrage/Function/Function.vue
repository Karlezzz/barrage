<template>
    <div class="bc" v-if="isShowFunction">
        <div class="box">
            <div class="head">
                <div class="title">更多功能</div>
                <div class="close" @click="closeFunction"><img src="../images/close.png" alt=""></div>
            </div>
            <div class="body">
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
                <div class="card">
                    <div class="img">
                        <img src="../images/修改.png" alt="">
                    </div>
                    <div class="word">修改名称</div>
                </div>
            </div>
        </div>

        <ChangeName :isShowChangeName="isShowChangeName"></ChangeName>

    </div>
</template>

<script>
import ChangeName from './ChangeName/ChangeName.vue'
    export default {
        name: 'Function',
        props: [
            'isShowFunction'
        ],
        data() {
            return {
                isShowChangeName:true
            }
        },
        components:{
            ChangeName
        },
        methods: {
            closeFunction() {
                this.$emit('getCloseFunction', false)
            }
        }
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
        flex-flow: row wrap;
        margin-top: 10px;
    }

    .body .card {
        display: flex;
        width: 28%;
        height: 28%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 10px;
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