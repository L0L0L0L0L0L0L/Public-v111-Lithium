/*
	名字:	威廉的古堡
	地圖:	正義之室
	描述:	990000440
*/

function act() {
	rm.getMap(990000400).getReactorByName("speargate").forceHitReactor(rm.getMap(990000400).getReactorByName("speargate").getState() + 1);

	if (rm.getMap(990000400).getReactorByName("speargate").getState() > 3) {

		var map = [990000400, 990000410, 990000420, 990000430, 990000431, 990000440];
		for (var i = 0; i < map.length; i++) {
		rm.getMap(map[i]).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		rm.getMap(map[i]).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		rm.getGuild().gainGP(500);
}
}