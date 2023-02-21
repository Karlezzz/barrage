<template>
    <div ref='vantaRef' class="background">
        <div class="login animate__backInDown animate__animated">
            <form action="post">
                <div class="title">Enter</div>
                <div class="input">
                    <input type="text" v-model="roomId" placeholder="RoomId">
                    <input type="text" v-model="username" placeholder="Username" autocomplete="false">
                    <input type="password" v-model="password" placeholder="Password" autocomplete="new-password">
                </div>
                <div class="button">
                    <button @click="addRoom">Enter</button>
                    <button @click="reset">Reset</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import BIRDS from 'vanta/src/vanta.clouds'
    export default {
        name: 'Enter',
        data() {
            return {
                roomId: '',
                username: '',
                password: ''
            }
        },
        methods: {
            reset() {
                this.username = ''
                this.password = ''
            },
            addRoom() {
                this.$router.push({
                    path: '/barrage',
                    params: {
                        roomId: this.roomId
                    }
                })
            },
        },
        mounted() {
            //动态背景配置
            this.vantaEffect = BIRDS({
                el: this.$refs.vantaRef,
                THREE: THREE
            })
        },
        beforeDestroy() {
            //动态背景配置
            if (this.vantaEffect) {
                this.vantaEffect.destroy()
            }
        }

    }
</script>

<style scoped>
    .background {
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .login {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;


    }

    @media screen and (min-width:200px) and (max-width:320px) {
        .login form {
            width: 250px;
        }
    }

    @media screen and (min-width:320px) and (max-width:700px) {
        .login form {
            width: 300px;
        }
    }

    @media screen and (min-width:700px) {
        .login form {
            width: 400px;
        }
    }

    .login form {
        position: relative;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0 20px 20px 0 rgb(0, 0, 0, 0.3);
        background: rgba(140, 127, 127, 0.1);
    }

    .login form .title {
        position: relative;
        margin: 20px 0 20px 30px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 1px;
    }

    .login form .title::before {
        position: absolute;
        content: '';
        width: 100px;
        height: 3px;
        background-color: #fff;
        bottom: -10px;
    }

    .login form .input {
        margin: 10px 0 0 20px;
        height: 170px;
        width: 85%;
    }

    .login form .input input {
        padding-left: 20px;
        margin-top: 15px;
        outline: none;
        border: none;
        width: 100%;
        height: 35px;
        border-radius: 35px;
        box-shadow: 0 10px 5px 0 rgb(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.168);
        color: rgba(255, 255, 255, 0.911);
    }

    .login form .input input:focus {
        animation: input-large 0.1s ease-in;
        animation-fill-mode: forwards;
    }

    @keyframes input-large {
        100% {
            transform: scale(1.1) translateX(4px);
        }
    }

    .login form input::placeholder {
        padding-left: 5px;
        font-weight: 600px;
        font-size: 14px;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.781);
    }

    .login form button {
        margin: 0px 0 0 20px;
        width: 100px;
        height: 35px;
        border: none;
        border-radius: 35px;
        box-shadow: 0 10px 5px 0 rgb(0, 0, 0, 0.2);
        background: rgba(253, 253, 253, 0.214);
        color: rgb(255, 255, 255);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1px;
    }

    .login form button:hover {
        animation: button-large 0.3s;
        animation-fill-mode: forwards;
    }

    @keyframes button-large {
        100% {
            transform: scale(1.05);
        }
    }
</style>