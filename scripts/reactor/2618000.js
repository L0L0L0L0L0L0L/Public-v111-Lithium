/*
	名字:	隱藏地圖
	地圖:	令人不適的實驗室
	描述:	926110100
*/

function act() {
	if (rm.getReactor().getState() > 6) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "One of the beakers has been completed."));
		rm.getPlayer().getMap().getReactorById(2618006).forceHitReactor(rm.getPlayer().getMap().getReactorById(2618006).getState() + 1);
		}
	if (rm.getPlayer().getMap().getReactorById(2618006).getState() > 2) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The channel leading to the next area has been opened."));
}
}