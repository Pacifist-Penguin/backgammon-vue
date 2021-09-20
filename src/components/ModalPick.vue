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
	props: {
		roll: {
			type: Function,
			required: true
			/*
			roll is passed only for demonstration purposes. Still, i'd like to mention
			that u shouldnt use "this" in passed-in (as a prop) function, because
			it will work with context of child component, and most of the time
			u dont want that to happen
			this also stops ur component from being "independant" and reusable
			*/
		}
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
