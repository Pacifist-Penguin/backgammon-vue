<template>
	<modal-outer>
		<div>Darks: {{ darksScore }}</div>
		<div>Lights: {{ lightsScore }}</div>
		<button @click="closeThisModal">Close me</button>
	</modal-outer>
</template>

<script>
import ModalOuter from "@/components/ModalOuter.vue";
export default {
	name: "Modal Post Game",
	components: {
		ModalOuter
	},
	props: {
		darksScore: {
			type: Number,
			required: true
		},
		lightsScore: {
			type: Number,
			required: true
		}
	},
	methods: {
		closeThisModal() {
			this.$emit("hideMe");
		}
	}
};
</script>
