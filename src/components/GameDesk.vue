<template>
	<div>
		<h1 v-show="ifTurnOfLight != null">{{ ifTurnOfLight ? "Lights" : "Darks" }}</h1>
		<div class="desk-n-leaved-figures">
			<!-- draughtNumber is hardcoded only to spawn draught of proper color -->
			<div class="dead-figures">
				<draught-figure
					@selected="selectDeadDraught"
					v-for="(items, index) in deadLights"
					:key="index"
					:draughtNumber="1"
					:indexOfColumnOnDesk="index"
				/>
			</div>
			<div class="dead-figures">
				<draught-figure
					@selected="selectDeadDraught"
					v-for="(items, index) in deadDarks"
					:key="index"
					:draughtNumber="-1"
					:indexOfColumnOnDesk="index"
				/>
			</div>
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
			</div>
			<div @click="getOut" class="light leavedFigures">
				<draught-figure
					@selected="selectDeadDraught"
					v-for="(items, index) in lightsOut"
					:key="index"
					:draughtNumber="1"
					:indexOfColumnOnDesk="index"
				/>
			</div>
			<div @click="getOut" class="dark leavedFigures">
				<draught-figure
					@selected="selectDeadDraught"
					v-for="(items, index) in darksOut"
					:key="index"
					:draughtNumber="-1"
					:indexOfColumnOnDesk="index"
				/>
			</div>
		</div>

		<div>
			<rolling-dice v-for="(items, index) in leftTurns" :key="index" :roll="leftTurns[index].value" />
		</div>
	</div>
</template>

<script>
import DeskColumn from "@/components/DeskColumn.vue";
import DraughtFigure from "@/components/DraughtFigure.vue";
import RollingDice from "@/components/RollingDice.vue";
// the following const is here only to improve DRY
// IDK if it's any good practice for other reasons
// but i dont feel like repeating this lines of code
const initalStates = () => {
	return {
		desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
		ifTurnOfLight: null, //true === light, false === darks
		minRoll: 1,
		maxRoll: 6,
		askedForRerroll: false,
		rolls: [
			{
				value: 1,
				used: false
			},
			{
				value: 1,
				used: false
			}
		],
		indexOfSelectedDraught: null,
		indexOfSelectedColumn: null,
		deadLights: 0,
		deadDarks: 0,
		lightsOut: 0,
		darksOut: 0,
		modalVisible: true
	};
};

