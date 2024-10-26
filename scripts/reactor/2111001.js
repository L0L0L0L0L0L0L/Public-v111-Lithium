/*
	名字:	最後的任務
	地圖:	混沌殘暴炎魔的祭壇
	描述:	280030000
*/

function act() {
	rm.getPlayer().getMap().spawnZakum(-10, -215);
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm06/FinalFight", 6));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Zakum is summoned by the force of eye of fire."));
}


//4001017		火焰之眼