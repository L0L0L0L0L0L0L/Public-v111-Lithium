/*
	名字:	旅館服務員
	地圖:	奇幻村旅館大廳
	描述:	105000010
*/

var map = [105000011, 105000012];
var cost = [499, 999];

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
		if (status < 3) {
		cm.sendNext("We offer other kinds of services, too, so please think carefully and then make your decision.");
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
		cm.sendNext("Welcome. We're the #m105000000# Hotel. Our hotel works hard to serve you the best at all times. If you are tired and worn out from hunting, how about a relaxing stay at our hotel?");
		break;
	case 1:
		var chat = "We offer two kinds of rooms for service. Please choose the one of your liking.";
		for (var i = 0; i < map.length; i++)
		chat += "\r\n#L" + i + "##b#m" + map[i] + "#(" + cost[i] + " Mesos per use)#l";
		cm.sendSimple(chat);
		break;
	case 2:
		select = selection;
		cm.sendYesNo(select < 1 ? "You've chosen the regular sauna. Your HP and MP will recover fast and you can even purchase some items there. Are you sure you want to go in?" : "You've chosen the VIP sauna. your HP and MP will recover even faster than that of the regular sauna and you can even find a special item in there. Are you sure you want to go in?");
		break;
	case 3:
		if (cm.getPlayer().getMeso() < cost[select]) {
			cm.sendNext("I'm sorry. It looks like you don't have mesos. It will cost you " + (select < 1 ? "at least " : "") + "" + cost[select] + " Mesos to stay at our hotel.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-cost[select]);
			cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
			cm.dispose();
}
}