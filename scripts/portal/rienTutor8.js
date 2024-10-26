/*
	名字:	瑞恩島
	地圖:	瑞恩西邊平原
	描述:	104000000
*/

var quest = [21015, 21016, 21017]
var mob = ["Murupa", "Murupia", "Murumuru"]

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "" + mob[i] + " In the area to the right of Ryan Village"));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140010000), pi.getMap(140010000).getPortal(2)); //瑞恩西邊平原
		return false;
}