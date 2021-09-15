<template>
	<header>
		<audio controls loop autoplay id="228">
			<source src="@/assets/sound/music.ogg" />
		</audio>
		<h1>Backgammon</h1>
		<p>
			As you may guess, it's game called "backgammon". It's widely popular on east. It's "short" version because i
			didn't like "long" version. Actually, long version is whole another game, and this game is really stupid
		</p>
	</header>
	<game-desk @won="score" />
</template>

<script>
import GameDesk from "@/components/GameDesk.vue";
export default {
	name: "App",
	components: {
		GameDesk
	},
	methods: {
		score(value) {
			if (value === true) {
				console.log("light won");
			} else {
				console.log("dark won");
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
