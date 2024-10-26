/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The top center switch has been toggled."));
	var flames = Array("a3", "a4", "a5", "b3", "b4", "b5", "c3", "c4", "c5");
	for (var i = 0; i < flames.length; i++) {
	rm.getPlayer().getMap().toggleEnvironment(flames[i]);
}
}