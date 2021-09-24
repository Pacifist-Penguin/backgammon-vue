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
		<game-desk v-if="firstTurnOfIn != null" @won="scoreOnEmit" :firstTurnOf="firstTurnOfIn" />
	</section>
	<modal-pick v-if="modalVisible" @firstTurnOf="begginingOfTheGame" />
	<modal-post-game
		v-if="postGameModalVisible"
		:lightsScore="score.true"
		:darksScore="score.false"
		@hide-me="hidePostGameModal"
	/>
	<modal-match-end v-if="gameEnded" :winner="winner" />
</template>

<script>
import GameDesk from "@/components/GameDesk.vue";
import ModalPick from "@/components/ModalPick.vue";
import ModalPostGame from "@/components/ModalPostGame.vue";
import ModalMatchEnd from "@/components/ModalMatchEnd.vue";

export default {
	name: "App",
	components: {
		GameDesk,
		ModalPick,
		ModalPostGame,
		ModalMatchEnd
	},
	data() {
		return {
			score: {
				true: 0, //lights, it's named as boolean because i can save lil memory like this
				false: 0 //darks
			},
			firstTurnOfIn: null,
			modalVisible: true,
			postGameModalVisible: false,
			gameEnded: false,
			winner: undefined
		};
	},
	methods: {
		scoreOnEmit(value) {
			this.score[value.winner] += value.score;
			if (this.score[value.winner] >= 5) {
				this.gameEnds();
			} else {
				this.postGameModalVisible = true;
			}
		},
		hidePostGameModal() {
			this.postGameModalVisible = false;
		},
		begginingOfTheGame(value) {
			this.firstTurnOfIn = value;
			this.modalVisible = false;
		},
		gameEnds() {
			this.gameEnded = true;
		}
	},
	watch: {
		score: function () {
			if (this.score.true >= 5) {
				console.log("lights won!");
				this.winner = "lights";
				this.gameEnds();
			} else if (this.score.false >= 5) {
				this.winner = "darks";
				this.gameEnds();
			} else {
				this.postGameModalVisible = true;
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
	font-family: sans-serif;
}
body {
	background-color: rgba(255, 255, 255, 0.6);
	width: 100vw;
	height: 100vh;
	margin: 0px;
}
</style>
