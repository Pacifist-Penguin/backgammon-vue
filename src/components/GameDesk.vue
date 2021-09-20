<template>
	<div>
		<modal-outer v-if="modalVisible">
			<modal-pick :roll="roll" @firstTurnOf="begginingOfTheGame" />
		</modal-outer>
		<h1 v-show="turnOf != null">{{ turnOf ? "Lights" : "Darks" }}</h1>
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
			</div>
			<h1>
				<span v-for="(items, index) in leftTurns" :key="index">
					<rolling-dice :roll="leftTurns[index].value" />
				</span>
			</h1>
			<h1>Turns left: {{ leftTurns.length }}</h1>
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
	</div>
</template>

<script>
import DeskColumn from "@/components/DeskColumn.vue";
import DraughtFigure from "@/components/DraughtFigure.vue";
import ModalPick from "@/components/ModalPick.vue";
import ModalOuter from "@/components/ModalOuter.vue"
import RollingDice from "@/components/RollingDice.vue";

export default {
	name: "GameDesk",
	components: {
		DeskColumn,
		DraughtFigure,
		ModalPick,
		ModalOuter,
		RollingDice
	},
	emits: {
		won: (value) => typeof value === "boolean"
		// emits winner, true = lights, false = darks
	},
	data() {
		return {
			//contains position of all draughts
			//upper-right corner -> upper left -> bottom left -> bottom right
			//positive numbers represents light draughts, negative numbers represents dark
			desk: [2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2],
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
			lightsOut: 0,
			darksOut: 0,
			modalVisible: true
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
			//return this.ifTurnOfLight ? this.-1 : (this.indexOfSelectedDraught = 24);
		},
		possibleToGetIn() {
			return this.ifTurnOfLight ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
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
			if (this.ifTurnOfLight) {
				const arr = [];
				this.lightHome.forEach((item, index) => {
					if (item >= 1) {
						arr.push(index);
					}
				});
				highestIndexInHomeOfCurrentPlayer = arr.reverse()[0] + 1;
				//highestIndexInHomeOfCurrentPlayer = arr.findIndex((item) => item >= 1);
			} else {
				highestIndexInHomeOfCurrentPlayer = this.darkHome;
				highestIndexInHomeOfCurrentPlayer.reverse();
				highestIndexInHomeOfCurrentPlayer = Math.abs(
					highestIndexInHomeOfCurrentPlayer.findIndex((item) => item <= -1) - 6
				);
				if (highestIndexInHomeOfCurrentPlayer === -1) {
					highestIndexInHomeOfCurrentPlayer = undefined;
				}
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
		begginingOfTheGame(value) {
			this.turnOf = value;
			this.modalVisible = false;
			this.begginingOfTheTurn();
		},
		begginingOfTheTurn() {
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
			if (this.canGetIn.length > 0) {
				const moveDistance = this.indexOfSelectedDraught - this.indexOfSelectedColumn;
				if (this.ifTurnOfLight) {
					if (this.canGetIn.includes(Math.abs(moveDistance))) {
						if (this.desk[this.indexOfSelectedColumn] === -1) {
							this.desk[this.indexOfSelectedColumn]++;
							this.deadDarks++;
						}
						this.desk[this.indexOfSelectedColumn]++;
						this.deadLights--;
						this.useRoll(this.indexOfSelectedColumn + 1);
					}
					//it's + 1 because every dead figure is like on 'start' of the game
					//and darks starts at 0, but to get here u have to roll at least 1
				} else {
					if (this.canGetIn.includes(Math.abs(moveDistance))) {
						if (this.desk[this.indexOfSelectedColumn] === 1) {
							this.desk[this.indexOfSelectedColumn]--;
							this.deadLights++;
						}
						this.desk[this.indexOfSelectedColumn]--;
						this.deadDarks--;
						this.useRoll(this.indexOfSelectedColumn - 24);
					}

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
					if (this.leftTurns.filter((turn) => turn.value === selectedDraughtsLocalIndex).length > 0) {
						let useThisRoll;
						useThisRoll = this.leftTurns.filter((turn) => turn.value === selectedDraughtsLocalIndex)[0];
						this.desk[this.indexOfSelectedDraught]--;
						this.lightsOut++;
						this.useRoll(useThisRoll.value);
					} else {
						if (
							selectedDraughtsLocalIndex === this.highestIndexInHomeOfCurrentPlayer &&
							this.leftTurns.filter((turn) => turn.value >= selectedDraughtsLocalIndex).length > 0
						) {
							let useThisRoll;
							useThisRoll = this.leftTurns.filter((turn) => turn.value >= selectedDraughtsLocalIndex)[0];
							this.desk[this.indexOfSelectedDraught]--;
							this.lightsOut++;
							this.useRoll(useThisRoll.value);
						}
					}
				} else {
					const selectedDraughtsLocalIndex = this.indexOfSelectedDraught + 1;
					let useThisRoll;
					if (this.leftTurns.filter((turn) => turn.value === -selectedDraughtsLocalIndex).length > 0) {
						useThisRoll = -selectedDraughtsLocalIndex;
						this.useRoll(useThisRoll);
						this.darksOut++;
						this.desk[this.indexOfSelectedDraught]++;
					} else if (
						selectedDraughtsLocalIndex === this.highestIndexInHomeOfCurrentPlayer &&
						this.leftTurns.filter((turn) => turn.value <= -selectedDraughtsLocalIndex).length > 0
					) {
						useThisRoll = this.leftTurns.filter((turn) => turn.value <= -selectedDraughtsLocalIndex)[0];
						this.useRoll(useThisRoll.value);
						this.desk[this.indexOfSelectedDraught]++;
						this.darksOut++;
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
				console.log("not possible to get in");
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
		},
		darksOut: function () {
			if (this.darksOut === 15) {
				this.$emit("won", false);
			}
		},
		lightsOut: function () {
			if (this.lightsOut === 15) {
				this.$emit("won", true);
			}
		},
		positionsAvailableForCurrentPlayer() {
			if (this.positionsAvailableForCurrentPlayer.length === 0 && !this.ifAllFiguresOfCurrentPlayerIsInHome) {
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
		}
	}
};
</script>

<style scoped>
.desk {
	background-color: brown;
	display: inline-block;
	border: solid 1vmin brown;
}
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
