/*
	名字:	烏利卡
	地圖:	人煙稀少的石山
	描述:	931000000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("There you are, #h0#! You're late. Get over here.", 8);
		break;
	case 1:
		cm.sendNextPrevS("What was the hold up? You scared or something?", 4, 2159002);
		break;
	case 2:
		cm.sendNextPrevS("Don't be ridiculous.", 2);
		break;
	case 3:
		cm.sendNextPrevS("You're not s-s-scared at all? I am, a little b-b-bit... The grown-ups warned us never to venture into the #bVerne Mines#k... Plus, there are all those #rBlack Wings#k around, watching us, I just know it.", 4, 2159000);
		break;
	case 4:
		cm.sendNextPrevS("We snuck here, Jun. No one saw us. No one's watching us, okay? Come on, when else would we have ever gotten the chance to leave #bEdelstein#k? Don't be a chicken.", 4, 2159002);
		break;
	case 5:
		cm.sendNextPrevS("But what if we get in trouble?", 4, 2159000);
		break;
	case 6:
		cm.sendNextPrevS("Jun, we're already here. If we're going to get in trouble, let's at least have some fun first. Let's play Hide-and-Seek!", 8);
		break;
	case 7:
		cm.sendNextPrevS("Hide-and-Seek?", 2);
		break;
	case 8:
		cm.sendNextPrevS("Ugh, la-ame.", 4, 2159002);
		break;
	case 9:
		cm.sendNextPrevS("Don't be a brat, Von. What? Are you scared to hide all by yourself in these big, bad caves? *snicker* \r\n#h0#, since you were late, you're it. Count to 10 and then come find us. No peeking.", 8);
		break;
	case 10:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(931000001), cm.getMap(931000001).getPortal(1));
}
}