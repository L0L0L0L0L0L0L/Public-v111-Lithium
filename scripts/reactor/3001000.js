/*
	名字:	毒霧森林
	地圖:	劇毒森林
	描述:	930000600
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300180), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Poison Golem is spawned."));
}


//4001163		紫色魔力石