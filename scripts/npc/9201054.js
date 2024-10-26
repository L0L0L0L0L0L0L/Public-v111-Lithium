/*
    Name:    Lita Loris
    Map:     New Leaf City - City Center
    Description:    600000000
*/

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
			if (status < 4) {
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
			cm.sendSimple("Hello there, neighbor! How have you been?\r\n#L0##bI heard someone found a way to the depths of the Phantom Forest!#l\r\n#L1#Can you tell me about the Guardian's Castle?#l");
			break;
		case 1:
			if (selection < 1) {
				cm.sendSimple("Yes, I'm quite upset about it as well. I know Mayor Slim has his reasons to explore Krachia, but as the sheriff of the city, I must ensure the safety of our citizens! I have received multiple reports of people getting lost in the forest.\r\n#L0##bDo you have any clues?#l");
			}
			if (selection > 0) {
				cm.sendOk("Hmm, John told me his brother returned. Well, to be precise, he returned to this continent... I'm not sure if that rascal will stop in the city before heading into the wilderness to find the castle. Anyway, if you want to know more about this, I suggest you talk to John. Of course, if you can find #b#p9201051##k, talking to him would be even better.");
				cm.dispose();
			}
			break;
		case 2:
			cm.sendSimple("Are you talking about the ghosts and tree monsters in the forest? Well… Some people have mentioned a place in the forest that resembles a bandit camp. Although I’m reluctant to jump to conclusions, I wouldn’t rule out their suspicions unless I see it with my own eyes.\r\n#L0##bIs there anything to watch out for in the forest?#l");
			break;
		case 3:
			cm.sendSimple("It's well-known that the forest paths are treacherous and hard to navigate. It is said that the trees themselves move and block your path after you pass by. For example, you might walk in one direction, turn twice, and end up back at the starting point. Just these things alone can make an ordinary person get lost!\r\n#L0##bGo on…#l");
			break;
		case 4:
			cm.sendPrev("Additionally, there are some natural dangers in the forest… such as swamps filled with poisonous mud. If you go in, make sure to bring some #b万能药#k or antidotes. Also, a return scroll is essential in case you get lost. If you must go, be very cautious and take every step carefully.");
			break;
		case 5:
			cm.dispose();
	}
}
