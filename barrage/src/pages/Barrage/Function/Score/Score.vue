<template>
	<transition
		enter-active-class="animate__animated animate__fadeInDown animate__faster"
		leave-active-class="animate__animated animate__fadeOutUp animate__faster"
	>
		<div
			class="box_son"
			v-show="isShowScore"
			:style="{
				background: this.global.getIsSun()
					? 'rgba(0, 0, 0, 0.478)'
					: 'linear-gradient(to right, #62605d 0%, #304352 100%)',
			}"
		>
			<div class="body">
				<div class="star">
					<ul>
						<li
							v-for="(i, index) in count"
							:key="index"
							@click="grade(index)"
							:class="index <= choseStar ? 'maxStar' : 'noStar'"
						></li>
					</ul>
				</div>
			</div>
			<div class="foot">
				<button @click="closeScore">Cancel</button>
				<button @click="onSubmitScore">Confirm</button>
			</div>
		</div>
	</transition>
</template>

<script>
import { Score } from '../../../../../lib/models'

export default {
	name: 'Score',
	props: ['isShowScore'],
	data() {
		return {
			count: 5,
			score: null,
			choseStar: null,
		}
	},
	computed: {
		user() {
			return this.$store.state.enter.userLogin
		},
		userId() {
			return this.user ? this.user.id : ''
		},
		classRoomId() {
			return (
				this.$store.state.enter.classRoomId ||
				sessionStorage.getItem('classRoomId') ||
				''
			)
		},
	},
	methods: {
		closeScore() {
			this.$emit('getCloseScore', false)
		},
		grade(index) {
			this.choseStar = index
			this.score = index + 1
		},
		onSubmitScore() {
			this.closeScore()
			const score = Score.init({
				value: this.score,
				creator: this.userId,
				classRoomId: this.classRoomId,
			})
			this.$emit('onSubmitScore', { score })
		},
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
	height: 20%;
	border-radius: 30px;
}

.box_son .body {
	position: absolute;
	top: 10%;
	width: 100%;
	height: 50%;

	display: flex;
	align-items: center;
	justify-content: center;
}

.box_son .foot {
	position: absolute;
	bottom: 10%;
	left: 0;
	width: 100%;
	height: 30%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.box_son .foot button {
	width: 30%;
	height: 70%;
	border-radius: 20px;
	border: none;
	color: white;
	font-size: 100%;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_son .foot button:nth-child(1) {
	background-color: lightcoral;
}

.box_son .foot button:nth-child(2) {
	background-color: lightblue;
}

.star ul {
	width: 100%;
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-left: -2px;
}

.star ul li {
	width: 40px;
	height: 40px;
	margin-left: 4px;
	background-size: 35px 35px;
}

.maxStar {
	background: url(../../images/满星.png) no-repeat;
	background-size: 35px 35px;
}

.noStar {
	background: url(../../images/空星.png) no-repeat;
	background-size: 35px 35px;
}
</style>
