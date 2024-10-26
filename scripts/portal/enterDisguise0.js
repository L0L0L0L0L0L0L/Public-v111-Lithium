/*
	名字:	皇后之路
	地圖:	耶雷弗岔道
	描述:	130000200
*/

var quest = [20301, 20302, 20303, 20304, 20305];

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032179)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Ereve search begins."));
		pi.getPlayer().changeMap(pi.getMap(130010000), pi.getMap(130010000).getPortal(3)); //修煉森林1
		return true;
		}
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Due to the lock down you can not enter without a permit."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(130010000), pi.getMap(130010000).getPortal(3)); //修煉森林1
		return true;
}