/*
	名字:	桑克斯
	地圖:	楓之港
	描述:	2000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
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
	if (cm.getPlayer().itemQuantity(4031801)) {
	switch (status) {
	case 0:
		cm.sendYesNo("Take this ship and you'll head off to a bigger continent. For #e150 mesos#n, I'll take you to #bVictoria Island#k. The thing is, once you leave this place, you will never be able to return. So, choice is yours. Do you want to go to Victoria Island?");
		break;
	case 1:
		cm.sendNext("Okay, now give me 150 mesos...Hey, what's that? Is that the recommendation letter from Lucas, the chief of Amherst? You should have told me about this earlier. I, Shanks, recognize greatness when l see it, and since you have been recommended by Lucas, l can see that you have very great potential as an adventurer. No way would l dare charge you for this trip!");
		break;
	case 2:
		cm.sendNextPrev("Since you have the recommendation letter, I won't charge you for this. We're going to head to Victoria Island right now, so buckle up! it might get a bit turbulent!");
		break;
	case 3:
		cm.gainItem(4031801, -1);
		cm.getPlayer().changeMap(cm.getMap(2010000), cm.getMap(2010000).getPortal(0));
		cm.dispose();
		return;
		}
		}
	switch (status) {
	case 0:
		cm.sendYesNo("You can go to a wider continent by getting on this ship. I will take you to #bVictoria Island#k for #e150 mesos#n. However, once you leave this place, you cannot come back. What do you think? Would you like to go to Victoria Island?");
		break;
	case 1:
		cm.sendNext("l bet you are bored of this place. Well... first, give me #e150 mesos#n.");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 150) {
			cm.sendOk("What? You're telling me you wanted to go without any money? You're one weirdo...");
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Awesome! 150 mesos. ");
			break;
	case 3:
		cm.gainMeso(-150);
		cm.getPlayer().changeMap(cm.getMap(2010000), cm.getMap(2010000).getPortal(0));
		cm.dispose();
}
}