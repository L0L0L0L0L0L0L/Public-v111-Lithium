/*
	名字:	楓之島
	地圖:	冒險者修練場入口
	描述:	1010000
*/

var map = [1010100, 1010200, 1010300, 1010400];
var quest = [1041, 1042, 1043, 1044];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(4));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Only the adventurers that have been trained by Mai may enter."));
		return false;
}