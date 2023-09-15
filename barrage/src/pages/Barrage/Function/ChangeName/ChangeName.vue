<template>
	<transition
		enter-active-class="animate__animated animate__fadeInDown animate__faster"
		leave-active-class="animate__animated animate__fadeOutUp animate__faster"
	>
		<div
			class="box_son"
			v-if="isShowChangeName"
			:style="{
				background: this.global.getIsSun()
					? 'rgba(0, 0, 0, 0.478)'
					: 'linear-gradient(to right, #62605d 0%, #304352 100%)',
			}"
		>
			<div class="body">
				<input
					type="text"
					placeholder="Input new name"
					v-model="newName"
				/>
			</div>
			<div class="foot">
				<button @click="onCloseChangeName">Back</button>
				<button @click="onSubmitName">Confirm</button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ChangeName',
	props: ['isShowChangeName'],
	data() {
		return {
			newName: '',
		}
	},
	methods: {
		onCloseChangeName() {
			this.$emit('onCloseChangeName', false)
		},
		onSubmitName() {
			this.$emit('onSubmitName', { name: this.newName })
      this.newName = ''
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

.box .body {
	position: absolute;
	top: 10%;
	width: 100%;
	height: 50%;

	display: flex;
	align-items: center;
	justify-content: center;
}

.box .body input {
	border: none;
	width: 90%;
	height: 60%;
	border-bottom: 2px solid rgb(255, 255, 255);
	font-size: 90%;
	font-weight: 700;
	padding-left: 10px;
	background-color: rgba(255, 255, 255, 0);
	color: white;
	letter-spacing: 2px;
}

.box .body input:focus {
	outline: none;
}

.box .foot {
	position: absolute;
	bottom: 10%;
	left: 0;
	width: 100%;
	height: 30%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.box .foot button {
	width: 30%;
	height: 70%;
	border-radius: 20px;
	border: none;
	color: white;
	font-size: 100%;
	letter-spacing: 5px;
	text-align: center;
}

.box .foot button:nth-child(1) {
	/* background-color: rgb(124, 223, 248); */
	background-color: lightcoral;
}

.box .foot button:nth-child(2) {
	/* background-color: rgb(250, 209, 133); */
	background-color: lightblue;
}
</style>
