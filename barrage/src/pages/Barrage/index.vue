<template>
    <div ref='vantaRef' class="background">
        <!-- 卡片背景 -->
        <div class="box animate__zoomIn animate__animated"></div>
        <!-- 主要窗口 -->
        <div class="bar animate__zoomIn animate__animated">
            <div class="title">
                <div @click="goBackEnter" class="home">
                    <transition-group appear name="animate__animated animate__fadeInDown  animate__delay-2s"
                        leave-active-class="animate__animated animate__zoomOut animate__faster">
                        <img v-if="isSun" key='1' src="./images/home.png" alt="">
                        <img v-if="!isSun" key='2' src="./images/home-night.png" alt="">
                    </transition-group>
                </div>
                <div class="cleanBC" @click="cleanBackground"
                    :style="{'color':isSun?'white':'#f4ea2a','border-color':isSun?'white':'#f4ea2a'}">
                    {{ this.isCleanBG==true? '简洁背景':'正常背景' }}</div>
                <span>弹幕室</span>
                <div class="backgroundChange" @click="changeBG">
                    <transition-group appear name="animate__animated animate__fadeInDown  animate__delay-2s"
                        leave-active-class="animate__animated animate__zoomOut animate__faster">
                        <img v-if="isSun" key='1' src="./images/白天模式，明亮模式.png" alt="">
                        <img v-if="!isSun" key='2' src="./images/夜间模式.png" alt="">
                    </transition-group>
                </div>
            </div>
            <div class="body">
                <div v-for="item,index in messageContent" :key="index"
                    :class="{'rightMessage':item.id==myId,'leftMessage':item.id!=myId}">
                    <div class="name" v-if="isSameId(item,index)">
                        {{ item.name}}
                    </div>
                    <div class="content">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="foot">
                <div class="chat" @click="showMoreChat">
                    <img v-if="isSun" src="./images/chat.png" alt="">
                    <img v-if="!isSun" src="./images/chat-night.png" alt="">
                </div>
                <div class="more" @click="showFunction">
                    <img v-if="isSun" src="./images/more.png" alt="">
                    <img v-if="!isSun" src="./images/more-night.png" alt="">
                </div>
                <div class="input">
                    <input type="text" placeholder="快来发言吧..." v-model="inputContent" @keyup.enter="sendNewContent">
                </div>
                <div class="send">
                    <div class="btn" :style="{borderColor:(isSun==false?'#f4ea2a':'#2c2c2c')}" @click="sendNewContent">
                        发送
                    </div>
                </div>
            </div>
        </div>

        <More :isShowChat="isShowChat" :name="name" :myId="myId" @closeIsShowChat='closeIsShowChat'
            @getNewMoreMessage="getNewMoreMessage"></More>
        <Function :isShowFunction="isShowFunction" @getCloseFunction="getCloseFunction"></Function>
        <Vote :isShowVote="isShowVote" @getCloseVote="getCloseVote"></Vote>
    </div>
</template>

