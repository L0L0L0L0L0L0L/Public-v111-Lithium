/*
	名字:	瑞恩島
	地圖:	瑞恩修練場入口
	描述:	140010100
*/

var map = [914010000, 914010100, 914010200];
var quest = [21701, 21702, 21703]

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can only enter the Penguin Training Center if you are getting trained by Puo."));
		return false;
}