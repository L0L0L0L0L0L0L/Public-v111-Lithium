/*
	Name:	Persian Cat
	Map:	Showa Village
	Description:	801000000
*/

var questions = new Array("Which of the following items is not dropped by the raccoon cat?", "In the ancient shrine, how many places have the character 'mushroom' written on them?", "Which of the items in the ancient shrine increases attack power?", "Which of the following items is real?", "Which item does not exist?", "What is the name of the vegetable store owner in Showa Town?", "Which of these items is real?", "What are the words written outside the fish shop in Showa Village?", "Which item description is incorrect?", "Which of these is not the ramen sold by Yuan Tai in the ancient shrine?", "Who is the NPC in front of the Showa Cinema?")
var answers = new Array(new Array("Raccoon Cat Firewood", "Unicorn Horn", "Red Brick"), new Array("6", "5", "4"), new Array("Takoyaki", "Fujian Noodles", "Flour"), new Array("Crow Droppings", "Yellow Umbrella", "Camel Egg"), new Array("Frozen Fish", "Ice Breaking Magic Spear", "Fly Swatter"), new Array("Sami", "Kami", "Yumi"), new Array("Cloud Fox Tooth", "Bouquet", "Cloud Fox Tail"), new Array("Flourishing", "20% Off", "Welcome"), new Array("Bamboo Spear - Warrior's Only Weapon", "Rubber Hammer - One-Handed Sword", "Dragon Back Blade - Two-Handed Sword"), new Array("Egg Fried Noodles", "Japanese Fried Noodles", "Mushroom Special Ramen"), new Array("Wu Dalang", "Chibi Maruko", "Eri Ka"));

var correctAnswer = new Array(1, 1, 0, 1, 2, 2, 2, 0, 0, 2, 2);

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status < 1) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(8012)).getStatus() != 1 || cm.getPlayer().itemQuantity(4031064)) {
				cm.sendOk("Meow meow meow~!");
				cm.dispose();
				return;
			}
			cm.sendYesNo("Just to clarify, if you're ready to answer my questions, you need to prepare 300 pieces of fried chicken.");
			break;
		case 1:
			if (cm.getPlayer().itemQuantity(2020001) < 300) {
				cm.sendOk("What? No! If you want the bead, you need to get 300 pieces of fried chicken first. I'm just an animal, not as generous as you.");
				cm.dispose();
				return;
			}
			cm.gainItem(2020001, -300);
			cm.sendNext("Well done! Now it's time for me to ask you some questions. Remember, if you get any wrong, you will have to start over with everything you’ve given me!");
			break;
		default:
			if (status > 2)
				if (selection != correctAnswer.pop()) {
					cm.sendNext("Meow~! Everyone makes mistakes! If you want to try again, bring me 300 pieces of fried chicken.");
					cm.dispose();
					return;
				}
			questionNum = Math.floor(Math.random() * questions.length);
			if (questionNum != (questions.length - 1)) {
				var temp;
				temp = questions[questionNum];
				questions[questionNum] = questions[questions.length - 1];
				questions[questions.length - 1] = temp;
				temp = answers[questionNum];
				answers[questionNum] = answers[questions.length - 1];
				answers[questions.length - 1] = temp;
				temp = correctAnswer[questionNum];
				correctAnswer[questionNum] = correctAnswer[questions.length - 1];
				correctAnswer[questions.length - 1] = temp;
			}
			var question = questions.pop();
			var answer = answers.pop();
			var prompt = "Question " + (status - 1) + ":\t" + question;
			for (var i = 0; i < answer.length; i++)
				prompt += "\r\n#L" + i + "##b" + answer[i] + "#l";
			cm.sendSimple(prompt);
			break;
		case 7:
			if (selection != correctAnswer.pop()) {
				cm.sendOk("Meow~! You made a mistake. If you want to try again, bring me 300 pieces of fried chicken.");
				cm.dispose();
				return;
			}
			cm.sendNext("Meow~! You answered all the questions correctly. Although I might not like humans, I don't want to break a promise, so here is #v4031064##t4031064#.");
			break;
		case 8:
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the other item window"));
				cm.dispose();
				return;
			}
			cm.gainItem(4031064, 1);
			cm.sendOk("Our business is concluded. Thank you very much. You may leave now.");
			cm.dispose();
	}
}
