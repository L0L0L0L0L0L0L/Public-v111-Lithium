/*
	名字:	組隊任務
	地圖:	團結的測試
	描述:	610030500
*/

function act() {
	var nun = rm.getPlayer().getMap().getReactorByName("5weapon0").getState() + rm.getPlayer().getMap().getReactorByName("5weapon1").getState() + rm.getPlayer().getMap().getReactorByName("5weapon2").getState() + rm.getPlayer().getMap().getReactorByName("5weapon3").getState() + rm.getPlayer().getMap().getReactorByName("5weapon4").getState();
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "A weapon has been restored to the Relic of Mastery!"));
	if (nun > 4) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Antellion grants you access to the next portal! Proceed!"));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("5pt", 2));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
}
}