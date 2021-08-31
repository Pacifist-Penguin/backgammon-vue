<template>
	<h1>
		Hi! It's game called "backgammon", widely popular on east. It's "short" version because i didn't like "long"
		version.
	</h1>
	<button v-show="turnOf === null" @click="firstGameRoll">And the first turn will belong to:</button>
	{{ turnOf }}
	<div>
		<span v-for="(position, index) in firstRow" v-bind:key="index">{{ position }}</span>
	</div>
	<div>
		<span v-for="(position, index) in secondRow" v-bind:key="index">{{ position }}</span>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			//contains position of all draughts
			//upper-right corner -> upper left -> bottom left -> bottom right
			//positive numbers are light draughts, negative numbers is dark
			desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
			turnOf: null, //true === light, false == darks
			minRoll: 1,
			maxRoll: 6,
			turnsLeft: 0,
			firstRoll: 0,
			secondRoll: 0,
			selected: false,
			indexOfSelectedDraught: 0,
		};
	},
	computed: {
		firstRow() {
			return this.desk.slice(0, 12).reverse();
		},
		secondRow() {
			return this.desk.slice(12, 24);
		},
		rollsAreEqual() {
			return this.firstRoll === this.secondRoll;
		},
		canGetIn() {
			return "";
		},
		ifThereIsAvailablePositions() {
			return this.turnOf === true
				? this.desk[this.indexOfSelectedDraught + this.firstRoll] >= -1 ||
						this.desk[this.indexOfSelectedDraught + this.secondRoll] >= -1
				: this.desk[this.indexOfSelectedDraught - this.firstRoll] <= 1 ||
						this.desk[this.indexOfSelectedDraught - this.secondRoll] <= 1;
		},
	},
	methods: {
		roll() {
			return Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1);
		},
		begginingOfTheTurn() {
			this.firstRoll = this.roll();
			this.secondRoll = this.roll();
			if (this.ifThereIsAvailablePositions) {
				if (this.rollsAreEqual) {
					this.turnsLeft = 4;
				} else {
					this.turnsLeft = 2;
				}
			} else {
				this.theEndOfTurn();
			}
		},
		firstGameRoll() {
			this.firstRoll = this.roll();
			this.secondRoll = this.roll();
			if (this.firstRoll > this.secondRoll) {
				this.turnOf = true; //it's turn of lights
			} else if (this.firstRoll < this.secondRoll) {
				this.turnOf = false; //it's turn of darks
			} else {
				this.askForReroll(); //TODO
			}
		},
		select(target) {
			this.indexOfSelectedDraught = target.value;
			this.selected = true;
		},
		moveDraught() {
			if (this.ifColumnAvailable) {
				if (this.turnOf === true) {
					this.desk[this.indexOfSelectedDraught]--;
				} else {
					this.desk[this.indexOfSelectedDraught]++;
				}
			}
		},
		theEndOfTurn() {
			this.selected = false;
			this.turnsLeft = 0;
			this.turnOf = !this.turnOf;
		},
	},
};
</script>

<style></style>
