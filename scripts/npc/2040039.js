/*
	名字:	黃綠氣球
	地圖:	遺棄之塔&amp;lt;第2階段&gt;
	描述:	922010400
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage2") == null) {
	if (cm.getPlayer().itemQuantity(4001022) < 14) {
		cm.sendOk("歡迎來到遺棄之塔<第2階段>，請在附近搜尋，整個小組需要集齊14張#b#t4001022##k交給我。");
		cm.dispose();
		return;
		}
		cm.sendOk("第二階段順利過關，通往下一區域的入口，已经開啟。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		cm.getPlayer().removeAll(4001022);
		eim.setProperty("stage2", 1); //給予條件
		cm.dispose();
		return;
		}
		cm.sendOk("順利過關，通往<第三階段>的的入口，已經開啟。");
		cm.dispose();
}