/*
	名字:	神木村
	地圖:	火燄死亡戰場
	描述:	240020100
*/

var quest = [1451, 1453, 1455, 1457, 1459];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(924000201).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(924000201).resetFully();
		pi.getPlayer().changeMap(pi.getMap(924000201), pi.getMap(924000201).getPortal(2)); //格瑞芬多的森林
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(240020100));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(240020101), pi.getMap(240020101).getPortal(2)); //格瑞芬多森林
		return true;
}