<template>
	<div
		ref="vantaRef"
		class="background"
		:style="{ background: isCleanBG ? this.global.staticBG : '#626262' }"
	>
		<div class="box animate__zoomIn animate__animated">
			<div class="bar animate__zoomIn animate__animated">
				<div class="title">
					<div
						@click="goBackEnter"
						class="home"
					>
						<transition-group
							appear
							name="animate__animated animate__fadeInDown  animate__delay-2s"
							leave-active-class="animate__animated animate__zoomOut animate__faster"
						>
							<img
								v-if="isSun"
								key="1"
								src="./images/home.png"
								alt=""
							/>
							<img
								v-if="!isSun"
								key="2"
								src="./images/home-night.png"
								alt=""
							/>
						</transition-group>
					</div>
					<div
						class="cleanBC"
						:style="{
							color: isSun ? 'white' : '#f4ea2a',
							'border-color': isSun ? 'white' : '#f4ea2a',
						}"
					>
						<div
							class="cleanBC_son"
							@click="cleanBackground"
						>
							{{ this.isCleanBG == true ? 'Clear' : 'Normal' }}
						</div>

						<div
							class="changeBG"
							v-if="this.isCleanBG"
							@click="isShowColor = true"
						>
							<img
								v-if="isSun"
								src="./images/调节.png"
								alt=""
							/>
							<img
								v-if="!isSun"
								src="./images/调节-night.png"
								alt=""
							/>
						</div>
					</div>
					<div class="__content">Barrage Room</div>
					<div
						class="backgroundChange"
						@click="changeBG"
					>
						<transition-group
							appear
							name="animate__animated animate__fadeInDown  animate__delay-2s"
							leave-active-class="animate__animated animate__zoomOut animate__faster"
						>
							<img
								v-if="isSun && !isCleanBG"
								key="1"
								src="./images/白天模式，明亮模式.png"
								alt=""
							/>
							<img
								v-if="!isSun && !isCleanBG"
								key="2"
								src="./images/夜间模式.png"
								alt=""
							/>
						</transition-group>
					</div>
				</div>
				<div class="body">
					<div
						v-for="(item, index) in messageContent"
						:key="index"
						:class="{
							rightMessage: getUserId(item) == userId,
							leftMessage: getUserId(item) != userId,
						}"
					>
						<div
							class="name"
							v-if="isSameUser(item, index)"
						>
							{{ getUserName(item) }}
						</div>
						<div class="content">
							{{ getContent(item) }}
						</div>
					</div>
				</div>
				<div class="foot">
					<div
						class="chat"
						@click="showMoreChat"
					>
						<img
							v-if="isSun"
							src="./images/chat.png"
							alt=""
						/>
						<img
							v-if="!isSun"
							src="./images/chat-night.png"
							alt=""
						/>
					</div>
					<div
						class="more"
						@click="showFunction"
					>
						<img
							v-if="isSun"
							src="./images/more.png"
							alt=""
						/>
						<img
							v-if="!isSun"
							src="./images/more-night.png"
							alt=""
						/>
					</div>
					<div class="input">
						<input
							type="text"
							placeholder="Come and speak"
							v-model="inputContent"
							@keyup.enter="sendNewContent"
						/>
					</div>
					<div class="send">
						<div
							class="btn"
							@click="sendNewContent"
						>
							<img
								v-if="isSun"
								src="./images/发送.png"
								alt=""
							/>
							<img
								v-if="!isSun"
								src="./images/发送-night.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>

			<More
				:isShowChat="isShowChat"
				@closeIsShowChat="closeIsShowChat"
				@onSubmitMoreMessage="onSubmitMoreMessage"
			></More>
			<Function
				:isShowFunction="isShowFunction"
				@onSubmitName="onSubmitName"
				@getCloseFunction="getCloseFunction"
				@onSubmitScore="onSubmitScore"
				@onSubmitComment="onSubmitComment"
				@onSubmitVote="onSubmitVote"
				@onGetAllVotes="onGetAllVotes"
			></Function>
			<BGSelect
				:isShowColor="isShowColor"
				@getCloseColor="getCloseColor"
			></BGSelect>
		</div>
	</div>
</template>

<script>
import Function from './Function/Function.vue'
import More from './More/More.vue'
import BGSelect from './BackgroundSelect/BGSelect.vue'

import 'animate.css'
import * as THREE from 'three'
import Clouds from 'vanta/src/vanta.clouds'

import { io } from 'socket.io-client'
import { Message, User } from '../../../lib/models'
import { _findOne, _updateOne, _createOne } from '@/api/index'
import { endpoint } from '../../api/ednpoint.js'

