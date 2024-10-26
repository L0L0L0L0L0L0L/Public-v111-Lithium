/*
	名字:	成為騎士的第一次修煉
	地圖:	修煉森林1
	描述:	130010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNext("Hmm, there is nothing to worry about. This will be a breeze for someone your level. Muster your courage and let me know when you're ready.");
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
		qm.sendNext("Hmm? Neinheart sent you, huh? You must be the newbie that recently joined Cygnus Knights. Welcome, and nice to meet you! My name is Kiku. I'm the Training Instructor who trains all Noblesses like yourself. Of course, I'm not a human as you can tell.");
		break;
	case 1:
		qm.sendNextPrev("We are called Piyos. You've seen Shinsoo who is at the Empress's side all the time, haven't you? Piyos are of the same family as Shinsoo, but we belong to different types. Of course, you haven't seen any of us since we only live in Ereve. You'll get used to Piyos in no time.");
		break;
	case 2:
		qm.sendNextPrev("Oh, and did you know that there are no monsters in Ereve? Not even a smidgeon of evil dare enter Ereve. But don't you worry. You'll be able to train with illusory monsters created by Shinsoo called Mimis.");
		break;
	case 3:
		qm.sendAcceptDecline("You seem prepared! Looking at what you've accomplished, I think you should jump right into hunting more advanced Mimis. How about you hunt #b15#k #rTimus in Training Forest II#k? Use the portal on the left to reach the #bTraining Forest II#k.");
		break;
	case 4:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(12));
		Packages.server.quest.MapleQuest.getInstance(20017).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}