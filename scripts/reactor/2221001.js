/*
	名字:	隱藏地圖
	地圖:	深山凶宅
	描述:	222010401
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(7130401), new java.awt.Point(993, 148));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Here comes Blue King Goblin!"));
}


//2022052		榖茶