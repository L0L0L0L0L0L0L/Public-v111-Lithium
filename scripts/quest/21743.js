/*
	名字:	製作特殊墨汁
	地圖:	桃花仙境
	描述:	250000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 1) {
		qm.sendNext("Hmm, you won't pay the service fee? Oh well , then. I'm plenty busy with other work anyway.");
		qm.dispose();
		return;
		}
		if (status == 3) {
		qm.sendNext("Hmm, it'll be difficult for you to find them, unless you go the place I was thinking about sending you.");
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
		qm.sendNext("What's going on? What? You're asking me if this #t4220151# can be restored? Let me see... Hmm. How in the world did you manage to boil the #t4220151#? Only a fool like #p2090004# would do that. Good thing it's made with such high quality paper.");
		break;
	case 1:
		qm.sendYesNo("Well, it is possible to restore the #t4220151#, I suppose. I could probably do it with Special Ink. And, you're in luck, because I can make the Special Ink myself, if you bring me the materials. Of course, I have to charge a service fee...");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21743).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("I need #b50 #t4000588#s, 50 #t4000589#s#k, and #b100 #t4000590#s#k. If you bring #b500,000 mesos#k, in addition to the materials, I'll make you the #b8 bottles of #t4032342##k required to restore this #t4220151#.");
		break;
	case 3:
		qm.sendYesNo("Of course I know where you can find the materials I need. Would you like to go there now?");
		break;
	case 4:
		qm.getPlayer().changeMap(qm.getMap(925041000), qm.getMap(925041000).getPortal(1));
		qm.dispose();
}
}