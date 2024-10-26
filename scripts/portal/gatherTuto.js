/*
	名字:	隱藏地圖
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

var ticket = [4001480, 4001481, 4001482, 4001483];
var map = [910001005, 910001006, 910001003, 910001004];

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3197)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3198)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(910001002), pi.getMap(910001002).getPortal(1)); //諾本的礦山
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3195)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3196)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(910001001), pi.getMap(910001001).getPortal(1)); //斯塔切的藥草田
		return true;
		}
	for (var i = 0; i < ticket.length; i ++)
	if (pi.getPlayer().itemQuantity(ticket[i])) {
		pi.gainItem(ticket[i], -1);
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Collecting area requires carrying corresponding entry tickets."));
		return false;
}