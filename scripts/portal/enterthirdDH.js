/*
	名字:	皇后之路
	地圖:	練武場入口
	描述:	130020000
*/

var quest = [20601, 20602, 20603, 20604, 20605];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(913010200).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getMap(913010200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(913010200), pi.getMap(913010200).getPortal(1)); //第三練武場
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(130020000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Third Drill Hall can only be entered during the Advanced Knighthood exam."));
		return false;
}