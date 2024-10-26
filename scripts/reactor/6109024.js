/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The middle right switch has been toggled."));
	var flames = Array("d6", "d7", "e6", "e7", "f6", "f7");
	for (var i = 0; i < flames.length; i++) {
	rm.getPlayer().getMap().toggleEnvironment(flames[i]);
}
}