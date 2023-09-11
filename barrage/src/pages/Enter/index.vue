<template>
	<div
		ref="vantaRef"
		class="background"
	>
		<div class="login animate__backInDown animate__animated">
			<form action="#">
				<div class="title">Enter</div>
				<div class="input">
					<input
						type="text"
						v-model="roomCode"
						:placeholder="$roomCode"
					/>
					<input
						type="text"
						v-model="username"
						placeholder="Username"
						autocomplete="false"
					/>
					<input
						type="password"
						v-model="password"
						placeholder="Password"
						autocomplete="new-password"
					/>
				</div>
				<div class="button">
					<button @click.prevent="addRoom">Enter</button>
					<button @click.prevent="reset">Reset</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three'
import Clouds from 'vanta/src/vanta.clouds'
import { nanoid } from 'nanoid'
import { _createOne } from '@/api/index'
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Enter',
	data() {
		return {
			roomCode: null,
			username: new Date().getTime(),
			password: null,
			isSun: this.global.getIsSun(),
			isCleanBG: this.global.getIsCleanBG(),
		}
	},
  computed:{
    $roomCode() {
      return this.$store.state.enter.roomCode || sessionStorage.getItem('roomCode') || 'RoomCode'
    },
    classRoomCode() {
      return this.$store.state.enter.classRoomCode || sessionStorage.getItem('classRoomCode') || '111'
    }
  },
	methods: {
		reset() {
			this.username = ''
			this.password = ''
		},
		async addRoom() {
      // if(typeof Number(this.roomCode) !== 'number') {
      //   alert('Room code is number')
      //   return
      // }
			try {
				const result = await _createOne('/user', {
					name: this.username,
          roomCode: this.roomCode,
					password: this.password,
					id: localStorage.getItem('ID')
						? localStorage.getItem('ID')
						: nanoid(),
					token: localStorage.getItem('TOKEN') || '',
				})
				if (result) {
					this.$store.commit('enter/USERLOGIN', result)
          this.$router.push({
            path: `/barrage/${this.roomCode}/${this.classRoomCode}`
          })
				}
			} catch (error) {
				console.log(error)
			}
		},
		setBlackBG() {
			this.vantaEffect.setOptions({
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.0,
				minWidth: 200.0,
				backgroundColor: 0x0,
				skyColor: 0x0,
				cloudColor: 0x535559,
				cloudShadowColor: 0x101111,
				sunColor: 0x252424,
				sunGlareColor: 0x343332,
				sunlightColor: 0x3e3c3a,
				speed: 0.4,
			})
		},
		changeSelectBG() {
			this.$refs.vantaRef.style = `background: ${this.global.staticBG}`
		},
	},
	mounted() {
		if (this.isCleanBG == true) {
			if (this.isSun == false) {
				this.$refs.vantaRef.style =
					'background-image: linear-gradient(to right, #434343 0%, black 100%);'
			} else if (this.isSun == true) this.changeSelectBG()
		} else if (this.isCleanBG == false) {
			this.vantaEffect = Clouds({
				el: this.$refs.vantaRef,
				THREE: THREE,
				speed: 0.8,
			})
			if (this.isSun == false) {
				this.setBlackBG()
			}
		}

    this.roomCode = this.$roomCode
	},

	beforeDestroy() {
		//动态背景配置
		if (this.vantaEffect) {
			this.vantaEffect.destroy()
		}
	},
}
</script>

<style scoped>
.background {
	display: flex;
	height: 100vh;
	width: 100%;
	justify-content: center;
	align-items: center;
	/* background-color: red; */
}

.login {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media screen and (min-width: 200px) and (max-width: 320px) {
	.login form {
		width: 250px;
	}
}

@media screen and (min-width: 320px) and (max-width: 700px) {
	.login form {
		width: 300px;
	}
}

@media screen and (min-width: 700px) {
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
