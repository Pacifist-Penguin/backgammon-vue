<template>
	<div class="center modal">
		<div><h1>{{text}}</h1></div>
		<button ref="button" @click="firstGameRoll">Roll!</button>
	</div>
</template>

<style scoped>
	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.modal {
		width: 100vmin;
		height: 100vmin;
		background-color: rgba(255, 255, 255, 0.7);
	}
	.modal > * {
		margin-right: auto;
		margin-left: auto;
		display: flex;
	}
</style>

<script>
export default {
	name: "ModalPick",
	data() {
		return {
			ifLightsTurnFirst: null,
			askedForRerroll: false,
			text: "Roll! Winner gets first try"
		}
	},
	emits: {
		firstTurnOf: (bool) => typeof bool === "boolean"
	},
	props: {
		roll: {
			type: Function,
			required: true
		}
	},
	mounted() {
		this.$refs.button.focus() //focuses on button after mounting. Very handy actually.
	},
	methods: {
		firstGameRoll() {
			const firstRoll = this.roll();
			const secondRoll = this.roll();
			if (firstRoll > secondRoll) {
				this.ifLightsTurnFirst = true; //first turn is the turn of lights
			} else if (firstRoll < secondRoll) {
				this.ifLightsTurnFirst = false; //first turn is the turn of darks
			} else {
				this.askedForRerroll = true;
			}
		},
	},
	watch: {
		roll: function() {
			if (ifLightsTurnFirst != null) {
				this.$emit("firstTurnOf", this.ifLightsTurnFirst);
			}
		},
		askedForRerroll: function() {
			if (askedForRerroll) {
				this.text = "Draw! U should roll it once again"
			}
		}
	}
}
</script>