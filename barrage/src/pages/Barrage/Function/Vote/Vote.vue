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
					<div
						class="__select"
						v-if="isShowSelect"
					>
						<div class="__question">{{ selectQuestion }}</div>
						<div class="__time">
							Remaining: <span>{{ remainingTime }}</span>
						</div>
						<div class="__selectOptions">
							<div
								class="__option"
								v-for="(i, idx) in voteOptions"
								:key="idx"
								@click="selectVoteOption(i)"
							>
								{{ i.optionValue }}
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Vote',
	data() {
		return {
			isShowDetail: false,
			isShowSelect: false,
			myEcharts: null,
			selectedVote: null,
			timer: null,
			remainingTime: '',
		}
	},
	props: ['isShowVote'],
	computed: {
		showSelectOrDetail() {
			return false
		},
		voteOptions() {
			const { voteOptions } = this.selectedVote
			return voteOptions ? voteOptions : null
		},
		selectQuestion() {
			return this.selectedVote.question
		},
		user() {
			return this.$store.state.enter.userLogin
		},
		...mapGetters('vote', {
			voteList: 'votes',
		}),
	},
	methods: {
		selectVoteOption(option) {
			if (!this.selectedVote.isInValidTime()) {
				alert('Time out')
        this.isShowDetail = true
        this.isShowSelect = false
        this.charts(this.convert(this.selectedVote))
				return
			}
			const voteResult = {
				vote: this.selectedVote,
				user: this.user,
				option,
			}
			this.isShowSelect = false
			this.isShowDetail = true
			this.$emit('onSubmitVote', { voteResult })
		},
		showDetail(vote) {
			if (vote.isInValidTime() && vote.hasVoted(this.user)) {
				this.isShowSelect = true
				this.selectedVote = vote
				this.remainingTime = this.selectedVote.remainingTime()
				this.timer = setInterval(() => {
					this.remainingTime = this.selectedVote.remainingTime()
				}, 1000)
			} else {
				this.isShowDetail = true
				this.selectedVote = vote
				this.charts(this.convert(this.selectedVote))
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
			if (this.isShowSelect) {
				this.isShowSelect = !this.isShowSelect
			} else if (this.isShowDetail) {
				this.myEcharts.dispose()
				this.isShowDetail = !this.isShowDetail
				this.timer = null
			} else if (!this.isShowDetail && !this.isShowSelect) {
				this.$emit('getCloseVote', false)
			}
		},
		convert(vote) {
			let { question, voteOptions } = vote
			voteOptions = voteOptions.map(vo => {
				return {
					...vo,
					name: vo.optionValue,
					value: vo.selectMembersId.length,
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
			handler(newV, oldV) {
				if (!this.selectedVote) return
				const { id } = this.selectedVote
				this.selectedVote = this.voteList.find(v => {
					return v.id === id
				})
				if (this.myEcharts) {
					this.myEcharts.dispose()
				}
				if (this.selectedVote) {
					this.charts(this.convert(this.selectedVote))
				}
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
	/* background-color: #41414192; */
	position: absolute;
	top: 10%;
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
	font-size: 120%;
	font-weight: 600;
}

.__select .__time {
	color: white;
}
.__select .__time span {
	font-size: 90%;
	padding-left: 20px;
}
.__select .__selectOptions {
	width: 90%;
	height: 100%;
	overflow: scroll;
	margin-top: 5%;
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