export default {
	components: {
		More,
		Function,
		BGSelect,
	},
	data() {
		return {
			isClass: '',
			inputContent: '',
			messageContent: [],
			isSun: this.global.getIsSun(),
			isCleanBG: this.global.getIsCleanBG(),
			isShowChat: false,
			isShowFunction: false,
			isShowVoteInform: false,
			isShowColor: false,
			socket: null,
		}
	},
	computed: {
		userId() {
			return this.user ? this.user.id : ''
		},
		userName() {
			return this.user ? this.user.name : ''
		},
		user() {
			return User.init(this.$store.state.enter.userLogin)
		},
	},
	methods: {
		async onGetAllVotes() {
			await this.getAllVotes()
		},
		async getAllVotes() {
			await this.$store.dispatch('vote/getAllVotes')
		},
		async onSubmitComment({ comment }) {
			try {
				const result = await _createOne(endpoint.comment, comment)
			} catch (error) {
				console.log(error)
			}
		},
		async onSubmitScore({ score }) {
			try {
				const result = await _createOne(endpoint.score, score)
			} catch (error) {
				console.log(error)
			}
		},
		async onSubmitName({ name }) {
			try {
				this.user.setUserName(name)
				const result = await _updateOne(endpoint.user, this.user)
				if (!result) {
					alert('Fail')
					return
				}
				alert('Successful')
			} catch (error) {
				console.log(error)
			}
		},
		async onSubmitVote({ voteResult }) {
			try {
				const result = await _updateOne(endpoint.vote, {
					...voteResult,
					id: voteResult.vote.id,
				})
				if (result) {
					this.$store.commit('vote/UPDATEVOTE', result)
				}
			} catch (error) {
				console.log(error)
			}
		},
		getContent(item) {
			return item.content
		},
		getUserId(item) {
			return item.userId
		},
		getUserName(item) {
			return item.userName
		},
		changeBG() {
			this.global.setIsSun()
			this.isSun = this.global.getIsSun()
			localStorage.setItem('ISSUN', this.isSun)

			//不是简约模式
			if (this.isCleanBG == false) {
				setTimeout(() => {
					//黑天
					if (this.isSun == false) {
						this.setBlackBG()
					}
					//白天
					else if (this.isSun == true) {
						this.setSunBG()
					}
				}, 200)
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
					this.$refs.vantaRef.style = `background: ${this.global.staticBG}`
			}
		},
		cleanBackground() {
			this.global.setIsCleanBG()
			this.isCleanBG = this.global.getIsCleanBG()
			localStorage.setItem('ISCLEANBG', this.isCleanBG)
			//简约模式
			if (this.isCleanBG == true) {
				if (this.vantaEffect) {
					this.vantaEffect.destroy()
				}
				if (this.isSun == true)
					this.$refs.vantaRef.style = `background: ${this.global.staticBG}`
				else if (this.isSun == false)
					this.$refs.vantaRef.style =
						'background: linear-gradient(to right, #434343 0%, black 100%);'
			}
			//非简约模式
			else if (this.isCleanBG == false) {
				//白天
				if (this.isSun == true) {
					this.vantaEffect = Clouds({
						el: this.$refs.vantaRef,
						THREE: THREE,
						speed: 0.8,
					})
				}
				//黑天
				else if (this.isSun == false) {
					this.vantaEffect = Clouds({
						el: this.$refs.vantaRef,
						THREE: THREE,
						speed: 0.8,
					})
					this.setBlackBG()
				}
			}
		},
		goBackEnter() {
			this.$router.push('/enter')
		},
		sendNewContent() {
			const newMsg = Message.init({
				userId: this.userId,
				userName: this.userName,
				content: this.inputContent,
				type: 'chat',
			})
			try {
				this.socket.emit('sendMsg', JSON.stringify(newMsg))
			} catch (error) {
				console.log(error)
			}
			this.inputContent = ''
		},
		isSameUser(item, index) {
			if (index == 0) return true
			const lastMessage = this.messageContent[index - 1]
			const { userId, userName } = lastMessage
			if (
				this.getUserId(item) === userId &&
				this.getUserName(item) === userName
			)
				return false
			return true
		},
		showMoreChat() {
			this.isShowChat = !this.isShowChat
			this.isShowFunction = false
		},
		closeMoreChat() {
			this.isShowChat = false
		},
		closeIsShowChat(value) {
			this.isShowChat = value
		},
		onSubmitMoreMessage({ newMessage }) {
			this.isShowChat = false
			try {
				this.socket.emit('sendMsg', JSON.stringify(newMessage))
			} catch (error) {
				console.log(error)
			}
		},
		showFunction() {
			this.isShowFunction = !this.isShowFunction
			this.isShowChat = false
		},
		getCloseFunction(value) {
			this.isShowFunction = value
		},
		getCloseVote(value) {
			this.isShowVoteInform = false
		},
		setSunBG() {
			this.vantaEffect.setOptions({
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.0,
				minWidth: 200.0,
				skyColor: 0x59a6c8,
				cloudColor: 0x9fb2d2,
				cloudShadowColor: 0xa2b4a,
				sunColor: 0xf09f45,
				sunGlareColor: 0xffc230,
				sunlightColor: 0xffc230,
				speed: 0.5,
			})
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
		getCloseColor(value) {
			this.isShowColor = false
		},
		changeSelectBG() {
			this.$refs.vantaRef.style = `background: ${this.global.staticBG}`
		},
		async initSocket() {
			try {
				const { socketUrl } = await _findOne(endpoint.socket)
				if (socketUrl) {
					this.socket = io(socketUrl, {
						transports: ['websocket'],
					})
					this.socket.removeAllListeners()

					this.socket.on('broadcast', data => {
						const replyMessage = Message.init(JSON.parse(data))
						this.messageContent.push(replyMessage)
					})

					this.socket.on('updateVote', data => {
						this.$store.commit('vote/UPDATEVOTE', data)
					})
				}
			} catch (error) {
				console.log(error)
			}
		},
		initBackground() {
			if (this.isCleanBG == true) {
				if (this.isSun == false) {
					this.$refs.vantaRef.style =
						'background-image: linear-gradient(to right, #434343 0%, black 100%);'
				} else if (this.isSun == true) {
					this.changeSelectBG()
				}
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
		},
		toLastLocation() {
			let div = document.querySelector('.body')
			div.scrollTop = div.scrollHeight
		},

		async init() {
			await this.initSocket()
			this.initBackground()
			this.toLastLocation()
		},
	},
	created() {
		this.init()
	},
	beforeDestroy() {
		if (this.vantaEffect) {
			this.vantaEffect.destroy()
		}
	},
	watch: {
		messageContent() {
			this.$nextTick(() => {
				let div = document.querySelector('.body')
				div.scrollTop = div.scrollHeight
			})
		},
	},
}
</script>

<style scoped>
@media screen and (min-width: 0px) and (max-width: 480px) {
	.background .box {
		width: 96%;
	}
}

@media screen and (min-width: 481px) and (max-width: 768px) {
	.background .box {
		width: 96%;
	}
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
	.background .box {
		width: 650px;
		height: 750px;
	}
}

@media screen and (min-width: 1025px) and (min-width: 1200px) {
	.background .box {
		width: 700px;
		height: 550px;
	}
}

@media screen and (min-width: 1201px) {
	.background .box {
		width: 1200px;
		height: 750px;
	}
}

.background {
	display: flex;
	height: 100%;
	height: calc(var(--vh, 1vh) * 100);
	width: 100%;
	justify-content: center;
	align-items: center;
	background-image: url(../../static/isSunBG.png);
}

.box {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 98%;
	height: 98%;
	overflow: hidden;
	border-radius: 30px;
	border: 2px solid rgba(202, 202, 202, 0.164);
	box-shadow: 0px 30px 30px 0 rgba(0, 0, 0, 0.629);

	display: flex;
	justify-content: center;
	align-items: center;
}

.bar {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
}

/* 顶部 */
.bar .title {
	flex: 0.07;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.bar .title .home {
	display: inline-block;
	width: 30px;
	height: 30px;
	position: absolute;
	left: 0;
	top: 1%;
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
	top: 20px;
	left: 15%;
	font-size: 10px;
	font-weight: 600;
	border: 1px solid white;
	width: 50px;
	height: 20px;
	border-radius: 10px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bar .title .cleanBC .changeBG {
	display: inline-block;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0%;
	left: 105%;
}

.bar .title .cleanBC .changeBG img {
	width: 100%;
	height: 100%;
}

.bar .title .__content {
	font-size: 105%;
	color: rgb(248, 248, 248);
	font-weight: 600;
	margin-bottom: 5%;
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
	margin-top: 10px;
}

.bar .body::-webkit-scrollbar {
	display: none;
}

/* 左侧消息框 */
.bar .body .leftMessage {
	width: 50%;
	/* margin-left: 5px;
        margin-top: 10px; */
	margin: 5px 0 10px 10px;
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
	margin: 0 10px 5px auto;
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
	width: 35px;
	vertical-align: middle;
}

.bar .foot .more {
	flex: 0.1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
}

.bar .foot .more img {
	text-align: center;
	width: 35px;
	vertical-align: middle;
}

.bar .foot .input {
	flex: 0.6;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
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

.bar .foot .send {
	flex: 0.2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bar .foot .send .btn {
	width: 70px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bar .foot .send .btn img {
	width: 32px;
	height: 32px;
}
</style>
