/*
	名字:	藍氣球
	地圖:	遺棄之塔&amp;lt;第5階段&gt;
	描述:	922010800
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage8") == null) { //判斷條件
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("歡迎來到遺棄之塔<第5階段>，請根據組長的指示進行這一關挑戰。");
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage8a") == null) {
			cm.sendOk("歡迎來到遺棄之塔<第5階段>，在這個階段中，需要2名組員分別站在這些標有數位的方塊上面，以形成正確的組合來解鎖下一階段。");
			eim.setProperty("stage8a", 0);
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage8b") == null) {
			var countPicked = 0;
			var positions = Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
			while(countPicked < 2) { //2名組員的組合
			var picked = Math.floor(Math.random() * positions.length);
		if (positions[picked] == 1) // Don't let it pick one its already picked.
			continue;
			positions[picked] = 1;
			countPicked++;
			}
			var returnString = "";
			for(var i = 0; i < positions.length; i++) {
			returnString += positions[i];
		if (i != positions.length - 1)
			returnString += "";
			}
			eim.setProperty("stage8b", returnString);
			}
			var chenhui = 0;
			for (var i = 0; i < 9; i++)
			if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
			chenhui++;
			}
		if (chenhui != 2) {
			cm.sendOk("看起来你还没有找到正确的方法，需要2名組員分別站在這些標有數位的方塊上面，以形成正確的組合。");
			cm.dispose();
			return;
			}
			var x = "";
			for (var i = 0; i < 9; i++)
			x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
			y = x;
		if (y == eim.getProperty("stage8b")) {
			eim.setProperty("stage8", 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			cm.sendOk("組合正確，通往下一區域的入口，已经開啟。");
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
			cm.dispose();
			return;
			}
			cm.sendOk("通往下一區域的入口，已经開啟。");
			cm.dispose();
}