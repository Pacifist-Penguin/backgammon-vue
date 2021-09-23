<template>
	<modal-outer>
		<div class="modalBody">
			<h1>{{ text }}</h1>
			<button ref="button" @click="firstGameRoll">Roll!</button>
		</div>
	</modal-outer>
</template>

<script>
import ModalOuter from "@/components/ModalOuter.vue";

export default {
	name: "ModalPick",
	components: {
		ModalOuter
	},
	emits: {
		firstTurnOf: (bool) => typeof bool === "boolean"
	},
	data() {
		return {
			ifLightsTurnFirst: null,
			askedForRerroll: false,
			text: "Roll! Winner gets first try"
		};
	},
	mounted() {
		this.$refs.button.focus(); //focuses on button after mounting. Very handy actually.
	},
	methods: {
		roll() {
			const roll = Math.floor(Math.random() * (6 - 1) + 1);
			return roll;
		},
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
		}
	},
	watch: {
		ifLightsTurnFirst: function () {
			if (this.ifLightsTurnFirst != null) {
				this.$emit("firstTurnOf", this.ifLightsTurnFirst);
			}
		},
		askedForRerroll: function () {
			if (this.askedForRerroll) {
				this.text = "Draw! U should roll it once again";
			}
		}
	}
};
</script>
<style scoped>
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
