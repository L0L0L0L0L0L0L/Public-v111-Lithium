/*
	名字:	馬來西亞
	地圖:	夢幻主題公園
	描述:	551030200
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420541), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Beware! The furious Targa has shown himself!"));
}


//4032246		夢幻公園的意念