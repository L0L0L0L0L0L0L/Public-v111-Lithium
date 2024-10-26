/*
	名字:	卡勒奇沙
	地圖:	流浪團的帳棚
	描述:	260010600
*/

var map = [100000000, 101000000, 102000000, 103000000, 104000000];

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
		cm.sendNext("Aye...are you scared of speed or heights? You can't trust my flying skills? Trust me, I've worked out all the kinks!");
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("You must be short on cash.");
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
		cm.sendAcceptDecline("I don't know how you found out about this, but you came to the right place! For those who wandered around Nihal Desert and are getting homesick, I am offering a flight straight to Victoria Island, non-stop! Don't worry about the flying ship--it's only fallen once or twice! Don't you feel claustrophobic being in a long flight on that small ship? What do you think? Are you willing to take the offer on this direct flight?");
		break;
	case 1:
		cm.sendAcceptDecline("Please remember two things. One, this line is actually for overseas shipping, so #rI cannot guarantee exactly which town you'll land#k. Two, since I am putting you in this special flight, it'll be a bit expensive. The service charge is #e#b10,000 mesos#n#k. There's a flight thats about to take off. Are you interested?");
		break;
	case 2:
		cm.sendNext("Okay, ready for takeoff!");
		break;
	case 3:
		if (cm.getPlayer().getMeso() > 10000) {
			cm.gainMeso(-10000);
			cm.getPlayer().changeMap(cm.getMap(map[Math.floor(Math.random() * map.length)]), cm.getMap(map[Math.floor(Math.random() * map.length)]).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Hey, are you short on cash? As I've said, you'll need #b10,000#k mesos to get on this.");
			break;
	case 4:
		cm.dispose();
}
}