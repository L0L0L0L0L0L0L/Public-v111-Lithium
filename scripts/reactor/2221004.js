/*
	名字:	路德斯湖
	地圖:	童話村
	描述:	222000000
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9500400), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "A gourd has grown out."));
}


//4031245		樂夫的葫蘆種子