<script>
    import Vote from './Vote/Vote.vue'
    import Function from './Function/Function.vue'
    import More from './More/More.vue'
    import 'animate.css';
    import * as THREE from 'three'
    import Clouds from 'vanta/src/vanta.clouds'
    export default {
        components: {
            More,
            Function,
            Vote
        },
        data() {
            return {
                isClass: '',
                myId: '004',
                name: 'd',
                inputContent: '',
                messageContent: [{
                        name: 'Alen',
                        id: '001',
                        content: 'hello'
                    },
                    {
                        name: 'b',
                        id: '002',
                        content: 'hi'
                    },
                    {
                        name: 'b',
                        id: '002',
                        content: 'hi'
                    },
                    {
                        name: 'c',
                        id: '003',
                        content: 'how are you?'
                    },
                    {
                        name: 'd',
                        id: '004',
                        content: 'i am fine!'
                    },
                    {
                        name: 'd',
                        id: '004',
                        content: 'i am fine!'
                    },
                    {
                        name: 'd',
                        id: '004',
                        content: 'i am fine!'
                    },

                ],
                isSun: true,
                isShowChat: false,
                isShowFunction: false,
                isShowVote: false,
                isCleanBG: false,
            }
        },
        methods: {
            //白天模式和黑夜迷哦是
            changeBG() {
                this.isSun = !this.isSun
                //不是简约模式
                if (this.isCleanBG == false) {
                    setTimeout(() => {
                        //黑天
                        if (this.isSun == false) {
                            this.vantaEffect.setOptions({
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 200.00,
                                minWidth: 200.00,
                                backgroundColor: 0x0,
                                skyColor: 0x0,
                                cloudColor: 0x535559,
                                cloudShadowColor: 0x101111,
                                sunColor: 0x252424,
                                sunGlareColor: 0x343332,
                                sunlightColor: 0x3e3c3a,
                                speed: 0.40
                            })
                        }
                        //白天
                        else if (this.isSun == true) {
                            this.vantaEffect.setOptions({
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 200.00,
                                minWidth: 200.00,
                                skyColor: 0x59a6c8,
                                cloudColor: 0x9fb2d2,
                                cloudShadowColor: 0xa2b4a,
                                sunColor: 0xf09f45,
                                sunGlareColor: 0xffc230,
                                sunlightColor: 0xffc230,
                                speed: 0.70
                            })
                        }
                    }, 200);
                }
                //简约模式
                else if (this.isCleanBG == true) {
                    if (this.vantaEffect) {
                        this.vantaEffect.destroy()

                    }
                    //黑天
                    if (this.isSun == false)
                        this.$refs.vantaRef.style =
                        'background-image: linear-gradient(to right, #434343 0%, black 100%);'
                    //白天
                    else if (this.isSun == true)
                        this.$refs.vantaRef.style = 'background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'

                }
            },
            //简洁模式改变
            cleanBackground() {
                this.isCleanBG = !this.isCleanBG
                //简约模式
                if (this.isCleanBG == true) {
                    if (this.vantaEffect) {
                        this.vantaEffect.destroy()
                    }
                    if (this.isSun == true)
                        this.$refs.vantaRef.style = 'background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'
                    else if (this.isSun == false)
                        this.$refs.vantaRef.style = 'background: linear-gradient(to right, #434343 0%, black 100%);'
                }
                //非简约模式
                else if (this.isCleanBG == false) {
                    //白天
                    if (this.isSun == true) {
                        this.vantaEffect = Clouds({
                            el: this.$refs.vantaRef,
                            THREE: THREE,
                            speed: 0.80
                        })
                    }
                    //黑天
                    else if (this.isSun == false) {
                        this.vantaEffect = Clouds({
                            el: this.$refs.vantaRef,
                            THREE: THREE,
                            speed: 0.80
                        })
                        this.vantaEffect.setOptions({
                            mouseControls: true,
                            touchControls: true,
                            gyroControls: false,
                            minHeight: 200.00,
                            minWidth: 200.00,
                            backgroundColor: 0x0,
                            skyColor: 0x0,
                            cloudColor: 0x535559,
                            cloudShadowColor: 0x101111,
                            sunColor: 0x252424,
                            sunGlareColor: 0x343332,
                            sunlightColor: 0x3e3c3a,
                            speed: 0.40
                        })
                    }
                }

            },
            goBackEnter() {
                this.$router.push('/enter')
            },
            sendNewContent() {
                if (this.inputContent != '') {
                    const content = {
                        id: '004',
                        name: this.name,
                        content: this.inputContent
                    }
                    this.messageContent.push(content)
                    this.inputContent = ''
                }

            },
            // 判断上一条内容和当前内容作者是否为同一个人
            isSameId(item, index) {
                if (index == 0) return true
                else {
                    if (item.id == this.messageContent[index - 1].id) return false
                    else return true
                }
            },
            // 打开更多常用语言
            showMoreChat() {
                this.isShowChat = !this.isShowChat
                this.isShowFunction = false
            },
            closeMoreChat() {
                this.isShowChat = false
            },
            // 子组件用emit修改props数据，关闭常用语窗口
            closeIsShowChat(value) {
                this.isShowChat = value
            },
            // 发送常用语
            getNewMoreMessage(item) {
                this.isShowChat = false
                this.messageContent.push(item)

            },
            showFunction() {
                this.isShowFunction = !this.isShowFunction
                this.isShowChat = false
            },
            // 子组件用emit修改props数据，关闭功能窗口
            getCloseFunction(value) {
                this.isShowFunction = value
            },
            getCloseVote(value) {
                this.isShowVote = false
            },


        },

        mounted() {
            //动态背景配置
            this.vantaEffect = Clouds({
                el: this.$refs.vantaRef,
                THREE: THREE,
                speed: 0.80
            })


            // 挂载后定位到最后一条消息的位置
            let div = document.querySelector(".body");
            div.scrollTop = div.scrollHeight;

            //接受新名称
            this.$bus.$on('getNewName', (value) => {
                this.messageContent.forEach((item) => {
                    if (item.name == this.name) {
                        item.name = value
                    }
                })
                this.name = value
            })

            //接收举手弹幕
            this.$bus.$on('getHandMessage', (value) => {
                const handMessage = {
                    name: this.name,
                    id: this.myId,
                    content: value,
                    type: 'strong'
                }
                this.messageContent.push(handMessage)
            })
        },
        beforeDestroy() {
            //动态背景配置
            if (this.vantaEffect) {
                this.vantaEffect.destroy()
            }
        },
        watch: {
            // 屏幕滚动始终在最后一条
            messageContent() {
                this.$nextTick(() => {
                    let div = document.querySelector(".body");
                    div.scrollTop = div.scrollHeight;
                });
            },
        },
    }
</script>

