<template>
	<div class="center modalOuter">
		<slot></slot>
	</div>
</template>

<style scoped>
.center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.modalOuter {
	width: 100vw;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.7);
}
</style>