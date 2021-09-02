<template>
	<ul @click="selectColumn" :style="`background-color: ${computedStyle} `" class="column">
		<li v-for="(draughts, index) in columnLength" :key="index">
			<slot></slot>
		</li>
	</ul>
</template>

<script>
export default {
	emits: {
		selectedColumn: (value) => typeof value === "number",
	},
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
		columnLength() {
			return Math.abs(this.draughtNumber);
		},
		computedStyle() {
			return this.indexOfColumnOnDesk % 2 === 0 ? "#0000FF" : "#BF3EFF";
		},
	},
	methods: {
		selectColumn() {
			this.$emit("selectedColumn", this.indexOfColumnOnDesk);
			console.log("selected Column number:", this.indexOfColumnOnDesk);
		},
	},
};
</script>

<style scoped>
.column {
	display: block;
	height: 100%;
	list-style: none;
	margin: 0;
	width: 50px;
}
</style>