<style scoped>
    @media screen and (min-width:0px) and (max-width:768px) {
        .background .box {
            width: 96%;
        }

        .background .bar {
            width: 96%;
        }

    }

    @media screen and (min-width:769px) and (max-width:992px) {
        *{
            font-size: 110%;
        }
        .background .box {
            width: 90%;
            height: 80%;
        }

        .background .bar {
            width: 90%;
            height: 80%;
        }

        .bar .foot .chat img {

            width: 50%;
        }
    }

    @media screen and (min-width:993px) {
        * {
            font-size: 120%;
        }

        .background .box {

            width: 90%;
            height: 90%;
        }

        .background .bar {
            width: 90%;
            height: 90%;
        }
        .bar .foot{
            flex: 0.5;
        }

        .bar .foot .chat img {

            width: 20%;
        }
    }

    .background {
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-image: url(../../static/isSunBG.png)
    }

    .box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 96%;
        height: 98%;
        text-align: center;
        overflow: hidden;
        border-radius: 6px;
        /* background: inherit; */
        border: 2px solid rgba(202, 202, 202, 0.164);
        box-shadow: 0px 30px 30px 0 rgba(0, 0, 0, 0.629);
    }

    .bar {
        width: 96%;
        height: 98%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }

    /* 顶部 */
    .bar .title {
        flex: 0.07;
        text-align: center;
    }

    .bar .title .home {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: absolute;
        left: 5px;
        top: 5px;
    }

    .bar .title .home img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .bar .title .cleanBC {
        display: inline-block;
        position: absolute;
        left: 50px;
        top: 17px;
        font-size: 12px;
        border: 1px solid white;
        width: 60px;
        height: 20px;
        border-radius: 10px;
        color: white;
    }

    .bar .title span {
        display: inline-block;
        font-size: 100%;
        letter-spacing: 2px;
        color: rgba(248, 248, 248, 0.791);
        font-weight: 500;
        padding-top: 10px;
    }

    .bar .title .backgroundChange {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .bar .title .backgroundChange img {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 10px;
        top: 5px;
    }


    /* 中间部分 */
    .bar .body {
        flex: 0.85;
        overflow: scroll;
        margin-bottom: 10px;
    }

    .bar .body::-webkit-scrollbar {
        display: none;
    }

    /* 左侧消息框 */
    .bar .body .leftMessage {
        width: 50%;
        /* margin-left: 5px;
        margin-top: 10px; */
        margin: 5px 0 10px 15px;
        word-break: break-all;
        white-space: pre-line;

    }

    .bar .body .leftMessage .name {
        font-size: 100%;
        color: rgb(255, 255, 255);
        font-weight: 500;
        letter-spacing: 1px;
    }

    .bar .body .leftMessage .content {
        margin-top: 5px;
        background-color: rgba(252, 252, 252, 0.368);
        border-radius: 20px;
        padding: 10px 15px 10px 15px;
        color: rgb(255, 255, 255);
        font-size: 100%;
        border: 1px solid rgba(152, 152, 152, 0.092);
        box-shadow: -2px 2px 4px 0 rgba(61, 61, 61, 0.304);
        display: inline-block;
    }

    /* 右侧消息框 */
    .bar .body .rightMessage {
        width: 50%;
        text-align: right;
        margin: 0 15px 5px auto;
        word-break: break-all;
        white-space: pre-line;
    }

    .bar .body .rightMessage .name {
        text-align: right;
        margin-right: 5px;
        font-size: 100%;
        color: rgb(255, 255, 255);
        font-weight: 500;
        letter-spacing: 1px;
    }

    .bar .body .rightMessage .content {
        margin-top: 10px;
        background-color: rgba(231, 184, 104, 0.576);
        border-radius: 20px;
        padding: 10px 15px 10px 15px;
        color: rgb(255, 255, 255);
        font-size: 100%;
        text-align: left;
        border: 1px solid rgba(152, 152, 152, 0.092);
        box-shadow: 2px 2px 4px 0 rgba(61, 61, 61, 0.304);
        display: inline-block;
    }

    /* 底部 */
    .bar .foot {
        flex: 0.08;
        display: flex;
        flex-direction: row;
    }

    .bar .foot .chat {
        flex: 0.1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;

    }

    .bar .foot .chat img {
        text-align: center;
        width: 80%;
        vertical-align: middle;
    }

    .bar .foot .more {
        flex: 0.1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bar .foot .more img {
        text-align: center;
        width: 80%;
        vertical-align: middle;
    }

    .bar .foot .input {
        flex: 0.6;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bar .foot .input input {
        width: 100%;
        height: 65%;
        border: none;
        border-bottom: 2px solid silver;
        font-size: 90%;
        font-weight: 700;
        padding-left: 10px;
        background-color: rgba(255, 255, 255, 0);
        color: white;
        letter-spacing: 2px;
    }

    .bar .foot .input input:focus {
        outline: none;
    }

    .bar .foot .input input::-webkit-input-placeholder {
        color: #ffffff;
    }

    .bar .foot .input input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #ffffff;
    }

    .bar .foot .input input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #ffffff;
    }

    .bar .foot .input input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #ffffff;
    }

    .bar .foot .send {
        flex: 0.2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bar .foot .send .btn {
        background-color: rgba(66, 178, 243, 0);
        border: 1px solid rgb(0, 0, 0);
        width: 80%;
        height: 75%;
        border-radius: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
    }
</style>