<template>
	<h1>
		Hi! It's game called "backgammon", widely popular on east. It's "short" version because i didn't like "long"
		version.
	</h1>
	<button v-show="turnOf === null" @click="firstGameRoll">And the first turn will belong to:</button>
	{{ turnOf }}
	<h3 v-show="askedForRerroll && turnOf === null">Wow, rolls are equal, please try rerrolling</h3>
	{{ indexOfSelectedDraught }} {{ indexOfSelectedColumn }}
	<div class="desk">
		<div class="rowContainer">
			<div class="firstRow">
				<span v-for="(draughtNumber, index) in firstRow" v-bind:key="index">
					<desk-column
						:draughtNumber="draughtNumber"
						:indexOfColumnOnDesk="index"
						@selectedColumn="selectColumn"
					>
						<draught-figure
							@selected="selectDraught"
							:draughtNumber="draughtNumber"
							:indexOfColumnOnDesk="index"
						/>
					</desk-column>
				</span>
			</div>
		</div>
		<div class="rowContainer">
			<div class="secondRow">
				<span v-for="(draughtNumber, index) in secondRow" v-bind:key="index">
					<desk-column
						:draughtNumber="draughtNumber"
						:indexOfColumnOnDesk="index + 12"
						@selectedColumn="selectColumn"
					>
						<draught-figure
							@selected="selectDraught"
							:draughtNumber="draughtNumber"
							:indexOfColumnOnDesk="index + 12"
						/>
					</desk-column>
				</span>
			</div>
		</div>
		<button @click="moveDraught">move draught</button>
		<h1>Turns left: {{ turnsLeft }}</h1>
	</div>
	<div class="dead-figures">
		<ul class="light-figures">
			<draught-figure
				v-for="(items, index) in deadLights"
				:key="index"
				@selected="selectDraught"
				:draughtNumber="draughtNumber"
				:indexOfColumnOnDesk="index"
			/>
		</ul>
		<ul class="dark-figures">
			<draught-figure
				v-for="(items, index) in deadDarks"
				:key="index"
				:draughtNumber="-1"
				:indexOfColumnOnDesk="index"
			/>
		</ul>
	</div>
</template>

<script>
import DeskColumn from "@/components/DeskColumn.vue";
import DraughtFigure from "@/components/DraughtFigure.vue";
export default {
	name: "App",
	components: {
		DeskColumn,
		DraughtFigure,
	},
	data() {
		return {
			//contains position of all draughts
			//upper-right corner -> upper left -> bottom left -> bottom right
			//positive numbers represents light draughts, negative numbers represents dark
			initialDesk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
			desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
			turnOf: null, //true === light, false == darks
			minRoll: 1,
			maxRoll: 6,
			askedForRerroll: false,
			turnsLeft: 2,
			firstRoll: 0,
			secondRoll: 0,
			indexOfSelectedDraught: null,
			indexOfSelectedColumn: null,
			deadLights: 0,
			deadDarks: 0,
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
		indexesOfAllLights() {
			return this.desk.reduce((arr, el, index) => (el >= 1 && arr.push(index), arr), []);
		},
		indexesOfAllDarks() {
			return this.desk.reduce((arr, el, index) => (el <= -1 && arr.push(index), arr), []);
		},
		indexesOfCurrentPlayer() {
			return this.turnOf === true ? this.indexesOfAllLights : this.indexesOfAllDarks;
		},
		positionsAvailableForDark() {
			return this.indexesOfAllDarks.reduce(
				(arr, el, index) => ((el - this.firstRoll || el - this.secondRoll <= -1) && arr.push(index), arr),
				[]
			);
		},
		positionsAvailableForLights() {
			return this.indexesOfAllLights.reduce(
				(arr, el, index) => (
					(this.desk[el + this.firstRoll] || this.desk[el + this.secondRoll] >= 1) && arr.push(index), arr
				),
				[]
			);
		},
		positionsAvailableForCurrentPlayer() {
			return this.turnOf === true ? this.positionsAvailableForLights : this.positionsAvailableForDark;
		},
		possibleToGetIn() {
			return this.turnOf === true ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		},
		canGetIn() {
			return this.turnOf === true
				? this.darkHome.some((el) => el === this.fristRoll || this.secondRoll)
				: this.lightHome.some((el) => el === this.firstRoll || this.secondRoll);
		},
		firstTargetForLight() {
			return this.desk[this.indexOfSelectedDraught + this.firstRoll];
		},
		secondTargetForLight() {
			return this.desk[this.indexOfSelectedDraught + this.secondRoll];
		},
		firstTargetForDark() {
			return this.desk[this.indexOfSelectedDraught - this.firstRoll];
		},
		secondTargetForDark() {
			return this.desk[this.indexOfSelectedDraught - this.secondRoll];
		},
		ifPlayerNeedToEnter() {
			return this.turnOf === true ? this.deadLights === 0 : this.deadDarks === 0;
		},
		ifThereIsAvailablePositionsForSelectedDraught() {
			return this.turnOf === true
				? this.firstTargetForLight >= -1 || this.secondTargetForLight >= -1
				: this.firstTargetForDark <= 1 || this.secondTargetForDark <= 1;
		},
		ifAnyPositionIsAvailable() {
			return this.ifPlayerNeedToEnter === true
				? this.possibleToGetIn
				: this.positionsAvailableForCurrentPlayer.length > 0;
		},
	},
	methods: {
		roll() {
			return Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1);
		},
		begginingOfTheTurn() {
			this.firstRoll = this.roll();
			this.secondRoll = this.roll();
			if (!this.possibleToGetIn && this.ifPlayerNeedToEnter) {
				this.theEndOfTurn();
			} else {
				if (this.ifAnyPositionIsAvailable) {
					if (this.rollsAreEqual) {
						this.turnsLeft = 4;
					} else {
						this.turnsLeft = 2;
					}
				} else {
					this.theEndOfTurn();
				}
			}
		},
		theEndOfTurn() {
			this.turnsLeft = 0;
			this.indexOfSelectedDraught = null;
			this.indexOfSelectedColumn = null;
			this.turnOf = !this.turnOf;
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
				return;
			}
		},
		selectDraught(target) {
			this.indexOfSelectedDraught = target;
		},
		selectColumn(target) {
			this.indexOfSelectedColumn = target;
			if (this.ifColumnAvailable) {
				this.moveDraught();
			}
		},
		moveDraught() {
			if (this.turnOf === true) {
				if (this.desk[this.indexOfSelectedColumn] === -1) {
					this.deadDarks++;
					this.desk[this.indexOfSelectedColumn]++;
				}
				this.desk[this.indexOfSelectedDraught]--;
				this.desk[this.indexOfSelectedColumn]++;
			} else {
				if (this.desk[this.indexOfSelectedColumn] === 1) {
					this.deadLights++;
					this.desk[this.indexOfSelectedColumn]--;
				}
				this.desk[this.indexOfSelectedDraught]++;
				this.desk[this.indexOfSelectedColumn]--;
			}
			this.turnsLeft--;
		},
	},
	watch: {
		ifAnyPositionIsAvailable: function () {
			if (!this.ifAnyPositionIsAvailable) {
				this.turnsLeft = 0;
				this.indexOfSelectedDraught = null;
				this.indexOfSelectedColumn = null;
				this.turnOf = !this.turnOf;
			}
		},
		turnsLeft: function () {
			if (this.turnsLeft === 0) {
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
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
