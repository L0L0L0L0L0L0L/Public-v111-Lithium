/*
	名字:	紫氣球
	地圖:	時空的裂縫
	描述:	922010900
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage9") == null) {
	if (!cm.getPlayer().itemQuantity(4001023)) {
		cm.sendOk("歡迎來到時空的裂縫，請消滅巨型戰鬥機，并收集#v4001023#交給我");
		cm.dispose();
		return;
		}
		cm.sendOk("恭喜你們完成了所有挑戰，請等待傳送到遺棄之塔<Bonus>。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "恭喜你們完成了所有挑戰，請等待傳送到遺棄之塔<Bonus>"));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		cm.getEventInstance().startEventTimer(1 * 10000);
		cm.getPlayer().removeAll(4001023);
		eim.setProperty("stage9", 1); //給予條件
		cm.dispose();
		return;
		}
		cm.sendOk("請耐心等待，倒數計時後將進入遺棄之塔<Bonus>。");
		cm.dispose();
}