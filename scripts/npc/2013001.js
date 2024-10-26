/*
	名字:	幫傭易克
	地圖:	雅典娜禁地&amp;lt;中央塔&gt;
	描述:	920010100
*/

var item = [4001044, 4001045, 4001046, 4001047, 4001048, 4001049, 4001050, 4001051, 4001052, 4001053, 4001054, 4001055, 4001056, 4001057, 4001058, 4001059, 4001060, 4001061, 4001062, 4001063];

function start() {
	var eim = cm.getPlayer().getEventInstance();
	switch(cm.getPlayer().getMap().getId()) {
	case 920010000:
		if (cm.getMap(920010000).getReactorById(2006000).getState() > 0) {
			cm.getPlayer().changeMap(cm.getMap(920010000), cm.getMap(920010000).getPortal(2));
			}
			break;
	case 920010100:
		if (cm.getMap(920010100).getReactorByName("minerva").getState() > 4) {
			cm.sendOk("大人，感謝你拯救了我們的雅典娜女神，請你與她交談。");
			cm.dispose();
			return;
			}
		if (cm.getMap(920010800).getReactorById(2001001).getState() > 0) {
			cm.sendOk("大人，請把找到的#b#v4001055##t4001055##k，放在雕像底部。");
			cm.dispose();
			return;
			}
		if (cm.getMap(920010100).getReactorByName("minerva").getState() > 3) {
			cm.getPlayer().changeMap(cm.getMap(920010800), cm.getMap(920010800).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("大人，請收集四塊雅典娜女神雕像部件，復原雕像後，再和我對話去找復活女神的生命草。");
			break;
	case 920010200:
		if (eim.getProperty("stage1") == null) {
			if (cm.getPlayer().itemQuantity(4001050) < 30) {
			cm.sendOk("大人，請從這個階段的怪物那裡收集到30個雕像碎片，然後統一交給我，這樣我就可以把它們合在一起，組成一塊完整的雕像部件。");
			cm.dispose();
			return;
			}
			cm.sendOk("大人，這是第一塊雕像部件。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001046# #t4001046# 1");
			cm.removeAll(4001050);
			cm.gainItem(4001046, 1);
			eim.setProperty("stage1", 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			cm.dispose();
			return;
			}
			cm.sendOk("大人，藏在這裡的第一塊雕像部件，我們已經拿到，可以去其他區域了。");
			break;
	case 920010300:
		if (eim.getProperty("stage2") == null) {
			if (cm.getPlayer().itemQuantity(4001051) < 15) {
			cm.sendOk("大人，女神像的第二個碎片在這裡，請從這個階段的怪物那裡收集到15個雕像碎片，這樣我就可以把它們合在一起，組成一塊完整的雕像部件。");
			cm.dispose();
			return;
			}
			cm.removeAll(4001051);
			cm.gainItem(4001045, 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			eim.setProperty("stage2", 1);
			cm.sendOk("大人，這是女神像的第二個碎片。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001045# #t4001045# 1");
			cm.dispose();
			return;
			}
			cm.sendOk("大人，藏在這裡的第二塊雕像部件，我們已經拿到了。");
			break;
	case 920010400:
		if (cm.getPlayer().getMap().getReactorByName("music").getState() < 1) {
			cm.sendOk("大人，雅典娜女神以前最喜歡聽音樂了，在這裡，請你找到正確的#eCD#n放到播放機上。\r\n#v4001056# 星期日\r\n#v4001057# 星期一\r\n#v4001058# 星期二\r\n#v4001059# 星期三\r\n#v4001060# 星期四\r\n#v4001061# 星期五\r\n#v4001062# 星期六\r\n");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMap().getReactorByName("stone3").getState() < 1) {
			cm.getPlayer().getMap().getReactorByName("stone3").forceHitReactor(1);
			cm.sendOk("大人，這音樂是世界上最好聽的聲音，已經好久沒能聽到這樣的音樂，大人，你看，地圖的最右邊出現了一個箱子，裡面應該有#b雕像部件#k。");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "易克: 地圖的最右邊出現了一個箱子，裡面應該有雕像部件"));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			cm.dispose();
			return;
			}
			cm.sendOk("大人，這音樂是世界上最好聽的聲音，我太高興了。");
			break;
	case 920010700:
		if (eim.getProperty("stage6") == null) {
		if (eim.getProperty("stage6a") == null) {
			eim.setProperty("stage6a", (Math.random() < 0.3) ? "101" : (Math.random() < 0.5) ? "110" : "011");
			}
			var chenhui = 0;
			for (var i = 1; i < 4; i++)
			if (cm.getPlayer().getMap().getReactorByName("" + i).getState() > 0) {
			chenhui++;
			}
		if (chenhui != 2) {
			cm.sendOk("大人，這個階段需要打開上面三個啟動杆其中的兩個，然後由您與我交談，我才能瞭解操作情況。");
			cm.dispose();
			return;
			}
			var x = "";
			for (var i = 1; i < 4; i++)
			x += cm.getPlayer().getMap().getReactorByName("" + i).getState();
			y = x;
		if (y == eim.getProperty("stage6a")) {
			cm.sendOk("大人，組合正確，地上出現了一個#b箱子#k，裡面有#b雕像部件#k。");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "易克: 組合正確，地上出現了一個箱子，裡面有雕像部件"));
			cm.getPlayer().getMap().getReactorByName("stone6").forceHitReactor(1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			eim.setProperty("stage6", 1);
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
			cm.dispose();
			return;
			}
			cm.sendOk("大人，藏在這裡的雕像部件，我們已經找到了。");
			cm.dispose();
			break;
	case 920010800:
		if (cm.getMap(920010800).getReactorById(2001001).getState() < 1) {
			cm.sendNext("大人，想要解開女神封印必須要找到生命草，而生命草的藏在爸爸精靈的身上，要將爸爸精靈引誘出來的方法，只有在花壇裏種出#b黑色的食人花#k。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMap().getMonsterById(9300039) != null) {
			cm.sendNext("大人，請儘快消灭爸爸精灵，拿到生命草，然後我們就可以幫雅典娜女神#b解開封印#k了。");
			cm.dispose();
			return;
			}
			cm.sendNext("大人，我真的是太感动了。");
			break;
	case 920010900:
		if (cm.getMap(920010100).getReactorByName("minerva").getState() > 4) {
			cm.sendNext("大人，這是塔樓的監獄，你可能會在這裡找到一些好東西，但一定要儘快解開謎團。");
			cm.dispose();
			return;
			}
			cm.sendNext("大人，在這裡你找不到任何雕像碎片，請爬上梯子回到中心塔，到其他地方搜索，只有你拯救雅典娜女神之後，才可以回來拿下面的東西。");
			break;
	case 920011000:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("大人，這是塔樓的暗室，請消滅這個房間的所有怪物後，和我談談進入#b寶藏室#k。");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(920011100), cm.getMap(920011100).getPortal(0));
			break;
	case 920011200:
			for (var i = 0; i < item.length; i++)
			cm.removeAll(item[i]);
			cm.getPlayer().changeMap(cm.getMap(200080101), cm.getMap(200080101).getPortal(0));
			}
			cm.dispose();
}