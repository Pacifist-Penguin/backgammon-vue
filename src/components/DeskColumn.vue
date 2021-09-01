<template>
	<ul :style="{ 'background-color: #0000FF': isPositive, 'background-color: #BF3EFF': !isPositive }" class="column">
		<li v-for="(draughts, index) in columnLength" :key="index">
			<draught-figure :draughtNumber="draughtNumber" :indexOfColumnOnDesk="indexOfColumnOnDesk" />
		</li>
	</ul>
</template>

<script>
import DraughtFigure from "@/components/DraughtFigure";
export default {
	components: {
		DraughtFigure,
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
		isPositive() {
			return this.indexOfColumnOnDesk % 2 === 0;
		},
	},
};
</script>

<style scoped>
.column {
	display: block;
	height: 50px;
	list-style: none;
}
</style>
