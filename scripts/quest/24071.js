/*
	名字:	襲擊者1
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 12) {
		qm.sendNext("Of course, Your Highness. By your leave...");
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
		qm.sendNext("Please, I want to know everything that happened after you fought the Black Mage. I know you sealed him away, but why did you seal #m101050000#, too?");
		break;
	case 1:
		qm.sendNextPrevS("#b(You explain everything: the Black Mage's defeat, the curse, the Elves sleeping for hundreds of years, waking up alone in the present, and the village's current situation.)", 2);
		break;
	case 2:
		qm.sendNextPrev("So only #p1033100#, #p1033101#, #p1033102#, and Your Highness are awake? This isn't good... At least the monsters of today are weaker than they were in our day.");
		break;
	case 3:
		qm.sendNextPrevS("#bIndeed. If you wouldn't mind, I'd like to know more about Maple World. What's happened in the centuries that I was asleep?", 2);
		break;
	case 4:
		qm.sendNextPrev("(She tells you that she settled in Victoria Island after the battle, helped formed a town, and that Victoria Island is now in peace.)");
		break;
	case 5:
		qm.sendNextPrev("I'd believed that the Black Mage was gone, though Captain Kyrin is looking for the Black Mage for some revenge plot... And things have changed ever since Empress #p1101000# appeared.");
		break;
	case 6:
		qm.sendNextPrevS("Empress...#p1101000#?", 2);
		break;
	case 7:
		qm.sendNextPrev("#b(She tells you of the rumors of the Black Mage's return, the Black Wings, the Cygnus Knights, and the return of Von Leon.)");
		break;
	case 8:
		qm.sendNextPrev("Oh, and I was able to meet with Aran again.");
		break;
	case 9:
		qm.sendNextPrevS("Aran is alive? But he was a human!", 2);
		break;
	case 10:
		qm.sendNextPrev("It seems like the curse that froze him also kept him alive. But he was weakened like you, and he lost his memories. He didn't even remember the Black Mage. Still, somehow, he's fighting on our side...");
		break;
	case 11:
		qm.sendNextPrevS("I can't believe Aran is alive. ls there any chance I can meet him?", 2);
		break;
	case 12:
		qm.sendAcceptDecline("I'm not sure, Your Highness. Aran is traveling Maple World, so maybe you will meet him. But for now...could we return to #b#m101050000##k? I want to return home, desperately...");
		break;
	case 13:
		Packages.server.quest.MapleQuest.getInstance(24071).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Elder #p1033100#, my sister...I mean Elder #p1033101#, and Elder #p1033102#... I really do miss them so! Let's go!");
		break;
	case 14:
		qm.sendPrev("Hold on, I almost forgot... Please wait outside a moment, Your Highness.");
		break;
	case 15:
		qm.dispose();
}
}