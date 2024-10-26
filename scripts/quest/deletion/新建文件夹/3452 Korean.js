/*
	名字:	機器章魚是外星生物？
	地圖:	司令室
	描述:	221000300
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
		var reactor = 'action' + (qm.getPlayer().itemQuantity(4001125) ? 2 : 1);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("문어 열쇠고리는 구해 왔는가? 흐음... 귀엽게 생긴 물건이군. 하지만 이게 바로 지구를 위협하는 외계인의 정체를 밝힐 중요한 물건이지. 정말 고맙네. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2000011# #t2000011# 50 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 8000 exp");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3452).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4000099, -1);
			qm.gainItem(2000011, 50);
			qm.gainExp(8000);
			qm.sendNext("블럭퍼스와 외계인... 아무리 생각해도 뭔가 비슷하단 말이야. 아니, 문어와 외계인이 비슷한 걸지도... 흐음. 이것도 새로운 이론이군.");
			break;
	case 2:
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("문어 열쇠고리는 구해 왔는가? 흐음... 귀엽게 생긴 물건이군. 하지만 이게 바로 지구를 위협하는 외계인의 정체를 밝힐 중요한 물건... 잠깐!");
		break;
	case 1:
		qm.sendNextPrev("자네가 가지고 있는 그 물건! 그것 좀 보여주게. 자네 손에 들고 있는 바로 그 설계도 말일세. 오~이런 물건을 어디서 구한건가? 이것만 있으면 블록퍼스에 대한 연구를 더 빨리 진행시킬 수 있겠어.");
		break;
	case 2:
		qm.sendNextPrev("뜻밖의 수확인걸. 좋아. 자네에게 특별한 선물을 하도록 하지. 분명 도움이 될거야. 하하하~ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2040701# #t2040701# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16000 exp");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3452).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4000099, -1);
			qm.gainItem(4001125, -1);
			qm.gainItem(2040701, 1);
			qm.gainExp(16000);
			qm.sendNext("블럭퍼스와 외계인... 아무리 생각해도 뭔가 비슷하단 말이야. 아니, 문어와 외계인이 비슷한 걸지도... 흐음. 이것도 새로운 이론이군.");
			break;
	case 4:
		qm.dispose();
}
}