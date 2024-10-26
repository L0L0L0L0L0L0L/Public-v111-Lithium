/*
	名字:	智慧爺爺
	地圖:	維多利亞港
	描述:	104000000
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
		cm.sendNext("I see. More of a loner-type, huh? Going your own way? Following nobody's rules but your own?");
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("Are you broke, or just lonely?");
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
		cm.sendYesNo("I'm hoping for lots of business today! Friendly business from people looking to expand their Buddy List! You look like you might be... mildly popular. Give me some mesos and you can have even MORE friends? Just you though, not anybody else on your account.");
		break;
	case 1:
		cm.sendYesNo("You're lucky! I'm giving you a #rmassive discount#k. #bIt'll be 50000 Mesos to permanently add 5 slots to your Buddy List#k. That's a deal for somebody as popular as you are! What do you say?");
		break;
	case 2:
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (cm.getPlayer().getMeso() < 50000 || capacity > 199) {
			cm.sendNext("Uh, you sure you got the money? It's #b50000 Mesos#k. Or maybe your Buddy List has already been fully expanded? No amount of money will make that list longer than #b200#k.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-50000);
			cm.getPlayer().setBuddyCapacity(capacity + 5);
			cm.sendOk("You just got room for five more friends. I'll be here if you need to add more, but I'm not giving these things out for free.");
			break;
	case 3:
		cm.dispose();
}
}