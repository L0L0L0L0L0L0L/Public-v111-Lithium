/*
	名字:	雪歸島的地圖
	地圖:	靈藥幻境
	描述:	251000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
		qm.dispose();
		return;
		}
		if (status < 4) {
		qm.sendOk("Hmm... You seem pretty strong... Are you saying those pirates are stronger than you?");
		qm.dispose();
		return;
		}
		if (status < 5) {
		qm.sendNext("You'll never get your hands on the map, then.");
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
		qm.sendSimple("Do you like adventure? You exude a strong energy, it's quite amazing. So, what is someone like you doing in this town? You're here to see me? For what? \r\n#L0##bDo you have the Map of Turtle Island?#l");
		break;
	case 1:
		qm.sendSimple("Turtle Island? Ahh, that island I saw a long time ago, during my days as a fisherman. To answer your question, yes, I have it. You can't go too far because of the pirates, but I kept the map, anyway. \r\n#L0##bCan I have the Map of Turtle Island?#l");
		break;
	case 2:
		qm.sendSimple("The island is surrounded by coral reef and powerful waves, not to mention the strong wind. It was given its name, because it looks so much like a turtle, but not many people even know about it. You still want the map? \r\n#L0##bI still want the map.#l");
		break;
	case 3:
		qm.sendYesNo("Well, if you really want it, I can't stop you. I'll give you the map if you do me a simple favor. Defeat #r100 #o9001029#s#k and #r100 #o9001030#s#k of the Red-Nose Pirates who threaten #m251000000#. Think you can handle it?");
		break;
	case 4:
		qm.sendYesNo("If you want, I can send you to the Red-Nose Pirate Den. Would you like to go right now?");
		break;
	case 5:
		qm.getPlayer().changeMap(qm.getMap(925110001), qm.getMap(925110001).getPortal(1));
		qm.dispose();
}
}