/*
	名字:	玩具士兵-果伸
	地圖:	愛奧斯塔100樓
	描述:	221023200
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
		if (status == 0) {
		cm.sendNext("I see. It's very understandable, considering the fact that you'll be facing a very dangerous monster inside. If you ever feel a change of heart, then please come talk to me. I sure can use help from someone like you.");
		cm.dispose();
		return;
		}
		if (status == 2) {
		cm.sendNext("I see. Please talk to me when you're ready to take on this task. I advise you not to take too much time, though, for the monster may turn into something totally different. We have to act like we don't know anything.");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3230)).getStatus() < 1) {
			cm.sendOk("We are the toy soldiers here guarding this room, preventing anyone else from entering. I cannot inform you of the reasoning behind this policy. Now, if you'll excuse me, I am working here.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3230)).getStatus() > 1) {
			cm.sendNext("Thanks to #h0#, we got the #bPendulum#k back and destroyed the monster from the other dimension. Thankfully we haven't found one like that since. I can't thank you enough for helping us out. Hope you enjoy your stay here at Ludibrium!");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Hmmm...I've heard a lot about you through #b#p2040001##k. You got him a bunch of #bTasty Walnut#k so he can fight off boredom at work. Well ... alright, then. There's a dangerous, dangerous monster inside. I want to ask you for help in regards to locating it. Would you like to help me out?");
			break;
	case 1:
		cm.sendNext("Thank you so much. Actually, #b#p2040001##k asked you to get #bTasty Walnuts#k as a way of testing your abilities to see if you can handle this, so don't think of it as a random request. I think someone like you can handle adversity well.");
		break;
	case 2:
		cm.sendYesNo("A while ago, a monster came here from another dimension thanks to a crack in dimensions, and it stole the pendulum of the clock. It hid itself inside the room over there camouflaged as a dollhouse. It all looks the same to me, so there's no way to find it. Would you help us locate it?");
		break;
	case 3:
		cm.sendNext("Alright! I'll take you to a room, where you'll find a number of dollhouses all over the place. One of them will look slightly different from the others. Your job is to locate it and break its door. If you locate it correctly, you'll find #bPendulum#k. If you break a wrong dollhouse, however, you'll be sent out here without warning, so please be careful on that.");
		break;
	case 4:
		cm.sendNextPrev("You'll also find monsters in there, and they have gotten so powerful thanks to the monster from the other dimension that you won't be able to take them down. Please find #bPendulum#k within the time limit and then notify #b#p2040028##k, who should be inside. Let's get this started!");
		break;
	case 5:
		if (cm.getMap(922000010).getCharacters().size() < 1) {
			cm.getMap(922000010).resetFully();
			//cm.gainItem(4031094, -1);
			cm.getPlayer().removeAll(4031094);
			cm.getPlayer().changeMap(cm.getMap(922000010), cm.getMap(922000010).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(221023200));
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Someone else must be inside looking for the dollhouse. Unfortunately I can only let in one person at a time, so please wait for your turn.");
			break;
	case 6:
		cm.dispose();
}
}