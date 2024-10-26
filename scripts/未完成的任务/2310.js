/*
	名字:	危機的菇菇國王
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Hemm, this is really urgent Pease let me know if you change your mind.");
		qm.dispose();
		return;
		}
		if (status == 3) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendAcceptDecline("You were successful in passing the job advancement test That's great I just received a request from outside for help, so I was looking for the right person. Do you think you can help?");
		break;
	case 1:
		qm.sendNext("菇菇王國是一個位於弓箭手村附近，由菇菇們建立起來的王國。一向愛好和平的菇菇國王管理著這個國家。但是最近，菇菇國王的健康惡化，他準備向女兒菲歐娜公主移交王權的時候，似乎出現了一些問題。");
		break;
	case 2:
		qm.sendNextPrev("不知到底發生了什麼事情，不過好像遇到了很大的麻煩，所以最好還是去一趟，看看有什麼事情可以幫忙。如果是勇士的話，應該能解救陷入危機的菇菇王國。我已經寫好了推薦書，快去菇菇王國吧。去找#b#p1300005##k就可以了。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4032375# #t4032375# 1");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			qm.sendYesNo("順便問一句，你認識去菇菇王國的路嗎？如果你不知道也沒關係。我可以直接把你送過去。");
			break;
	case 4:
		qm.sendNext("好的，我現在送你去菇菇森林入口。祝你好運。");
		break;
	case 5:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(2310).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(106020001), qm.getMap(106020001).getPortal(0));
}
}

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
		qm.sendNext("嗯？#v4032375#！！！什麼，你是…轉職教官推薦你來的？");
		break;
	case 1:
		qm.sendNextPrevS("是…這樣啊。");
		break;
	case 2:
		qm.sendPrev("嗯……我瞭解了，既然轉職教官都認可了，那一定就是勇士了。很抱歉我沒有自我介紹，我是菇菇王國的警衛隊長，正如你所看到的，這裡是我們暫時的藏身之地，我們的情況很糟糕，儘管如此，#b歡迎你來到菇菇王國#k。");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2310).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(500);
		qm.dispose();
}
}