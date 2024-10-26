/*
	名字:	末日反抗軍本部
	地圖:	訓練房入口
	描述:	310010010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23238)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Storage Room is empty."));
		return false;
		}
	if (pi.getMap(931050200).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getMap(931050200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931050200), pi.getMap(931050200).getPortal(1)); //訓練房的倉庫
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300456), new java.awt.Point(400, -4));
		return true;
}