<template>
	<modal-outer>
		<h1>Congtrats, {{ winner }} won!</h1>
	</modal-outer>
</template>

<script>
import ModalOuter from "@/components/ModalOuter.vue";
export default {
	name: "ModalGameEnd",
	components: {
		ModalOuter
	},
	props: {
		winner: {
			type: Boolean,
			required: true
		}
	}
};
</script>
