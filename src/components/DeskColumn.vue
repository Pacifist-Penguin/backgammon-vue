<template>
	<div @click="selectColumn" :class="computedClass" class="column" :style="`background-color: ${computedStyle} `">
		<div v-for="(draughts, index) in columnLength" :key="index">
			<slot name="default"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "DeskColumn",
	emits: {
		selectedColumn: (value) => typeof value === "number"
	},
	props: {
		draughtNumber: {
			type: Number,
			required: true,
			default: 0
		},
		indexOfColumnOnDesk: {
			type: Number,
			required: true
		}
	},
	computed: {
		columnLength() {
			return Math.abs(this.draughtNumber);
		},
		computedStyle() {
			return this.indexOfColumnOnDesk % 2 === 0 ? "var(--1st-column-color)" : "var(--2nd-column-color)";
		},
		computedClass() {
			return { marginRight: this.indexOfColumnOnDesk === 6 || this.indexOfColumnOnDesk === 17 };
		}
	},
	methods: {
		selectColumn() {
			this.$emit("selectedColumn", this.indexOfColumnOnDesk);
		}
	}
};
</script>

<style scoped>
.column {
	display: block;
	height: 100%;
	list-style: none;
	margin: 0;
	width: max(1.6rem, 3.8vw);
}
.marginRight {
	margin-right: 0.5rem;
}
</style>
