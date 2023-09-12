<template>
	<transition
		enter-active-class="animate__animated animate__fadeInDown animate__faster"
		leave-active-class="animate__animated animate__fadeOutUp animate__faster"
	>
		<div
			class="box_son"
			v-if="isShowVote"
			:style="{
				background: this.global.getIsSun()
					? 'rgba(0, 0, 0, 0.478)'
					: 'linear-gradient(to right, #62605d 0%, #304352 100%)',
			}"
		>
			<div class="body">
				<div
					class="back"
					@click="back"
				>
					<img
						src="../../images/leftBack.png"
						alt=""
					/>
				</div>
				<transition
					enter-active-class="animate__animated animate__fadeInRight animate__faster"
					leave-active-class="animate__animated animate__fadeOutUp animate__faster"
				>
					<div
						class="historyVote"
						v-if="!isShowDetail && !isShowSelect"
					>
						<div
							class="historyVoteItem"
							@click="showDetail(v)"
							v-for="(v, idx) in voteList"
							:key="idx"
						>
							{{ v.question }}
						</div>
					</div>
				</transition>

				<transition
					enter-active-class="animate__animated animate__fadeInUp animate__faster"
					leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
				>
					<div
						class="historyVoteDetail"
						id="cartsArea"
						v-if="isShowDetail"
					></div>
				</transition>

				<transition
					enter-active-class="animate__animated animate__fadeInUp animate__faster"
					leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
				>
					<div class="__select" v-if="isShowSelect">
						<div class="__question">how to do that</div>
						<div class="__selectOptions">
							<div class="__option" v-for="(i,idx) in voteOptions" :key="idx">{{ i.optionValue }}</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Vote',
	data() {
		return {
			isShowDetail: false,
			isShowSelect: false,
			myEcharts: null,
			selectedVote: null,
		}
	},
	props: ['isShowVote'],
	computed: {
		voteList() {
			return this.$store.state.vote.votes || []
		},
		showSelectOrDetail() {
			return false
		},
		voteOptions() {
			const { voteOptions } = this.selectedVote
			return voteOptions
		},
	},
	methods: {
		showDetail(vote) {
			if (vote.isInValidTime()) {
				this.isShowSelect = true
				this.selectedVote = vote
			} else {
				this.isShowDetail = true
				this.charts(this.convert(vote))
			}
		},
		charts(option) {
			const ch = new Promise((resolve, reject) => {
				resolve()
			})
			ch.then(() => {
				this.myEcharts = this.echarts.init(document.getElementById('cartsArea'))
				this.myEcharts.setOption(option)
			})
		},
		back() {
			if (this.isShowDetail == true) {
				this.myEcharts.dispose()
				this.isShowDetail = false
			} else if (this.isShowDetail == false) {
				this.$emit('getCloseVote', false)
			}
		},
		convert(vote) {
			let { question, voteOptions } = vote
			voteOptions = voteOptions.map(vo => {
				return {
					...vo,
					name: vo.optionValue,
					value: vo.selectMembers.length,
				}
			})
			const option = {
				title: {
					show: true,
					x: '10%',
					y: '10%',
					text: question,
					textStyle: {
						fontSize: '15px',
						color: '#e1e1e3',
					},
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'horizontal',
					x: 'right',
					y: 'bottom',
					selectedMode: false,
					type: 'scroll',
					textStyle: {
						color: '#e1e1e3',
					},
				},
				series: [
					{
						type: 'pie',
						radius: ['50%'],
						data: voteOptions,
					},
				],
			}
			return option
		},
	},
	watch: {
		voteList: {
			deep: true,
			handler() {
				const newVote = this.historyVoteList[this.historyVoteList.length - 1]
				this.myEcharts.dispose()
				this.charts(this.convert(newVote))
			},
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
	min-height: 30%;
	border-radius: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_son .body {
	position: absolute;
	top: 8%;
	width: 90%;
	min-height: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10%;
}

.box_son .body .back {
	display: inline-block;
	position: absolute;
	top: 0%;
	left: 2%;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: #ffffff;
}

.box_son .body .back img {
	width: 100%;
	height: 100%;
}

.box_son .body .historyVote {
	position: absolute;
	top: 20%;
	left: 0;
	width: 100%;
	height: 70%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	overflow: scroll;
}

.box_son .body .historyVote .historyVoteItem {
	width: 40%;
	height: 60%;
	background-color: #41414192;
	border-radius: 10%;
	margin: 5px 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 10px;
	overflow: scroll;
}

.box_son .body .historyVoteDetail {
	position: absolute;
	top: 10%;
	width: 90%;
	height: 80%;
}

.__select {
	background-color: #41414192;
	position: absolute;
	top: 20%;
	left: 0;
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	overflow: scroll;
}

.__select .__question {
	color: white;
	width: 90%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.__select .__selectOptions {
	width: 90%;
	height: 100%;
	overflow: scroll;
}

.__select .__selectOptions .__option {
	color: white;
	background-color: #25252592;
	width: 80%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin-bottom: 5%;
	margin-left: 10%;
}
</style>
