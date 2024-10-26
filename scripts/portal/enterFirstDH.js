/*
	名字:	女皇之路
	地圖:	演武场入口
	描述:	130020000
*/

var map = [913000000, 913000100, 913000200];
var quest = [20701, 20702, 20703];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The 1st Hall can only be entered if you're participating in Kiku's Acclimation Training."));
		return false;
}