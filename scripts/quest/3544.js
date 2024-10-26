/*
	名字:	找回失去的回憶
	地圖:	惡魔殺手
	描述:	惡魔殺手
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("Memories? What memories? When I served the Black Mage, or when I did battle with him? Or when I awoke from my egg in those strange mines?", 16);
		break;
	case 1:
		qm.sendNextPrevS("Do I even have happy memories? Yes... Memories of my family. Mother... and Damien. Hm...", 16);
		break;
	case 2:
		qm.sendNextPrevS("Honestly, I enjoyed sparring with #p2151009# as well. Perhaps things need not be all gloom and fury...", 16);
		break;
	case 3:
		qm.sendNextPrevS("(Recalling your memories has given you a healthier perspective on life.)", 16);
		break;
	case 4:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3544));
		Packages.server.quest.MapleQuest.getInstance(3544).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}