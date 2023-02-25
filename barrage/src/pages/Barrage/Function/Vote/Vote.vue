<template>
    <transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
        leave-active-class="animate__animated animate__fadeOutUp animate__faster">
        <div class="box_son" v-if="isShowVote"
            :style="{'background':this.global.getIsSun()?'rgba(0, 0, 0, 0.478)':'linear-gradient(to right, #62605d 0%, #304352 100%)'}">
            <div class="body">
                <div class="back" @click="back">
                    <img src="../../images/leftBack.png" alt="">
                </div>
                <transition enter-active-class="animate__animated animate__fadeInRight animate__faster"
                    leave-active-class="animate__animated animate__fadeOutUp animate__faster">
                    <div class="historyVote" v-if="!isShowDetail">
                        <div class="historyVoteItem" @click="showDetail">几点下课</div>
                        <div class="historyVoteItem" @click="showDetail">几点吃饭</div>
                        <div class="historyVoteItem" @click="showDetail">讲的对不对</div>
                        <div class="historyVoteItem" @click="showDetail">要不要做作业</div>
                        <div class="historyVoteItem" @click="showDetail">什么时候考试</div>
                    </div>
                </transition>

                <transition enter-active-class="animate__animated animate__fadeInUp animate__faster"
                    leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
                    <div class="historyVoteDetail" id="cartsArea" v-if="isShowDetail"></div>
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
                myEcharts: null
            }
        },
        props: ['isShowVote'],
        methods: {
            showDetail() {
                this.isShowDetail = true
                this.charts()
            },
            charts() {
                let np = new Promise((resolve, reject) => {
                    resolve()
                })
                np.then(() => {
                    this.myEcharts = this.echarts.init(document.getElementById('cartsArea'))
                    let option = {
                        title: {
                            show: true,
                            text: 'TestTestTestTestTest',
                            textStyle: {
                                fontSize: '20px',
                                color: 'white',
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            selectedMode: false,
                            type: 'scroll'
                        },
                        series: [{
                            name: 'Test',
                            type: 'pie',
                            left: '0',
                            center: ['40%', '60%'],
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            data: [{
                                    value: 1048,
                                    name: '吃饭'
                                },
                                {
                                    value: 735,
                                    name: '睡觉'
                                },
                                {
                                    value: 580,
                                    name: '上课'
                                },
                                {
                                    value: 484,
                                    name: '健身'
                                },
                                {
                                    value: 300,
                                    name: '约会'
                                },
                                {
                                    value: 100,
                                    name: '洗澡'
                                },
                                {
                                    value: 300,
                                    name: '做作业'
                                }


                            ]
                        }]
                    };
                    this.myEcharts.setOption(option);
                })


            },
            back() {
                if (this.isShowDetail == true) {
                    this.myEcharts.dispose();
                    this.isShowDetail = false
                } else if (this.isShowDetail == false) {
                    this.$emit('getCloseVote', false)
                }
            }
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
        top: 10%;
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
        top: 2%;
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
        top: 25%;
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
        width: 25%;
        height: 60%;
        background-color: #41414192;
        border-radius: 10%;
        margin: 5px 5px;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 10px;
        /* padding: 0 2px 0 2px; */

        overflow: scroll;
    }

    .box_son .body .historyVoteDetail {
        position: absolute;
        top: 25%;
        left: 10%;
        width: 90%;
        height: 70%;
    }
</style>