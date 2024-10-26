/*
	名字:	生命之穴
	地圖:	闇黑龍王洞穴
	描述:	240060200
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm14/HonTale", 6));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8810026), new java.awt.Point(71, 260));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The cave shakes and rattles, Horned Tail is summoned."));
}