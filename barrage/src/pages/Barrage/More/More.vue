<template>
    <div class="bc" v-if="isShowChat">
        <div class="box" v-if="showChat">
            <div class="head">
                <div class="title">常用语</div>
                <div class="close" @click="closeIsShowChat">
                    <img src="../images/close.png" alt="">
                </div>
            </div>
            <div class="body">
                <div class="content" v-for="item in moreContent" :key="item.id" @click="sentMessage(item)">
                    <div class="contentBox">
                        <div class="word">{{item.content}}</div>
                    </div>
                </div>
                <div class="content" @click="addMoreChat">
                    <div class="contentBox">
                        <div class="word">&nbsp;&nbsp;+&nbsp;&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <AddMoreChat v-if="isShowAddMoreChat" @closeAddMoreChat="closeAddMoreChat" @getNewChat="getNewChat"></AddMoreChat>
    </div>
</template>



<script>
    import 'animate.css';
    import AddMoreChat from './AddMoreChat/AddMoreChat.vue';
    export default {
        name: 'More',
        components:{
            AddMoreChat
        },
        props: [
            "isShowChat",
            "name",
            "myId"
        ],
        data() {
            return {
                moreContent: [{
                        id: '001',
                        content: '6666'
                    },
                    {
                        id: '002',
                        content: '111'
                    },
                    {
                        id: '003',
                        content: 'hhhhh笑死我了'
                    },
                    {
                        id: '004',
                        content: '不知道'
                    },
                    {
                        id: '005',
                        content: '下课了老师'
                    },
                ],
                isShowAddMoreChat:false
            }
        },
        methods: {
            closeIsShowChat() {
                this.$emit('closeIsShowChat', false)
            },
            sentMessage(item) {
                const newMessage = {
                    name: this.name,
                    id: this.myId,
                    content: item.content
                }
                this.$emit('getNewMoreMessage', newMessage)
            },
            addMoreChat(){
                this.isShowAddMoreChat= true
            },
            closeAddMoreChat(value){
                this.isShowAddMoreChat=false
            },
            getNewChat(value){
                this.isShowAddMoreChat=false
                this.moreContent.push(value)
            }
        },
        computed:{
            showChat(){
                if(this.isShowChat==true){
                    if(this.isShowAddMoreChat==false)return true
                    else if(this.isShowAddMoreChat == true) return false
                }
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
    }

    .box .body .content {
        display: inline-block;
        height: 13%;
        margin: 5px 10px 0 5px;
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid black;
        border-radius: 20px;
    }

    .box .body .content .contentBox {
        display: flex;
        /* justify-content: center; */
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 5px 0 5px;

    }

    .box .body .content .contentBox .word {
        font-size: 90%;
        font-weight: 600;
        letter-spacing: 2px;
    }
</style>