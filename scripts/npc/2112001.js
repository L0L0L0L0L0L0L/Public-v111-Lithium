/*
	名字:	猶利塔
	地圖:	猶利塔的痕跡
	描述:	926100500
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.dispose();
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
		cm.sendSimple("我被打敗了，瑪迦提亞煉金術的發展也許就這樣結束了，這是多麼悲哀。也許你們會覺得很好笑，我所做的一切都是為了瑪迦提亞！！\r\n#L0##b你應該振作起來，由於你的緣故，瑪迦提亞制定了一些禁止性的法律，對於煉金術的管控更加嚴格，也許這就是你為煉金術的發展所做的貢獻。#l");
		break;
	case 1:
		cm.sendPrev("你們原諒我所做的這一切嗎？我非常抱歉，如果有機會，我願意在煉金術的進步上盡我所能再次幫助社會。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15000 exp");
		break;
	case 2:
		cm.gainExp(15000);
		cm.getPlayer().changeMap(cm.getMap(926100700), cm.getMap(926100700).getPortal(0));
		cm.dispose();
}
}