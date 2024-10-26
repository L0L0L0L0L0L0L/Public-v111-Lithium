/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The top right switch has been toggled."));
	var flames = Array("a6", "a7", "b6", "b7", "c6", "c7");
	for (var i = 0; i < flames.length; i++) {
	rm.getPlayer().getMap().toggleEnvironment(flames[i]);
}
}