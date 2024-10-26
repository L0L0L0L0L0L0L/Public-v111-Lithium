/*
	名字:	升降機操作臺
	地圖:	訓練房入口
	描述:	310010010
*/

function start() {
	cm.sendSimple("An elevator that will take you to your desired training room. Choose the floor you'd like to go to.\r\n#L0##bUnderground 2nd Floor Training Room A#l\r\n#L1#Underground 3rd Floor Training Room B#l\r\n#L2#Underground 4th Floor Training Room C#l\r\n#L3#Underground 5th Floor Training Room D#l" + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23118)).getStatus() == 1 ? "\r\n#L4#Underground 6th Floor Training Room E" : "") + "");
}

function action(mode,type,selection) {
	if (mode > 0) {
		if (selection < 4) {
			cm.getPlayer().changeMap(cm.getMap(310010100 + selection * 100), cm.getMap(310010100 + selection * 100).getPortal(1));
			cm.dispose();
			return;
			}
		if (cm.getMap(931000400).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
			cm.dispose();
			return;
			}
			cm.getMap(931000400).resetFully();
			cm.getPlayer().changeMap(cm.getMap(931000400), cm.getMap(931000400).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(310010010));
			}
			cm.dispose();
}