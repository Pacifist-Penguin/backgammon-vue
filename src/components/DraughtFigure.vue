<template>
	<ul style="display: block; height: 50px; list-style: none">
		<li v-for="(draughts, index) in column" :key="index" @click="selectDraught">
			<svg style="width: 10px" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<circle cx="60" cy="60" r="50" :fill="draughtColor" />
			</svg>
			{{ indexOfColumnOnDesk }}
		</li>
	</ul>
</template>

<script>
export default {
	name: "draught",
	props: {
		draughtNumber: {
			type: Number,
			required: true,
			default: 0,
		},
		indexOfColumnOnDesk: {
			type: Number,
			required: true,
		},
	},
	computed: {
		draughtColor() {
			return this.draughtNumber > 0 ? "red" : "black";
		},
		column() {
			return Math.abs(this.draughtNumber);
		},
	},
	methods: {
		selectDraught() {
			this.$emit("selected", this.indexOfColumnOnDesk);
			console.log("selected", this.indexOfColumnOnDesk);
		},
	},
};
</script>
