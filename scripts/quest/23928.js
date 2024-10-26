/*
	名字:	姐姐的生日派對1
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNext("Aww, you don't want to? What am I going to do! What kind of cake doesn't have cream??");
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
		qm.sendNext("Ow, my arms. I don't think I can do this. You see, my older sister is very smart and pretty. She's busy but she's always kind to everyone.");
		break;
	case 1:
		qm.sendNextPrev("Her birthday is coming up so I wanted to bake her a really nice cake. I didn't realize how hard it is to make cream, though. My arms are so sore. Hey if you have some time, can you help me?");
		break;
	case 2:
		qm.sendAcceptDecline("You can make cream by hitting the sides of the device, where the cream is being whipped, with normal attacks. You can bring me the cream once its complete. Think you can do it? If you say yes, I'll send you to the kitchen!");
		break;
	case 3:
		if (qm.getMap(931010020).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23928).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(931010020).resetFully();
			qm.getPlayer().changeMap(qm.getMap(931010020), qm.getMap(931010020).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(300, qm.getMap(310000000));
			qm.dispose();
			return;
			}
			qm.sendNext("Huh? Someone must have gone into the Storage Room. Try again a little later.");
			qm.dispose();
}
}