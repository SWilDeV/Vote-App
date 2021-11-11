const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const db = mongojs(
	"mongodb+srv://sean:123@cluster0.j8qqj.mongodb.net/Votes?retryWrites=true&w=majority",
	["Votes"]
);

//get all votes
router.get("/votes", function (req, res, next) {
	db.Votes.find(function (err, votes) {
		if (err) {
			res.send(err);
		}

		res.json(votes);
	});
});

//get single vote
router.get("/votes/:id", function (req, res, next) {
	db.Votes.findOne(
		{ _id: mongojs.ObjectId(req.params.id) },
		function (err, Vote) {
			if (err) {
				res.send(err);
			}
			res.json(Vote);
		}
	);
});

//Save Vote
router.post("/votes", function (req, res, next) {
	var vote = req.body.text;
	if (!vote.vote || !(vote.isDone + "")) {
		res.status(400);
		res.json({
			error: "bad data",
		});
	} else {
		
		db.Votes.save(vote, res.json(vote));
	}
});

router.route("/count").get(async function (req, res, next) {
	let resultTotal = [];
	await db.Votes.count({ vote: "Lionel Messi" }, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			resultTotal.push({ Messi: result });
		}
	});
	await db.Votes.count({ vote: "Christiano Ronaldo" }, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			resultTotal.push({ Ronaldo: result });
		}
	});
	await db.Votes.count({ vote: "Zidane" }, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			resultTotal.push({ Zidane: result });
		}
	});
	await db.Votes.count({ vote: "Maradona" }, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			resultTotal.push({ Maradona: result });
		}
	});
	await db.Votes.count({ vote: "Your Grandma" }, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			resultTotal.push({ Grandma: result });
		}
		res.send(resultTotal);
	});
});

module.exports = router;
