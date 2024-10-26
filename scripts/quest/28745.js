/*
	名字:	受災鎮的鎮長
	地圖:	新葉城-市區中心
	描述:	600000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
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
		qm.sendAcceptDecline("This place is going bananas! #b#m600000000##k got hit with some CRAZY earthquakes! I'm talking buildings falling over, fields disappearing into the ground. I don't even recognize the city I made! I'd hire a seismologist, but the budget's all tied up in expansion right now. You're pretty seimologically inclined. Think you could help out?");
		break;
	case 1:
		qm.sendAcceptDecline("That's what I like to hear! Meet me at #b#m600000000##k. If you need a ride, I can send my special Invisible Mayoral Hover Limo, no charge. What do you say?");
		break;
	case 2:
		qm.sendNextS("All right! I knew you liked to ride in style. You won't actually see the limo. Just stand still.", 1);
		break;
	case 3:
		qm.dispose();
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28745)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28745)), true);
		qm.getPlayer().changeMap(qm.getMap(600000000), qm.getMap(600000000).getPortal(8));
}
}