<template>
	<h1>
		Hi! It's game called "backgammon", widely popular on east. It's "short" version because i didn't like "long"
		version.
	</h1>
	<button v-show="turnOf === null" @click="firstGameRoll">And the first turn will belong to:</button>
	{{ turnOf }}
	<h3 v-show="askedForRerroll && turnOf === null">Wow, rolls are equal, please try rerrolling</h3>
	{{ indexOfSelectedDraught }}
	<div class="desk">
		<div class="rowContainer" style="display: flex">
			<div class="firstRow" style="display: flex">
				<span v-for="(draughtNumber, index) in firstRow" v-bind:key="index">
					<draught-figure @selected="select" :indexOfColumnOnDesk="index" :draughtNumber="draughtNumber" />
				</span>
			</div>
		</div>
		<div class="rowContainer">
			<div class="secondRow" style="display: flex">
				<span v-for="(draughtNumber, index) in secondRow" v-bind:key="index">
					<draught-figure
						@selected="select"
						:indexOfColumnOnDesk="index + 12"
						:draughtNumber="draughtNumber"
					/>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import DraughtFigure from "@/components/DraughtFigure.vue";
export default {
	name: "App",
	components: {
		DraughtFigure,
	},
	data() {
		return {
			//contains position of all draughts
			//upper-right corner -> upper left -> bottom left -> bottom right
			//positive numbers represents light draughts, negative numbers represents dark
			desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
			turnOf: null, //true === light, false == darks
			minRoll: 1,
			maxRoll: 6,
			askedForRerroll: false,
			turnsLeft: 0,
			firstRoll: 0,
			secondRoll: 0,
			selected: false,
			indexOfSelectedDraught: 0,
			indexOfSelectedColumn: 0,
		};
	},
	computed: {
		firstRow() {
			return this.desk.slice(0, 12); //it's reversed in CSS
		},
		secondRow() {
			return this.desk.slice(12, 24);
		},
		rollsAreEqual() {
			return this.firstRoll === this.secondRoll;
		},
		darkHome() {
			return this.desk.slice(0, 6);
		},
		lightHome() {
			return this.desk.slice(18, 24);
		},
		possibleToGetIn() {
			return this.turnOf === true ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		},
		canGetIn() {
			return this.turnOf === true
				? this.darkHome.some((el) => el === this.fristRoll || this.secondRoll)
				: this.lightHome.some((el) => el === this.firstRoll || this.secondRoll);
		},
		ifThereIsAvailablePositions() {
			return this.turnOf === true
				? this.desk[this.indexOfSelectedDraught + this.firstRoll] >= -1 ||
						this.desk[this.indexOfSelectedDraught + this.secondRoll] >= -1
				: this.desk[this.indexOfSelectedDraught - this.firstRoll] <= 1 ||
						this.desk[this.indexOfSelectedDraught - this.secondRoll] <= 1;
		},
		ifColumnAvailable() {
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
				this.turnOf = true; //first turn is the turn of lights
			} else if (this.firstRoll < this.secondRoll) {
				this.turnOf = false; //first turn is the turn of darks
			} else {
				this.askedForRerroll = true;
			}
		},
		select(target) {
			this.indexOfSelectedDraught = target;
			this.selected = true;
		},
		moveDraught() {
			if (this.ifColumnAvailable) {
				if (this.turnOf === true) {
					if (this.desk[this.indexOfSelectedColumn] === -1) {
						this.darksOutOfGame++;
						this.desk[this.indexOfSelectedColumn]++;
					}
					this.desk[this.indexOfSelectedDraught]--;
					this.desk[this.indexOfSelectedColumn]++;
				} else {
					if (this.desk[this.indexOfSelectedColumn] === 1) {
						this.lightsOutOfGame++;
						this.desk[this.indexOfSelectedColumn]--;
					}
					this.desk[this.indexOfSelectedDraught]++;
					this.desk[this.indexOfSelectedColumn]--;
				}
				this.turnsLeft--;
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

<style scoped>
.firstRow {
	display: flex;
	flex-direction: row-reverse;
	height: 300px;
}
.secondRow {
	display: flex;
	height: 300px;
}
.rowContainer {
	display: flex;
}
</style>
