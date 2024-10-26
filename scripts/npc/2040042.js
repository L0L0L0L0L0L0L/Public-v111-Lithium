/*
	名字:	天藍氣球
	地圖:	遺棄之塔&amp;lt;第4階段&gt;
	描述:	922010700
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage4") == null) {
	if (cm.getPlayer().itemQuantity(4001022) < 4) {
		cm.sendOk("歡迎來到遺棄之塔<第4階段>，請在附近搜尋，整個小組需要集齊4張#b#t4001022##k交給我。");
		cm.dispose();
		return;
		}
		cm.sendOk("第四階段順利過關，通往下一區域的入口，已经開啟。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		cm.getPlayer().removeAll(4001022);
		eim.setProperty("stage4", 1); //給予條件
		cm.dispose();
		return;
		}
		cm.sendOk("順利過關，通往<第五階段>的的入口，已經開啟。");
		cm.dispose();
}