<template>
	<div class="modal-backdrop">
		<div class="modal-body">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-body {
	text-align: center;
}
</style>
