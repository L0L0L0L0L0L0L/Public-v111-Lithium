/*
	名字:	[十字獵人]奇怪的女子和奇怪的通道
	地圖:	遺跡發掘隊營區
	描述:	102040200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Do you have another urgent matter? If not, I could really use your help.");
		qm.dispose();
		return;
		}
		if (status == 5) {
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
		qm.sendNextS("What're the odds... I didn't expect to see you again.", 1);
		break;
	case 1:
		qm.sendNextPrevS("(Isn't that the woman you rescued in the Kerning City Subway?) Hey, long time no see!", 3);
		break;
	case 2:
		qm.sendNextPrevS("I came here to help out the Excavation Site, but it looks like I'm too late. Say, did you see a strange gate around here by any chance?", 1);
		break;
	case 3:
		qm.sendNextPrevS("Yeah, I saw it when I was fighting the Commander Skeleton in the #m102040600#. It gave me the creeps.", 3);
		break;
	case 4:
		qm.sendYesNo("Really? I'd love to see it! Mind showing me where it is?");
		break;
	case 5:
		qm.sendYesNo("All right! To the #m102040600#!");
		break;
	case 6:
		qm.sendNext("Let's move!");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(1607).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(102040600), qm.getMap(102040600).getPortal(1));
		qm.dispose();
}
}