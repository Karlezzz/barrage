<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	mounted() {
		//解决safari工具栏挡页面
		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		})
	},
}
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	user-select: none;
}

*::-webkit-scrollbar {
	display: none;
}
/* ios端点击div出现阴影 */
div {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
/* 禁止图片被保存 */
img {
	pointer-events: none;
}
input:focus {
	outline: none;
}

input::-webkit-input-placeholder {
	color: #ffffff;
}

input::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #ffffff;
}

input:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #ffffff;
}

input:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #ffffff;
}


</style>
