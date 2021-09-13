<template>
	<header>
		<h1>Backgammon</h1>
		<p>
			As you may guess, it's game called "backgammon". It's widely popular on east. It's "short" version because i
			didn't like "long" version. Actually, long version is whole another game, and this game is really stupid
		</p>
	</header>
	<button v-show="turnOf === null" @click="firstGameRoll">And the first turn will belong to:</button>
	<h1 v-show="turnOf != null">{{ turnOf ? "Lights" : "Darks" }}</h1>
	<h3 v-show="askedForRerroll && turnOf === null">Wow, rolls are equal, please try rerrolling</h3>
	{{ indexOfSelectedDraught }} {{ indexOfSelectedColumn }}
	<div>
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
			<h1>
				<span v-for="(items, index) in leftTurns" :key="index">{{ leftTurns[index].value }}</span>
			</h1>
			<h1>Turns left: {{ leftTurns.length }}</h1>
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

	<div class="dead-figures">
		<ul class="light-figures">
			<draught-figure
				@selected="selectDeadDraught"
				v-for="(items, index) in deadLights"
				:key="index"
				:draughtNumber="1"
				:indexOfColumnOnDesk="index"
			/>
		</ul>
		<ul class="dark-figures">
			<draught-figure
				@selected="selectDeadDraught"
				v-for="(items, index) in deadDarks"
				:key="index"
				:draughtNumber="-1"
				:indexOfColumnOnDesk="index"
			/>
			<!-- draughtNumber set only to make it proper color -->
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
		DraughtFigure
	},
	data() {
		return {
			//contains position of all draughts
			//upper-right corner -> upper left -> bottom left -> bottom right
			//positive numbers represents light draughts, negative numbers represents dark
			//desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
			desk: [-1,-2,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
			turnOf: null, //true === light, false === darks
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
			lightsOut: 11,
			darksOut: 10
		};
	},
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
		ifTurnOfLight() {
			return this.turnOf === true;
		},
		indexesOfAllLights() {
			return this.desk.reduce((arr, el, index) => (el >= 1 && arr.push(index), arr), []);
		},
		indexesOfAllDarks() {
			return this.desk.reduce((arr, el, index) => (el <= -1 && arr.push(index), arr), []);
		},
		indexesOfCurrentPlayer() {
			return this.ifTurnOfLight
				? this.indexesOfAllLights
				: this.ifTurnOfLight === false
				? this.indexesOfAllDarks
				: null;
		},
		ifAllFiguresOfCurrentPlayerIsInHome() {
			const reducer = (previousValue, currentValue) => previousValue + currentValue;
			return this.ifTurnOfLight
				? this.lightHome.reduce(reducer) + this.lightsOut === 15
				: this.darkHome.reduce(reducer) - this.darksOut === -15;
		},
		positionsAvailableForDark() {
			const positions = [];
			for (let index = 0; index < this.leftTurns.length; index++) {
				const roll = this.leftTurns[index].value;
				this.indexesOfAllDarks.forEach((positionOfCurrentElement) => {
					if (this.desk[positionOfCurrentElement + roll] <= 1) {
						positions.push(positionOfCurrentElement + roll);
					}
				});
			}
			return positions;
		},
		positionsAvailableForLights() {
			const positions = [];
			for (let index = 0; index < this.leftTurns.length; index++) {
				const roll = this.leftTurns[index].value;
				this.indexesOfAllLights.forEach((positionOfCurrentElement) => {
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
		positionsAvailableForSelectedDeadDraught() {
			return this.ifTurnOfLight
				? this.positionsPossiblyAvailableForSelectedDraught.filter((index) => this.desk[index] >= -1)
				: this.positionsPossiblyAvailableForSelectedDraught.filter((index) => this.desk[index] <= 1);
		},
		possibleToGetIn() {
			return this.ifTurnOfLight ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		},
		leftTurns() {
			return this.rolls.filter((roll) => roll.used === false);
		},
		highestIndexInHomeOfCurrentPlayer() {
			let highestIndexInHomeOfCurrentPlayer;
			if (this.ifTurnOfLight) {
				highestIndexInHomeOfCurrentPlayer = this.lightHome.findIndex((item) => item >= 1);
			} else {
				highestIndexInHomeOfCurrentPlayer = this.darkHome;
				highestIndexInHomeOfCurrentPlayer.reverse();
				highestIndexInHomeOfCurrentPlayer = Math.abs(
					highestIndexInHomeOfCurrentPlayer.findIndex((item) => item <= -1) - 6
				);
			}
			return highestIndexInHomeOfCurrentPlayer;
			//returned index represents only the position of draught INSIDE player's home
			//it means if we want to get to know about actual index, we would need to make
			//aditional calculations
		},
		ifSelectedDraughtIsDraughtOfCurrentPlayer() {
			return this.ifTurnOfLight
				? this.desk[this.indexOfSelectedDraught] > 0
				: this.desk[this.indexOfSelectedDraught] < 0;
		}
	},
	methods: {
		roll() {
			const action = Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1);
			if (this.turnOf === true || this.turnOf === null) {
				return action; //returns positive because we need to equate positive numbeers in first roll.
			} else {
				return -action; //returns negative because it's needed for darks going in opposite direction
				//Or if it's turn of dark
			}
		},
		firstGameRoll() {
			this.rolls[0].value = this.roll();
			this.rolls[0].used = false;
			this.rolls[1].value = this.roll();
			this.rolls[1].used = false;

			if (this.rolls[0].value > this.rolls[1].value) {
				this.turnOf = true; //first turn is the turn of lights
			} else if (this.rolls[0].value < this.rolls[1].value) {
				this.turnOf = false; //first turn is the turn of darks
			} else {
				this.askedForRerroll = true;
				return;
			}
			this.askedForRerroll = false;
			this.begginingOfTheTurn();
		},
		begginingOfTheTurn() {
			let firstRoll = this.roll();
			let secondRoll = this.roll();
			this.rolls[0] = {
				value: firstRoll,
				used: false
			};
			this.rolls[1] = {
				value: secondRoll,
				used: false
			};
			if (this.rollsAreEqual) {
				this.rolls[2] = { value: firstRoll, used: false };
				this.rolls[3] = { value: firstRoll, used: false };
			}
		},
		theEndOfTurn() {
			this.indexOfSelectedDraught = null;
			this.indexOfSelectedColumn = null;
			this.turnOf = !this.turnOf;
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
		moveDraught() {
			if (this.positionsAvailableForSelectedDraught.includes(this.indexOfSelectedColumn)) {
				if (this.ifTurnOfLight) {
					if (this.desk[this.indexOfSelectedColumn] === -1) {
						this.desk[this.indexOfSelectedColumn]++;
						this.deadDarks++;
					}
					this.desk[this.indexOfSelectedDraught]--;
					this.desk[this.indexOfSelectedColumn]++;
					this.useRoll(this.indexOfSelectedColumn - this.indexOfSelectedDraught);
				} else {
					if (this.desk[this.indexOfSelectedColumn] === 1) {
						this.desk[this.indexOfSelectedColumn]--;
						this.deadLights++;
					}
					this.desk[this.indexOfSelectedDraught]++;
					this.desk[this.indexOfSelectedColumn]--;
					this.useRoll(-(this.indexOfSelectedDraught - this.indexOfSelectedColumn));
				}
			}
		},
		useRoll(value) {
			const wastedTurnIndex = this.rolls.findIndex((i) => {
				return i.value === value && i.used === false;
			});
			this.rolls[wastedTurnIndex].used = true;
		},
		ressurect() {
			if (this.positionsAvailableForSelectedDeadDraught.includes(this.indexOfSelectedColumn)) {
				if (this.ifTurnOfLight) {
					this.desk[this.indexOfSelectedColumn]++;
					this.deadLights--;
					this.useRoll(this.indexOfSelectedColumn + 1);
					//it's + 1 because every dead figure is like on 'start' of the game
					//and darks starts at 0, but to get here u have to roll at least 1
				} else {
					this.desk[this.indexOfSelectedColumn]--;
					this.deadDarks--;
					this.useRoll(this.indexOfSelectedColumn - 24);
					//24 is length of desk
					//example: dark figure starts at desk[23], 23-24 = -1
					//since there is Math.abs(), it returns 1, so our useRoll is looking for unused roll with value === 1
				}
			}
		},
		getOut() {
			if (this.ifAllFiguresOfCurrentPlayerIsInHome && this.ifSelectedDraughtIsDraughtOfCurrentPlayer) {
				if (this.ifTurnOfLight) {
					const selectedDraughtsLocalIndex = Math.abs(this.indexOfSelectedDraught - 24);
					console.log(
						this.leftTurns.filter((turn) => turn.value === selectedDraughtsLocalIndex).length > 0,
						"if there is available equal roll to selected index"
					);
					console.log(
						(
							selectedDraughtsLocalIndex === this.highestIndexInHomeOfCurrentPlayer &&
							this.leftTurns.filter((turn) => turn.value >= selectedDraughtsLocalIndex)
						).length > 0,
						"if selected index is highest and there is >= roll available"
					);
					if (
						this.leftTurns.filter((turn) => turn.value === selectedDraughtsLocalIndex).length > 0 ||
						(
							selectedDraughtsLocalIndex === this.highestIndexInHomeOfCurrentPlayer &&
							this.leftTurns.filter((turn) => turn.value >= selectedDraughtsLocalIndex)
						).length > 0
					) {
						const correctRoll = this.leftTurns.filter((turn) => turn.value >= selectedDraughtsLocalIndex);
						this.desk[this.indexOfSelectedDraught]--;
						this.lightsOut++;
						this.useRoll(Math.abs(correctRoll[0].value));
					}
				} else {
					const selectedDraughtsLocalIndex = this.indexOfSelectedDraught + 1;
					if (
						this.leftTurns.filter((turn) => turn.value === -selectedDraughtsLocalIndex).length > 0 ||
						(selectedDraughtsLocalIndex === this.highestIndexInHomeOfCurrentPlayer &&
							this.leftTurns.filter((turn) => turn.value <= -selectedDraughtsLocalIndex).length > 0)
					) {
						const correctRoll = this.leftTurns.filter((turn) => turn.value <= -selectedDraughtsLocalIndex);
						console.log(correctRoll);
						this.desk[this.indexOfSelectedDraught]++;
						this.darksOut++;
						this.useRoll(correctRoll[0].value);
					}
				}
			}
		}
	},
	watch: {
		leftTurns: function () {
			if (this.leftTurns.length === 0) {
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
		},
		possibleToGetIn: function () {
			if (this.needToGetIn && !this.possibleToGetIn) {
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
		},
		darksOut: function () {
			if (this.darksOut === 15) {
				console.log("dark won");
			}
		},
		lightsOut: function () {
			if (this.lightsOut === 15) {
				console.log("light won");
			}
		}
	}
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
.secondRow > * > * {
	display: flex;
	flex-direction: column-reverse;
}
.rowContainer {
	display: flex;
}
.leavedFigures {
	min-height: 10px;
	background-color: yellow;
	border: 1px solid blue;
}
</style>
