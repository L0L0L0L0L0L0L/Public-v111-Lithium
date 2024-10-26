/*
	名字:	隱藏地圖
	地圖:	打倒海賊!
	描述:	925100400
*/

function act() {
	var map = rm.getReactor().getMap();
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "One of the doors have been activated."));
	num = map.getReactorByName("sMob1").getState() + map.getReactorByName("sMob2").getState() + map.getReactorByName("sMob3").getState() + map.getReactorByName("sMob4").getState();
	if (num > 3) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The channel leading to the next area has been opened."));
}
}