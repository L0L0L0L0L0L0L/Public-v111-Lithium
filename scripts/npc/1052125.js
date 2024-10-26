/*
	名字:	俊伊
	地圖:	7層8層 A區域
	描述:	103040400
*/

function start() {
	cm.sendSimple("等等！由於改建，進入該區域的道路受到限制，我只能允許符合某些條件的人進入這裡。\r\n#L0##b幫助#p1052120##l\r\n#L1#我是購物中心的VIP#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2286)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2287)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2288)).getStatus() == 1) {
			cm.getPlayer().changeMap(cm.getMap(103040410), cm.getMap(103040410).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendOk("少和我來這套，我沒有聽到#b#p1052120##k說你在幫助他。");
			cm.dispose();
			break;
	case 1:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2290)).getStatus() > 1) {
			cm.getPlayer().changeMap(cm.getMap(103040440), cm.getMap(103040440).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendOk("#bVIP#k? 不要以為我好騙，在我叫警衛之前你最好離開。"); 
			}
			cm.dispose();
}