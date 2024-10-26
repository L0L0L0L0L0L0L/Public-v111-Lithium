/*
	名字:	毒霧森林
	地圖:	變質的森林
	描述:	930000200
*/

function act() {
	if (rm.getReactor().getState() > 3) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The thorny vine has been eliminated."));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
}
}