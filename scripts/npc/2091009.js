/*
	名字:	封印寺院入口
	地圖:	下級修煉場
	描述:	250020100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21747)).getStatus() != 1) {
		cm.dispose();
		return;
		}
		cm.sendGetText("(Only the correct password will let you in.)");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getText() == "Actions speak louder than words" || cm.getText() == "") {
		if (cm.getMap(925040100).getCharacters().size() < 1) {
		cm.getMap(925040100).resetFully();
		cm.getPlayer().changeMap(cm.getMap(925040100), cm.getMap(925040100).getPortal(1));
		cm.getPlayer().getMap().spawnNpc(1204020, new java.awt.Point(897, 51));
		cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(250020100));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		cm.dispose();
		return;
		}
		cm.sendOk("#rWrong!");
		}
		cm.dispose();
}