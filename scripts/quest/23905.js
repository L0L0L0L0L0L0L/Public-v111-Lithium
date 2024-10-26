/*
	名字:	可疑的村莊
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23905)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23905).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("So you met #p2152016#. I told you it wouldn't be pleasant. Still, #p2152016# is the nicest of all the <Watchmen>.");
			break;
	case 1:
		qm.sendNextPrev("As you've no doubt learned, our town is under the control of the Black Wings. And let me make one thing clear: we hate it. That's why we were suspicious of you, an outsider.");
		break;
	case 2:
		qm.sendNextPrev("Now that it's been confirmed that you are not one of <Them>, the townspeople won't be suspicious of you. So let me be the first to welcome you to #m310000000#! As long as you do not aid our enemies, the residents of #m310000000# will accept you as a friend.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(23905).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}