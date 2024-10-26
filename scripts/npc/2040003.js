/*
	名字:	曾助教
	地圖:	玩具工廠&amp;lt;A工程1&gt;
	描述:	220020000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3239)).getStatus() != 1 && cm.getPlayer().getMap().getId() == 220020000) {
		cm.sendOk("玩具工廠<第4區>禁止外來者訪問。");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 220020000) {
		if (cm.getMap(922000000).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "玩具工廠<第4區>目前擁擠，請稍後再試"));
		cm.dispose();
		return;
		}
		cm.getMap(922000000).resetFully();
		cm.getPlayer().changeMap(cm.getMap(922000000), cm.getMap(922000000).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(220020000));
		cm.dispose();
		return;
		}
		cm.sendYesNo("你準備好離開#b#m" + cm.getPlayer().getMap().getId() + "##k了嗎？");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(220020000), cm.getMap(220020000).getPortal(0));
		cm.dispose();
}