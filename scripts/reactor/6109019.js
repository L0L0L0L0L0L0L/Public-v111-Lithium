/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function act() {
	var nun = rm.getPlayer().getMap().getReactorByName("4skill0a").getState() + rm.getPlayer().getMap().getReactorByName("4skill1a").getState() + rm.getPlayer().getMap().getReactorByName("4skill2a").getState() + rm.getPlayer().getMap().getReactorByName("4skill3a").getState() + rm.getPlayer().getMap().getReactorByName("4skill4a").getState();
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Thief Sigil has been activated!"));
	if (nun > 9) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Antellion grants you access to the next portal! Proceed!"));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("4pt", 2));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
}
}