/*
	名字:	秘密團體加入條件1
	地圖:	遺棄的洞穴
	描述:	910050300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Should I tell you about it a little later then?");
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
		qm.sendNext("Great to see you again, lifesaver! My master has been very busy lately, letting his wounds heal and finding a new base for us, which is why there has been no communication from him lately. It seems that you were finally contacted!");
		break;
	case 1:
		qm.sendNextPrev("I told my master about you and he agreed that you could join the secret organization! There is one condition however. I think it must be the entrance exam to join the organization.");
		break;
	case 2:
		qm.sendAcceptDecline("A strong and fancy hero like you should easily be able to pass the test, I think. Should I tell you about the test?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22560).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("The test is simple! Go to #bNorth Forest#k and defeat #r150 #o3230100#s#k. My master is trying to build a Hideout there, but I guess the #o3230100#s are getting in the way.");
		break;
	case 4:
		qm.sendPrev("I don't know why he doesn't just build the base somewhere else... He apparently tried building it in some garden, but had to halt the project because of some monsters that kept attacking. I guess that's why he's being a little more cautious this time.");
		break;
	case 5:
		qm.dispose();
}
}