export default {
	name: "GameDesk",
	components: {
		DeskColumn,
		DraughtFigure,
		RollingDice
	},
	emits: {
		won: (value) => typeof value === "object"
		// emits winner, true = lights, false = darks
	},
	props: {
		firstTurnOf: {
			//it's Boolean OR null
			required: true
		}
	},
	created() {
		this.beginningOfTheGame(this.firstTurnOf);
	},
	data: initalStates,
	computed: {
		firstRow() {
			return this.desk.slice(0, 12); //it's reversed in CSS
		},
		secondRow() {
			return this.desk.slice(12, 24);
		},
		darkHome() {
			return this.desk.slice(0, 6);
		},
		lightHome() {
			return this.desk.slice(18, 24);
		},
		rollsAreEqual() {
			return this.rolls[0].value === this.rolls[1].value;
		},
		indexesOfAllLights() {
			return this.desk.reduce((arr, el, index) => (el >= 1 && arr.push(index), arr), []);
		},
		indexesOfAllDarks() {
			return this.desk.reduce((arr, el, index) => (el <= -1 && arr.push(index), arr), []);
		},
		indexesOfCurrentPlayer() {
			return this.ifTurnOfLight ? this.indexesOfAllLights : this.indexesOfAllDarks;
		},
		ifAllFiguresOfCurrentPlayerIsInHome() {
			const reducer = (previousValue, currentValue) => previousValue + currentValue;
			let home;
			if (this.ifTurnOfLight) {
				const filteredHome = this.lightHome.filter((el) => el > 0);
				if (filteredHome.length > 0) {
					home = filteredHome.reduce(reducer) + this.lightsOut === 15;
				}
			} else {
				const filteredHome = this.darkHome.filter((el) => el < 0);
				if (filteredHome.length > 0) {
					home = filteredHome.reduce(reducer) - this.darksOut === -15;
				}
			}
			return home;
		},
		positionsAvailableForDark() {
			const positions = [];
			const arr = this.indexesOfAllDarks; //contains indexes of all darks AND dead darks if there is one or more
			if (this.deadDarks != 0) {
				arr.push(24);
			}
			for (let index = 0; index < this.leftTurns.length; index++) {
				const roll = this.leftTurns[index].value;
				arr.forEach((positionOfCurrentElement) => {
					if (this.desk[positionOfCurrentElement + roll] <= 1) {
						positions.push(positionOfCurrentElement + roll);
					}
				});
			}
			return positions;
		},
		positionsAvailableForLights() {
			const positions = [];
			const arr = this.indexesOfAllLights;
			if (this.deadLights != 0) {
				arr.push(-1);
			}
			for (let index = 0; index < this.leftTurns.length; index++) {
				const roll = this.leftTurns[index].value;
				arr.forEach((positionOfCurrentElement) => {
					if (this.desk[positionOfCurrentElement + roll] >= -1) {
						positions.push(positionOfCurrentElement + roll);
					}
				});
			}

			return positions;
		},
		positionsAvailableForCurrentPlayer() {
			return this.ifTurnOfLight ? this.positionsAvailableForLights : this.positionsAvailableForDark;
		},
		positionsPossiblyAvailableForSelectedDraught() {
			let arr = [];
			this.leftTurns.forEach((roll) => {
				arr.push(this.indexOfSelectedDraught + roll.value);
			});
			return arr;
		},
		positionsAvailableForSelectedDraught() {
			return this.positionsAvailableForCurrentPlayer.filter((indexes) =>
				this.positionsPossiblyAvailableForSelectedDraught.includes(indexes)
			);
		},
		positionsAvailableForDeadDraughtOfCurrentPlayer() {
			return this.ifTurnOfLight
				? this.positionsPossiblyAvailableForSelectedDraught.filter((index) => this.desk[index] >= -1)
				: this.positionsPossiblyAvailableForSelectedDraught.filter((index) => this.desk[index] <= 1);
		},
		possibleToGetIn() {
			return this.ifTurnOfLight ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		},
		ifSelectedColumnOccupiedByOnlyOneDraught() {
			return this.ifTurnOfLight
				? this.desk[this.indexOfSelectedColumn] === -1
				: this.desk[this.indexOfSelectedColumn] === 1;
		},
		canGetInLightHome() {
			const positions = [];
			const arr = this.lightHome;
			arr.reverse();
			this.leftTurns.forEach((roll) => {
				roll = Math.abs(roll.value);
				if (arr[roll - 1] <= 1) {
					positions.push(roll);
				}
			});
			return positions;
		},
		canGetInDarkHome() {
			const positions = [];
			this.leftTurns.forEach((roll) => {
				if (this.darkHome[roll.value - 1] >= -1) {
					positions.push(roll.value);
				}
			});
			return positions;
		},
		canGetIn() {
			return this.ifTurnOfLight ? this.canGetInDarkHome : this.canGetInLightHome;
		},
		needToGetIn() {
			return this.ifTurnOfLight ? this.deadLights != 0 : this.deadDarks != 0;
		},
		leftTurns() {
			return this.rolls.filter((roll) => roll.used === false);
		},
		highestIndexInHomeOfCurrentPlayer() {
			let highestIndexInHomeOfCurrentPlayer;
			const query = this.ifTurnOfLight ? (item) => item >= 1 : (item) => item <= -1;
			const home = this.ifTurnOfLight ? this.lightHome : this.darkHome;
			highestIndexInHomeOfCurrentPlayer = home;
			highestIndexInHomeOfCurrentPlayer.reverse();
			highestIndexInHomeOfCurrentPlayer = Math.abs(highestIndexInHomeOfCurrentPlayer.findIndex(query) - 6);
			if (highestIndexInHomeOfCurrentPlayer === -1) {
				highestIndexInHomeOfCurrentPlayer = undefined;
			}
			return highestIndexInHomeOfCurrentPlayer;
			//returned index represents only the position of draught INSIDE player's home
		},
		ifSelectedDraughtIsDraughtOfCurrentPlayer() {
			return this.ifTurnOfLight
				? this.desk[this.indexOfSelectedDraught] > 0
				: this.desk[this.indexOfSelectedDraught] < 0;
		},
		validValuesToGetOutIfSelectedDraughtHaveHighestIndex() {
			if (this.ifCurrentlySelectedDraughtIsHighestInItsHome) {
				return this.ifTurnOfLight
					? this.leftTurns.filter((turn) => turn.value >= this.localIndexOfSelectedDraught)
					: this.leftTurns.filter((turn) => turn.value <= this.localIndexOfSelectedDraught);
			} else {
				return [];
			}
		},
		localIndexOfSelectedDraught() {
			//refering to localIndexOfSelectedDraught in player's home
			return this.ifTurnOfLight ? Math.abs(this.indexOfSelectedDraught - 24) : -(this.indexOfSelectedDraught + 1);
		},
		ifCurrentlySelectedDraughtIsHighestInItsHome() {
			return Math.abs(this.localIndexOfSelectedDraught) === this.highestIndexInHomeOfCurrentPlayer;
		},
		waysToGetOutForSelectedDraught() {
			if (this.ifAllFiguresOfCurrentPlayerIsInHome && this.ifSelectedDraughtIsDraughtOfCurrentPlayer) {
				// this "if" statement is here is only to save up a resources.
				// Otherwise we w'd have to filter this 2 arrays every time any of used variables changes
				return this.leftTurns.filter((turn) => turn.value === this.localIndexOfSelectedDraught);
			} else {
				return [];
			}
		}
	},
	methods: {
		setToInitialState() {
			Object.assign(this.$data, initalStates());
		},
		roll() {
			const action = Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1);
			if (this.ifTurnOfLight) {
				return action; //returns positive because we need to equate positive numbeers in first roll.
			} else {
				return -action; //returns negative because it's needed for darks going in opposite direction
				//Or if it's turn of dark
			}
		},
		beginningOfTheGame(value) {
			this.ifTurnOfLight = value;
			this.modalVisible = false;
			this.beginningOfTheTurn();
		},
		beginningOfTheTurn() {
			let firstRoll = this.roll();
			let secondRoll = this.roll();
			this.rolls = [
				{
					value: firstRoll,
					used: false
				},
				{
					value: secondRoll,
					used: false
				}
			];
			if (this.rollsAreEqual) {
				this.rolls[2] = { value: firstRoll, used: false };
				this.rolls[3] = { value: firstRoll, used: false };
			}
		},
		theEndOfTurn() {
			this.indexOfSelectedDraught = null;
			this.indexOfSelectedColumn = null;
			this.ifTurnOfLight = !this.ifTurnOfLight;
		},
		selectDraught(target) {
			this.indexOfSelectedDraught = target;
		},
		selectDeadDraught() {
			this.ifTurnOfLight ? (this.indexOfSelectedDraught = -1) : (this.indexOfSelectedDraught = 24);
		},
		selectColumn(target) {
			this.indexOfSelectedColumn = target;
			if (this.ifTurnOfLight ? this.deadLights : this.deadDarks) {
				this.ressurect();
			} else {
				this.moveDraught();
			}
		},
		hitOpponentsDraught() {
			if (this.ifTurnOfLight) {
				this.desk[this.indexOfSelectedColumn]++;
				this.deadDarks++;
			} else {
				this.desk[this.indexOfSelectedColumn]--;
				this.deadLights++;
			}
		},
		relocateDraught() {
			if (this.ifTurnOfLight) {
				this.desk[this.indexOfSelectedDraught]--;
				this.desk[this.indexOfSelectedColumn]++;
			} else {
				this.desk[this.indexOfSelectedDraught]++;
				this.desk[this.indexOfSelectedColumn]--;
			}
		},
		moveDraught() {
			if (this.positionsAvailableForSelectedDraught.includes(this.indexOfSelectedColumn)) {
				if (this.ifSelectedColumnOccupiedByOnlyOneDraught) {
					this.hitOpponentsDraught();
				}
				this.relocateDraught();
				this.useRoll(this.indexOfSelectedColumn - this.indexOfSelectedDraught);
			}
		},
		useRoll(value) {
			const wastedTurnIndex = this.rolls.findIndex((i) => {
				return i.value === value && i.used === false;
			});
			this.rolls[wastedTurnIndex].used = true;
		},
		ressurect() {
			if (this.canGetIn.length > 0) {
				const moveDistance = Math.abs(this.indexOfSelectedDraught - this.indexOfSelectedColumn);
				if (this.canGetIn.includes(moveDistance)) {
					if (this.ifSelectedColumnOccupiedByOnlyOneDraught) {
						this.hitOpponentsDraught();
					}
					if (this.ifTurnOfLight) {
						this.desk[this.indexOfSelectedColumn]++;
						this.deadLights--;
						this.useRoll(this.indexOfSelectedColumn + 1);
					} else {
						this.desk[this.indexOfSelectedColumn]--;
						this.deadDarks--;
						this.useRoll(this.indexOfSelectedColumn - 24);
					}
				}
				//it's + 1 because every dead figure is like on 'start' of the game
				//and darks starts at 0, but to get here u have to roll at least 1
				//24 is length of desk
				//example: dark figure starts at desk[23], 23-24 = -1
				//since there is Math.abs(), it returns 1, so our useRoll is looking for unused roll with value === 1
			}
		},
		getOut() {
			let useThisRoll;
			if (this.ifTurnOfLight) {
				if (this.waysToGetOutForSelectedDraught.length > 0) {
					useThisRoll = this.waysToGetOutForSelectedDraught[0];
					this.desk[this.indexOfSelectedDraught]--;
					this.lightsOut++;
					this.useRoll(useThisRoll.value);
				} else if (
					this.ifCurrentlySelectedDraughtIsHighestInItsHome &&
					this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex.length > 0
				) {
					useThisRoll = this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex[0];
					this.desk[this.indexOfSelectedDraught]--;
					this.lightsOut++;
					this.useRoll(useThisRoll.value);
				}
			} else {
				if (this.waysToGetOutForSelectedDraught.length > 0) {
					useThisRoll = this.localIndexOfSelectedDraught;
					this.desk[this.indexOfSelectedDraught]++;
					this.darksOut++;
					this.useRoll(useThisRoll);
				} else if (
					this.ifCurrentlySelectedDraughtIsHighestInItsHome &&
					this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex.length > 0
				) {
					useThisRoll = this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex[0];
					this.darksOut++;
					this.desk[this.indexOfSelectedDraught]++;
					this.useRoll(useThisRoll.value);
				}
			}
		},
		score(winner) {
			let ifOpponentHaventQuit; // checks if opponent havent quit yet
			let ifWinnersHouseContainsOpponentsFigures; // checks if winner's player home contains opponent's draughts
			let score;
			if (winner === true) {
				ifOpponentHaventQuit = this.darksOut === 0;
				ifWinnersHouseContainsOpponentsFigures = () =>
					this.lightHome.some((position) => position < 0) || this.deadDarks != 0;
			} else {
				ifOpponentHaventQuit = this.lightsOut === 0;
				ifWinnersHouseContainsOpponentsFigures = () =>
					this.darkHome.some((position) => position > 0) || this.deadLights != 0;
			}
			if (ifOpponentHaventQuit) {
				if (ifWinnersHouseContainsOpponentsFigures()) {
					score = 3;
				} else {
					score = 2;
				}
			} else {
				score = 1;
			}
			this.$emit("won", { score: score, winner: winner });
			this.setToInitialState();
		}
	},
	watch: {
		leftTurns: function () {
			if (this.leftTurns.length === 0) {
				this.theEndOfTurn();
				this.beginningOfTheTurn();
			}
		},
		possibleToGetIn: function () {
			if (this.needToGetIn && !this.possibleToGetIn) {
				console.log("not possible to get in");
				this.theEndOfTurn();
				this.beginningOfTheTurn();
			}
		},
		canGetIn: function () {
			if (this.needToGetIn && this.canGetIn.length === 0) {
				this.theEndOfTurn();
				this.beginningOfTheTurn();
			}
		},
		darksOut: function () {
			if (this.darksOut === 15) {
				this.score(false);
			}
		},
		lightsOut: function () {
			if (this.lightsOut === 15) {
				this.score(true);
			}
		},
		positionsAvailableForCurrentPlayer() {
			if (this.positionsAvailableForCurrentPlayer.length === 0 && !this.ifAllFiguresOfCurrentPlayerIsInHome) {
				this.theEndOfTurn();
				this.beginningOfTheTurn();
			}
		}
	}
};
</script>

<style scoped>
.desk {
	background-color: var(--desk-color);
	display: inline-block;
	border: solid 1vmin var(--desk-color);
}
.firstRow {
	display: flex;
	flex-direction: row-reverse;
	height: 35vh;
}
.secondRow {
	display: flex;
	height: 35vh;
}
.secondRow > * > * {
	display: flex;
	flex-direction: column-reverse;
}
.rowContainer {
	display: flex;
}
.desk-n-leaved-figures {
	display: flex;
}
.leavedFigures,
.dead-figures {
	min-height: 1rem;
	min-width: 1.6rem;
	border: 1px solid var(--border-color);
	display: flex;
	background-color: var(--dead-draught-zone-color);
	flex-direction: column;
}
.leavedFigures {
	background-color: var(--exit-color);
	border: 1px solid var(--border-color);
}
</style>
