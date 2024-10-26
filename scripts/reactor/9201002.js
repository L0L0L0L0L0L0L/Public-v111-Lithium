/*
	名字:	威廉的古堡
	地圖:	惡靈13的王座
	描述:	990000900
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm10/Eregos", 6));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300028), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300029), new java.awt.Point(130, 90));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300030), new java.awt.Point(540, 90));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300031), new java.awt.Point(130, 150));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300032), new java.awt.Point(540, 150));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Those who break into my territory without permission will be punished."));
}