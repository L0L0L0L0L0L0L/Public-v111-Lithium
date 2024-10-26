/*
	名字:	神木村
	地圖:	寒冰半人馬領土
	描述:	240020400
*/

var quest = [1451, 1453, 1455, 1457, 1459];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(924000200).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(924000200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(924000200), pi.getMap(924000200).getPortal(2)); //噴火龍的森林
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(240020400));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(240020401), pi.getMap(240020401).getPortal(2)); //噴火龍棲息地
		return true;
}