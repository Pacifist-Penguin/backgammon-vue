<template>
	<svg
		@click.stop="selectDraught"
		style="width: 25px"
		viewBox="0 0 120 120"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="60" cy="60" r="50" :fill="draughtColor" />
	</svg>
</template>

<script>
export default {
	name: "DraughtFigure",
	emits: {
		selected: (value) => typeof value === "number"
	},
	props: {
		draughtNumber: {
			type: Number,
			default: 0
		},
		indexOfColumnOnDesk: {
			type: Number
		}
	},
	computed: {
		draughtColor() {
			return this.draughtNumber > 0 ? "red" : "black";
		}
	},
	methods: {
		selectDraught() {
			this.$emit("selected", this.indexOfColumnOnDesk);
		}
	}
};
</script>
