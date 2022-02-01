<template>
	<header>
		<h1>Backgammon</h1>
		<p>
			As you may guess, it's game called "backgammon". It's widely popular on east. It's "short" version because i
			didn't like "long" version. Actually, long version is whole another game, and this game is really stupid
		</p>
	</header>
	<main>
		<game-desk v-if="firstTurnOfIn != null" @won="scoreOnEmit" :firstTurnOf="firstTurnOfIn" />
		<modal-pick v-if="modalVisible" @firstTurnOf="begginingOfTheGame" />
		<modal-post-game
			v-if="postGameModalVisible"
			:lightsScore="score.true"
			:darksScore="score.false"
			@hide-me="hidePostGameModal"
		/>
		<modal-match-end v-if="gameEnded" :winner="winner" />
	</main>
	<footer>
		Just a simple project to get a grasp of Vue.
		<a href="https://github.com/NewPirateOfUASeas/backgammon-vue">Source code</a>
	</footer>
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
			this.firstTurnOfIn = value;
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
	}
};
</script>

<style>
:root {
	--background-color: #fff;
	--desk-color: #a52a2a;
	--dark-draught-color: #000;
	--light-draught-color: #ff0000;
	--dead-draught-zone-color: #f5f5dc;
	--exit-color: #ffff00;
	--border-color: #0000ff;
	--1st-column-color: #0000ff;
	--2nd-column-color: #bf3eff;
}

html {
	font-size: 16px;
	font-family: sans-serif;
	background-color: var(--background-color);
}
body {
	margin: 0 auto;
	width: min(50rem, 90%);
	align-content: center;
}
</style>
