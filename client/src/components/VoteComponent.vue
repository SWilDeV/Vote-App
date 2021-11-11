<template>
	<div>
		<div class="container">
			<div class="col-md-4"></div>

			<div class="col-md-4">
				<div class="card card-primary">
					<div class="card-header">
						<h3 class="card-header">
							<span class="fa fa-line-chart"></span> Best soccer player Poll
						</h3>
						<h3 class="card-body">
							<form action="/action_page.php">
								<input v-model="username" placeholder="Your Name" />
							</form>
						</h3>
					</div>
					<div class="card-block">
						<ul class="list-group">
							<select v-model="selected" class="list-group-item">
								<option disabled value="">Please select one</option>
								<option>Lionel Messi</option>
								<option>Christiano Ronaldo</option>
								<option>Zidane</option>
								<option>Maradona</option>
								<option>Your Grandma</option>
							</select>
						</ul>
					</div>
					<div class="card-footer text-xs-center">
						<button
							type="button"
							class="btn btn-primary btn-block btn-sm"
							@click="newVote"
						>
							Vote
						</button>
						<a href="#" class="small" @click="getAllVotes">View Result</a>
					</div>
				</div>
			</div>
		</div>
		<div>
			<span>Votes: {{ votes }}</span>
		</div>
	</div>
</template>

<script>
import APIService from "./api";
export default {
	name: "VoteComponent",
	data() {
		return {
			votes: "",
			username: "",
			selected: "",
		};
	},
	methods: {
		async newVote() {
			try {
				const Vote = {
					username: this.username,
					vote: this.selected,
					isDone: true,
				};
				//console.log(Vote);
				await APIService.insertVote(Vote);
			} catch (e) {
				console.log(e);
			}
		},
		async getAllVotes() {
			try {
				this.votes = await APIService.getVotes();
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>

<style scoped>
body {
	margin-top: 20px;
}

.panel-body:not(.two-col) {
	padding: 0px;
}

.glyphicon {
	margin-right: 5px;
}

.glyphicon-new-window {
	margin-left: 5px;
}

.panel-body .radio,
.panel-body .checkbox {
	margin-top: 0px;
	margin-bottom: 0px;
}

.panel-body .list-group {
	margin-bottom: 0;
}

.margin-bottom-none {
	margin-bottom: 0;
}

.panel-body .radio label,
.panel-body .checkbox label {
	display: block;
}
</style>
