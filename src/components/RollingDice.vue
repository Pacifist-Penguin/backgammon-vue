<template>
	<img class="dice" :src="imagesUrl" />
</template>

<script>
export default {
	name: "Dice",
	props: {
		roll: {
			type: Number,
			required: true
		}
	},
	computed: {
		imagesUrl() {
			return require(`@/assets/images/dice_rolls/dice${Math.abs(this.roll)}.svg`); //Math.Abs makes sure component wouldnt break on Dark's turn
		}
	}
};
</script>

<style scoped>
.dice {
	height: 20vh;
}
</style>
