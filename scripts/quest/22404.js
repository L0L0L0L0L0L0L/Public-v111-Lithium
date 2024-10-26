/*
	名字:	製作馬鞍
	地圖:	動物園
	描述:	230000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 3) {
		qm.sendNext("Okay, then. Goodbye.");
		qm.dispose();
		return;
		}
		if (status == 5) {
		qm.sendNext("Hmm... I don't think the existing saddles will fit this creature. You'll have to make a custom order...");
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
		qm.sendNext("Hmm... What an interesting lizard! It looks like a dragon, but of course, no one can ride a dragon. That really is quite a unique mount you've got there.");
		break;
	case 1:
		qm.sendNextPrev("I've seen a lot of mounts before, so I know various saddle sizes. With this one, though, I can't tell the exact size... Let me take some measurements first.");
		break;
	case 2:
		qm.sendNextPrevS("#b(#p2060005# begins to meticulously measure #p1013000#'s waist, as well as its wings, head, and tail. And for some reason, Kenta is measuring its toenails and mouth...)");
		break;
	case 3:
		qm.sendAcceptDecline("Hmm... The saddle size for this creature is very different from one I've ever seen before. I think you'll have to get a #bcustom order#k if you want to ride this mount. What do you say?");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(22404).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("I'll make you a saddle if you bring me #b50 #t4000592#s#k and #b1 #t4032474##k items. And since this is the first time I'm doing this, I'll give you a discount on the service fee. Only #b100,000 mesos#k!");
		break;
	case 5:
		qm.sendYesNo("I'll make you a saddle if you bring me the materials and the service fee. The materials can only be found in a special place, though. Would you like me to send you there right now?");
		break;
	case 6:
		qm.getPlayer().changeMap(qm.getMap(923030000), qm.getMap(923030000).getPortal(1)); //寂靜的大海裡
		qm.dispose();
}
}