<template>
	<div class="center modalOuter">
		<div class="modalBody">
			<slot></slot>
		</div>
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
.modalBody {
	margin-right: auto;
	margin-left: auto;
	text-align: center;
	display: block;
	height: 10vmin;
	margin-top: calc(50% - 10vmin);
	margin-bottom: calc(50% - 10vmin);
}
</style>
