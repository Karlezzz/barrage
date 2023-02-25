<template>
    <transition enter-active-class="animate__animated animate__slideInUp animate__faster"
        leave-active-class="animate__animated animate__slideOutDown animate__faster">
        <div class="box_son" v-if="isShowAddMoreChat">
            <div class="body">
                <input type="text" v-model="newChat" placeholder="添加新的常用语...">
            </div>
            <div class="foot">
                <button @click="closeAddMoreChat">返回</button>
                <button @click="addMoreChat">确定</button>
            </div>
        </div>
    </transition>

</template>

<script>
    import {
        nanoid
    } from 'nanoid'
    export default {
        name: 'AddMoreChat',
        props: [
            'isShowAddMoreChat'
        ],
        data() {
            return {
                newChat: null
            }
        },
        methods: {
            closeAddMoreChat() {
                this.$emit('closeAddMoreChat', false)
            },
            addMoreChat() {
                if (this.newChat != null) {
                    const newChat1 = {
                        id: nanoid(),
                        content: this.newChat
                    }
                    this.$emit('getNewChat', newChat1)
                }
                this.newChat = ''
            }
        },
    }
</script>

<style scoped>
    .box_son {
        position: absolute;
        width: 100%;
        height: 23%;
        bottom: 3%;
        left: 0;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box_son .body {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box_son .body input {
        width: 80%;
        height: 60%;

        border: none;
        border-bottom: 2px solid silver;
        font-size: 90%;
        font-weight: 700;
        padding-left: 10px;
        background-color: rgba(255, 255, 255, 0);
        color: white;
        letter-spacing: 2px;

    }


    .box_son .foot {
        position: absolute;
        width: 100%;
        height: 40%;
        bottom: 5%;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .box_son .foot button {
        width: 35%;
        height: 60%;
        border-radius: 20px;
        border: none;
        color: white;
        font-size: 100%;
        letter-spacing: 5px;
        text-align: center;
    }

    .box_son .foot button:nth-child(1) {
        background-color: lightcoral;

    }

    .box_son .foot button:nth-child(2) {
        background-color: lightblue;

    }
</style>