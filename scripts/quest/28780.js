/*
	名字:	外星人殲滅戰
	地圖:	新葉城
	描述:	600000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendOk("#b#m600000000##k bad shape due to aliens. Please help us.");
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
		qm.sendNext("The alien digging has really done a number on the paths out of town. It's a huge pain!");
		break;
	case 1:
		qm.sendYesNo("Please go stop them from messing up our fields!");
		break;
	case 2:
		qm.sendNext("We've got to get the aliens' #b#v4033190# #t4033190##k out of their hands! We nave to really make it count, so you're going to need to get about 100 of them! That will slow them down!");
		break;
	case 3:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28780)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28780)), true);
		qm.dispose();
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
		if (qm.getPlayer().itemQuantity(4033190) < 100) {
			qm.sendOk("I don't think you collected 100 #b#v4033190# #t4033190##k items yet.");
			qm.dispose();
			return;
			}
			qm.sendNext("This is fantastic! I'm going to get these to the researchers right now! Feel free to bring any more #b#t4033190##k thingies you get your hands on. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 150000 exp");
			break;
	case 1:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28780)).setStatus(0);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28780)), true);
		qm.gainItem(4033190, -100);
		qm.gainExp(150000);
		qm.dispose();
}
}