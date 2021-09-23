<template>
	<header>
		<audio controls loop autoplay>
			<source src="@/assets/sound/music.ogg" />
		</audio>
		<h1>Backgammon</h1>
		<p>
			As you may guess, it's game called "backgammon". It's widely popular on east. It's "short" version because i
			didn't like "long" version. Actually, long version is whole another game, and this game is really stupid
		</p>
	</header>
	<section>
		<game-desk @won="scoreOnEmit" :firstTurnOf="firstTurnOfIn" />
	</section>
	<modal-pick v-if="modalVisible" @firstTurnOf="begginingOfTheGame" />
</template>

<script>
import GameDesk from "@/components/GameDesk.vue";
import ModalPick from "@/components/ModalPick.vue";

export default {
	name: "App",
	components: {
		GameDesk,
		ModalPick
	},
	data() {
		return {
			score: {
				true: 0, //lights, it's name as bool because i can save lil memory like this
				false: 0 //darks
			},
			firstTurnOfIn: null,
			modalVisible: true
		};
	},
	methods: {
		scoreOnEmit(value) {
			this.score[value.winner] += value.score;
		},
		begginingOfTheGame(value) {
			this.firstTurnOfIn = value;
			this.modalVisible = false;
		}
	},
	watch: {
		score: function () {
			if (this.score.true >= 5) {
				console.log("lights won!");
			} else if (this.score.false >= 5) {
				console.log("darks won!");
			}
		}
	}
};
</script>

<style>
html {
	background-image: url("./assets/images/shashlyk.gif");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
body {
	background-color: rgba(255, 255, 255, 0.6);
}
</style>
