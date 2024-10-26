/*
	名字:	火獨眼獸洞穴壁
	地圖:	岩地荒野
	描述:	102010100
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21728)).getStatus() == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendGetText("Tell me the password if you want to enter! #b(Strange noises fill the air. You'd better give them that password you uncovered, 'Francis is a genius Puppeteer!')");
		break;
	case 1:
		if (cm.getText() == "Francis is a genius Puppeteer!") {
		if (cm.getMap(910510000).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Cannot enter the Puppeteer's Cave. Better try again a little later."));
			cm.dispose();
			return;
			}
			cm.getMap(910510000).resetFully();
			cm.getPlayer().changeMap(cm.getMap(910510000), cm.getMap(910510000).getPortal(1));
			cm.getPlayer().getMap().spawnNpc(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20730)).getStatus() == 1 ? 1104000 : 1204002, new java.awt.Point(479, 245));
			cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(102010100));
			cm.dispose();
			return;
			}
			cm.sendNext("(The strange voice cackles.) \r\n\r\n#bAre you stupid? Wrong password! Get the spacing, capitalization, and punctuation right!");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("A suspicious voice pierces through the silence. #bPassword#k!");
		break;
	case 1:
		cm.sendNextPrevS("#b(What could the password be? It seems certain that the voice belongs to Francis. Return to Ilji for now.)", 2);
		break;
	case 2:
		cm.dispose();
}
}