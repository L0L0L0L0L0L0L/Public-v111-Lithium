/*
	名字:	奇怪的女子，吉可穆德
	地圖:	寶貝龍
	描述:	寶貝龍
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
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22612)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22612).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("有什麼事嗎？不好意思，我很忙。你能說簡單一點嗎？");
			break;
	case 1:
		qm.sendNextPrevS("……你想裝作不認識嗎？我們之前不是在洞穴裡見過面嗎！");
		break;
	case 2:
		qm.sendNextPrev("我不知道你在說什麼。洞穴……我怎麼會去那種地方？");
		break;
	case 3:
		qm.sendNextPrev("說謊！你以為光靠一個面具，就能騙過寶貝龍嗎？", 1013000);
		break;
	case 4:
		qm.sendNextPrev("……蜥蜴說話了？！");
		break;
	case 5:
		qm.sendNextPrev("我不是蜥蜴！我是歐尼斯龍！", 1013000);
		break;
	case 6:
		qm.sendNextPrev("歐尼斯龍……？");
		break;
	case 7:
		qm.sendNextPrev("快說！你和黑色翅膀是什麼關係，為什麼會在這裡？黑色翅膀的朋友？還是敵人？！", 1013000);
		break;
	case 8:
		qm.sendPrev("噓！安靜。你不知道這個村裡有很多黑色翅膀的監視者嗎？哈……這裡不是說話的地方。沒辦法。我們在埃德爾斯坦公園3見吧。");
		break;
	case 9:
		Packages.server.quest.MapleQuest.getInstance(22612).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}