window.onload = function(){
	var oneVar = (function(){
		var money = document.getElementsByClassName('money-text');
		var moneySound = document.getElementById('money-sound');
		var chachingSound = document.getElementById('chaching-sound');
		var restart = document.getElementById('restart');
		var give = document.getElementById('give');
		var custText = document.getElementById('cust-text');
		var compText = document.getElementById('comp-text');
		var changeText = document.getElementById('change-text');
		var changeMaker = 0;
	
		var apple = {
			name: 'apple',
			price: 3.23
		};
		var cake = {
			name: 'cake',
			price: 0.25
		};
		var grape = {
			name: 'grape',
			price: 3.23
		};

		var items = [apple, cake, grape];

		for(let i = 0; i < money.length; i++){
			console.log(money[i]);
			money[i].addEventListener('click', function(){
				console.log(money[i].innerHTML)
				moneySound.play();
				switch(money[i].innerHTML){
					case "$ 20":
						changeMaker += 20;
					break;
					case "$ 10":
						changeMaker += 10;
					break;
					case "$ 5":
						changeMaker += 5;
					break;
					case "$ 1":
						changeMaker += 1;
					break;
					case "25 c":
						changeMaker += 0.25;
					break;
					case "10 c":
						changeMaker += 0.10;
					break;
					case "5 c":
						changeMaker += 0.05;
					break;
					case "1 c":
						changeMaker += 0.01000;
				}
				console.log(changeMaker);
				changeText.innerHTML = changeMaker.toFixed(2);
			})
		}

		function compSpeech(speech){
			compText.innerHTML = speech;
		}
		function custSpeech(speech){
			custText.innerHTML = speech;
		}	

		function startScene(){
			var randomNum = Math.floor(Math.random() * items.length);
			console.log(items[randomNum]);
			var item = items[randomNum];
			var num = Math.floor(Math.random() * 100);
			console.log(num);
			var total = num * item.price;
			var randPayout = Math.floor(Math.random() * 20 + total);
			var change = randPayout - changeMaker;
			console.log(change)	

			var script = (function() {
				var custDialogue = (function() {
					// Item to buy
					var speech1 = (function(){
						var dialogue;
						if (num != 1) {
							dialogue = "Hi! I want to buy " + num + " " + item.name + "s.";
						} else {
							dialogue = "Hi! I want to buy " + num + " " + item.name + ".";
						}
						return dialogue;
					})();

					// Money paid.
					var speech2 = "Here is $" + randPayout.toFixed(2) + "!";

					var dialogue = {
						dialogue1 : speech1,
						dialogue2 : speech2
					}
					return dialogue;
				})();

				var compDialogue = (function() {
					// Cost
					var speech1 = "That will be $" + total.toFixed(2) + ".";
					// Change
					var speech2 = "Your change will be $" + change.toFixed(2) + ".";

					var dialogue = {
						giveTotal : speech1,
						giveChange : speech2
					}
					return dialogue;
				})();

				var talkingSet = {
					cust: custDialogue,
					comp: compDialogue
				}
				return talkingSet;
			})();

			restart.addEventListener('click', function(){
				console.log('restart');
				changeMaker = 0;
				changeText.innerHTML = changeMaker;
			})
			give.addEventListener('click', function(){
				if (changeMaker == change.toFixed(2)) {
					chachingSound.play();
					compSpeech(script.comp.giveChange)
					custSpeech("Thanks!")
				}else{
					console.log(changeMaker + " " + change.toFixed(2));
				}
			})
			setTimeout(custSpeech.bind(null, script.cust.dialogue1), 2000)
			setTimeout(compSpeech.bind(null, script.comp.giveTotal), 4000)
			setTimeout(custSpeech.bind(null, script.cust.dialogue2), 6000)
		}
		startScene()
	})();
}