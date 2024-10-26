/*
	名字:	時空門
	地圖:	維多利亞
	描述:	102040600
*/

var quest = [1608, 1611, 1615, 1620, 1621, 1623, 1625, 1627, 1629, 1631, 1632, 1632, 1634, 1613];
var tomap = [931050410, 931050411, 931050412, 931050413, 931050414, 931050415, 931050416, 931050417, 931050418, 931050419, 931050420, 931050421, 931050422, 931050423];
var map = [102040600, 200080000, 220011000, 220040200, 221040400, 260010201, 250020300, 261020500, 251010500, 240010200, 240010600, 240010500, 240020200, 211040000];
var portal = [2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1];

function start() {
	for (var i = 0; i < quest.length; i ++)
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		q = i;
		}
	if (cm.getPlayer().getMap().getId() != map[q]) {
		cm.dispose();
		return;
		}
		cm.sendYesNo("The Mystic Gate beckons to you. Will you enter?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1627)).getStatus() == 1 && cm.getPlayer().getMap().getId() == 261020500) {
			var em = cm.getEventManager("q1627");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer());
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
			cm.dispose();
			return;
			}
		if (cm.getMap(tomap[q]).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
			cm.dispose();
			return;
			}
			cm.getMap(tomap[q]).resetFully();
			cm.getPlayer().changeMap(cm.getMap(tomap[q]), cm.getMap(tomap[q]).getPortal(portal[q]));
			cm.getPlayer().startMapTimeLimitTask(1200, cm.getMap(map[q]));
			}
			cm.dispose();
}