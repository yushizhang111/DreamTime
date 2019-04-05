function check_achievements(image) {
	if (localStorage.getItem("artquiz") &&
		localStorage.getItem("histquiz") &&
		localStorage.getItem("quiz")) {
		// the user finished the 3 tests with success
		// display a message box
		swal({
			title: "Congratulations!",
			text: "You have collected all the puzzles and won a THROPHY!",
			button: "I'm a genius!",
			icon: "../images/puzzleicon.png"
		});
	} else {
		swal({
			title: "Good job!",
			text: "You have earned a puzzle!",
			button: "Aww yes!",
			icon: image
		});
		
	}
}
