/*
	名字:	生命之穴
	地圖:	混沌闇黑龍王的洞窟
	描述:	240060201
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm14/HonTale", 6));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8810130), new java.awt.Point(71, 260));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The cave shakes and rattles, Chaos Horned Tail is summoned."));
}