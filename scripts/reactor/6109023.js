/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The middle left switch has been toggled."));
	var flames = Array("d1", "d2", "e1", "e2", "f1", "f2");
	for (var i = 0; i < flames.length; i++) {
	rm.getPlayer().getMap().toggleEnvironment(flames[i]);
}
}