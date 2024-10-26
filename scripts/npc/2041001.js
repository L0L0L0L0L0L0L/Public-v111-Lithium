/*
	名字:	船員 阿霖
	地圖:	候船室&amp;lt;開往天空之城&gt;
	描述:	220000111
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
		if (status < 2) {
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
		var chat = "尊貴的顧客，歡迎乘坐開往" + (cm.getPlayer().getMap().getId() == 220000111 ? "天空之城" : "玩具城") + "的飛船，我是本次旅途的服務生#p" + cm.getNpc() + "#，請問有什麼能为您服务的？#b";
		chat += "\r\n#L0#询问啟航时间";
		chat += "\r\n#L1#我想要離開这里";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection < 1) {
			cm.sendOk("請耐心等待，我們馬上就要準備啟航，祝您本次旅途愉快。");
			cm.dispose();
			}
		if (selection < 2) {
			cm.sendYesNo("您隨時都可以離開這裡，不過想要再進來需要重新買票，您還想離開嗎？");
			}
			break;
	case 2:
		map = cm.getPlayer().getMap().getId() == 220000111 ? 220000110 : 200000121;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(1));
		cm.dispose();
}
}