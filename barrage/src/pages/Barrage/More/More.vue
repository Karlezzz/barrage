<template>
	<div>
		<transition
			enter-active-class="animate__animated animate__slideInUp animate__faster"
			leave-active-class="animate__animated animate__slideOutDown animate__faster"
		>
			<div
				class="box"
				v-show="isShowChat"
				:style="{
					background: this.global.getIsSun()
						? 'rgba(0, 0, 0, 0.478)'
						: 'linear-gradient(to right, #868f96 0%, #596164 100%)',
				}"
			>
				<div
					class="close"
					@click="closeIsShowChat()"
				>
					<transition
						appear
						name="animate__animated animate__fadeInUp  animate__delay-10s"
						leave-active-class="animate__animated animate__fadeInDown "
					>
						<img
							v-if="isShowChat"
							src="../images/下拉.png"
							alt=""
						/>
					</transition>
				</div>
				<div
					class="body"
					v-show="!isShowAddMoreChat"
				>
					<div
						class="content"
						v-for="(item, index) in moreContent"
						:key="index"
						@click="onSubmitMoreMessage(item)"
					>
						<div class="word">{{ item.content }}</div>
					</div>
					<div
						class="content"
						@click="addMoreChat"
					>
						<div class="word">&nbsp;&nbsp;+&nbsp;&nbsp;</div>
					</div>
				</div>
			</div>
		</transition>

		<AddMoreChat
			@closeAddMoreChat="closeAddMoreChat"
			@getNewChat="getNewChat"
			:isShowAddMoreChat="isShowAddMoreChat"
		>
		</AddMoreChat>
	</div>
</template>

<script>
import 'animate.css'
import AddMoreChat from './AddMoreChat/AddMoreChat.vue'
import { Message } from '../../../../lib/models'
export default {
	name: 'More',
	components: {
		AddMoreChat,
	},
	props: ['isShowChat'],
	data() {
		return {
			moreContent: [
				{
					id: '001',
					content: '6666',
				},
				{
					id: '002',
					content: '111',
				},
				{
					id: '003',
					content: 'hhhhh笑死我了',
				},
				{
					id: '004',
					content: '不知道',
				},

				{
					id: '005',
					content: '下课了老师',
				},
			],
			isShowAddMoreChat: false,
		}
	},
  computed:{
    showChat() {
			if (this.isShowChat == true) {
				if (this.isShowAddMoreChat == false) return true
				else if (this.isShowAddMoreChat == true) return false
			}
      return false
		},
    user() {
      return this.$store.state.enter.userLogin
    },
  },
	methods: {
		closeIsShowChat() {
			this.$emit('closeIsShowChat', false)
			this.isShowAddMoreChat = false
		},
		onSubmitMoreMessage(item) {
			const newMessage = Message.init({
				user: this.user,
				content: item.content,
			})
			this.$emit('onSubmitMoreMessage', {newMessage})
		},
		addMoreChat() {
			this.isShowAddMoreChat = true
		},
		closeAddMoreChat(value) {
			this.isShowAddMoreChat = false
		},
		getNewChat(value) {
			this.isShowAddMoreChat = false
			this.moreContent.push(value)
		},
	},
}
</script>

<style scoped>
.box {
	position: absolute;
	width: 100%;
	height: 40%;
	bottom: 0;
	left: 0;
	z-index: 999;
	border-top-right-radius: 100%;
	border-top-left-radius: 100%;
	z-index: 9;
}

.box .close {
	position: absolute;
	width: 100%;
	height: 15%;
	top: -5%;
	text-align: center;
}

.box .close img {
	position: absolute;
	background-color: rgb(255, 255, 255);
	height: 100%;
	border-radius: 50%;
	left: 45%;
}

.box .body {
	width: 90%;
	height: 77%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-top: 20%;
	margin-left: 5%;
	overflow: scroll;
}

.box .body .content {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20%;
	max-width: 60%;
	padding: 0 15px 0 15px;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1.5px solid;
	border-radius: 30px;
	margin-top: 10px;
	color: white;
}

.box .body .content .word {
	font-size: 90%;
	font-weight: 600;
	letter-spacing: 2px;
}
</style>
