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
		<h1>{{ firstRoll }} {{ secondRoll }}</h1>
		<h1>Turns left: {{ turnsLeft }}</h1>
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
			turnOf: null, //true === light, false == darks
			minRoll: 1,
			maxRoll: 6,
			askedForRerroll: false,
			turnsLeft: 2,
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
			deadDarks: 0
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
			return [
				...this.indexesOfAllDarks.reduce(
					(arr, el) => (this.desk[el - this.firstRoll] <= 1 && arr.push(el - this.firstRoll), arr),
					[]
				),
				...this.indexesOfAllDarks.reduce(
					(arr, el) => (this.desk[el - this.secondRoll] <= 1 && arr.push(el - this.secondRoll), arr),
					[]
				)
			];
		},
		positionsAvailableForLights() {
			return [
				...this.indexesOfAllLights.reduce(
					(arr, el) => (this.desk[el + this.firstRoll] >= -1 && arr.push(el + this.firstRoll), arr),
					[]
				),
				...this.indexesOfAllLights.reduce(
					(arr, el) => (this.desk[el + this.secondRoll] >= -1 && arr.push(el + this.secondRoll), arr),
					[]
				)
			];
		},
		positionsAvialableForLightsNew() {
			const positions = [];
			for (let index = 0; index < this.rolls.length; index++) {
				const roll = this.rolls[index];
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
		positionsAvailableForSelectedDraught() {
			return this.ifTurnOfLight
				? [this.indexOfSelectedDraught + this.firstRoll, this.indexOfSelectedDraught + this.secondRoll]
				: [this.indexOfSelectedDraught - this.firstRoll, this.indexOfSelectedDraught - this.secondRoll];
		},
		possibleToGetIn() {
			return this.ifTurnOfLight ? this.darkHome.some((el) => el >= -1) : this.lightHome.some((el) => el <= 1);
		}
	},
	methods: {
		roll() {
			if (this.ifTurnOLight) {
				return Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1);
			} else {
				return -Math.abs(Math.floor(Math.random() * (this.maxRoll - this.minRoll) + 1));
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
				return;
			}
		},
		begginingOfTheTurn() {
			this.firstRoll = this.roll();
			this.secondRoll = this.roll();
			if ((!this.possibleToGetIn && this.ifPlayerNeedToEnter) || !this.ifAnyPositionIsAvailable) {
				this.theEndOfTurn();
			} else {
				if (this.rollsAreEqual) {
					this.turnsLeft = 4;
				} else {
					this.turnsLeft = 2;
				}
			}
		},
		theEndOfTurn() {
			this.turnsLeft = 0;
			this.indexOfSelectedDraught = null;
			this.indexOfSelectedColumn = null;
			this.turnOf = !this.turnOf;
		},
		selectDraught(target) {
			this.indexOfSelectedDraught = target;
		},
		selectColumn(target) {
			this.indexOfSelectedColumn = target;
		},
		moveDraught() {
			if (this.ifTurnOfLight) {
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
		}
	},
	watch: {
		ifAnyPositionIsAvailable: function () {
			if (!this.ifAnyPositionIsAvailable) {
				this.theEndOfTurn();
				this.begginingOfTheTurn();
			}
		},
		turnsLeft: function () {
			if (this.turnsLeft === 0) {
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
