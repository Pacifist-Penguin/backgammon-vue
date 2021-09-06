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
	<div class="dead-figures">
		<ul class="light-figures">
			<draught-figure
				v-for="(items, index) in deadLights"
				:key="index"
				:draughtNumber="1"
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
			darksOut: 0
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
		positionsAvailableForDark() {
			const positions = [];
			for (let index = 0; index < this.leftTurns.length; index++) {
				const roll = this.leftTurns[index];
				this.indexesOfAllLights.forEach((positionOfCurrentElement) => {
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
				const roll = this.leftTurns[index];
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
			//[this.indexOfSelectedDraught + this.rolls[0], this.indexOfSelectedDraught + this.rolls[1]];
			//if we got double roll we wouldnt need to check 3th & 4th because every single roll is the same
		},
		positionsAvailableForSelectedDraught() {
			return this.positionsPossiblyAvailableForSelectedDraught.filter((indexes) =>
				this.positionsAvailableForCurrentPlayer.includes(indexes)
			);
		},
		possibleToGetIn() {
			return this.ifTurnOfLight ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		},
		leftTurns() {
			return this.rolls.filter((roll) => roll.used === false);
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
			this.rolls[0] = {
				value: this.roll(),
				used: false
			};
			this.rolls[1] = {
				value: this.roll(),
				used: false
			};
			if (this.rollsAreEqual) {
				this.rolls[2] = this.rolls[3] = this.rolls[0];
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
		selectColumn(target) {
			this.indexOfSelectedColumn = target;
			this.moveDraught();
		},
		moveDraught() {
			if (this.positionsAvailableForSelectedDraught.includes(this.indexOfSelectedColumn)) {
				if (this.turnOfLight) {
					if (this.desk[this.indexOfSelectedColumn === -1]) {
						this.indexOfSelectedColumn++;
						this.deadDarks++;
					}
					this.indexOfSelectedDraught--;
					this.indexOfSelectedColumn++;
				} else {
					if (this.desk[this.indexOfSelectedColumn === 1]) {
						this.indexOfSelectedColumn--;
						this.deadLights++;
					}
					this.indexOfSelectedDraught++;
					this.indexOfSelectedColumn--;
				}
				const wastedTurnIndex = this.rolls.findIndex(
					(i) =>
						i.value === Math.abs(this.indexOfSelectedDraught - this.indexOfSelectedColumn) &&
						i.used === false
				);
				this.rolls[wastedTurnIndex].used = true;
			}
		},
		useRoll(value) {
			const wastedTurnIndex = this.rolls.findIndex(
				(i) => i.value === value && i.used === false
				//it's -1 because every dead figure is like on 'start' of the game
			);
			this.rolls[wastedTurnIndex].used = true;
		},
		ressurect() {
			/*
			IF light ressurects:
			range of index ressurections: 0 - 5
			IF dark ressurects:
			range of index ressurections: 23 - 18
			*/
			if (this.turnOfLight) {
				this.desk[this.indexOfSelectedColumn]++;
				this.deadLights--;
				const wastedTurnIndex = this.rolls.findIndex(
					(i) => i.value === this.indexOfSelectedColumn - 1 && i.used === false
					//it's -1 because every dead figure is like on 'start' of the game
				);
				this.rolls[wastedTurnIndex].used = true;
			} else {
				this.desk[this.indexOfSelectedColumn]--;
				this.deadDarks--;
			}
			const wastedTurnIndex = this.rolls.findIndex(
				(i) => i.value === Math.abs(this.indexOfSelectedColumn - 23 - 1) && i.used === false
			);
			this.rolls[wastedTurnIndex].used = true;
		},
		getOut() {
			if (this.turnOfLight) {
				this.desk[this.indexOfSelectedDraught]--;
				this.lightsOut++;
			} else {
				this.desk[this.indexOfSelectedDraught]++;
				this.darksOut++;
			}
			const wastedTurnIndex = this.rolls.findIndex(
				(i) => i.value === Math.abs(-1 - this.indexOfSelectedColumn) && i.used === false
				//it's -1 because every dead figure is like on 'start' of the game
			);
			this.rolls[wastedTurnIndex].used = true;
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
</style>
