/*
	名字:	安迪
	地圖:	泰拉森林時空之門
	描述:	240070000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		qm.sendNext("你好，我是一個來自不遠未來的時間旅行者。我來這裡是為了避免這個時代貪婪的人們製造機器。");
		break;
	case 1:
		qm.sendNextPrev("他們瘋狂地佔用我的時間，把一切都消耗殆盡，我必須不惜一切代價封鎖它。");
		break;
	case 2:
		qm.sendYesNo("如果你有興趣幫助我的話，我將通過時間機器，將你傳送到泰拉森林時空之門。");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3715).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(240070000), qm.getMap(240070000).getPortal(0));
		qm.dispose();
}
}