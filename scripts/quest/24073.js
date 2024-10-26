/*
	名字:	合作的必要性
	地圖:	櫻花處
	描述:	910150001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendNext("The last Empress's knights were weak, but this time is different. I think we can count on them.");
		qm.dispose();
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
		qm.sendNext("We managed to protect the village... But if they attack again, the elders won't be strong enough to hold them off. Not yet, anyway.");
		break;
	case 1:
		qm.sendNextPrevS("I want #byou to keep Mistelteinn safe#k, #p1033232#. The village simply isn't secure. I just want you to hold onto it for a little while longer.", 2);
		break;
	case 2:
		qm.sendNextPrev("The village isn't safe like this...");
		break;
	case 3:
		qm.sendNextPrevS("There must be a way to protect the village. I could stand guard...", 2);
		break;
	case 4:
		qm.sendNextPrev("Your Highness, you must continue your training! I have an alternative. Let's #brequest the help of the Cygnus Knights#k. They're leaders in the fight against the Black Wings.");
		break;
	case 5:
		qm.sendNextPrevS("The Cygnus Knights? As in this Empress #p1101000# you told me about?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Yes. The Empress has a formidable order of knights. If you explain what's happened, they will surely help us.");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(24073).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("I shall return to #m100000000# and write a letter to the Cygnus Knights' headquarters, #m130000000#. By your leave, My Liege.");
		break;
	case 8:
		qm.sendNextPrevS("Very well. I will go to #m130000000# and meet this Empress in person.", 2);
		break;
	case 9:
		qm.sendPrev("As you wish, Your Majesty. I'll make sure the letter reaches them in advance, so they know to expect you.");
		break;
	case 10:
		qm.dispose();
}
}