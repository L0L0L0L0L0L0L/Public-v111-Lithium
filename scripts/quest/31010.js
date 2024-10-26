/*
	名字:	競技場調查
	地圖:	克里塞基地
	描述:	200100010
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31010)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(31010).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31010)).getCustomData() < 1) {
			qm.sendOk("Yes? You should scout the Coliseum...");
			qm.dispose();
			return;
			}
			qm.sendNext("You must study the enemy to win this fight.");
			break;
	case 1:
		qm.sendNextPrev("What? You went all the way to Coliseum to scout Xerxes' army? Whoa, that's fantastic. Can I ask you a few questions?");
		break;
	case 2:
		qm.sendSimple("What kind of monsters were in the Coliseum? #b\r\n#L0#Rabbits#l\r\n#L1#Scorpies#l\r\n#L2#Ferrets#l\r\n#L3#Herac#l\r\n#L4#Mammoths#l");
		break;
	case 3:
		if (selection < 1) {
			qm.sendNext("You can find many Gerbils outside of town, but I wouldn't think there would be any in the Coliseum...");
			qm.dispose();
			return;
			}
		if (selection < 2) {
			qm.sendNext("Scorpies? Why would they ts in the Coliseum?");
			qm.dispose();
			return;
			}
		if (selection < 3) {
			qm.sendNext("Phenecs! Wait...that doesn't make sense. Are they really in the Coliseum?");
			qm.dispose();
			return;
			}
		if (selection < 4) {
			qm.sendNext("Herac? What in the world is that?");
			qm.dispose();
			return;
			}
			qm.sendSimple("Mammoths? They are very strong... How should we prepare? #b\r\n#L1#I am not sure either.#l\r\n#L2#I think we should prepare sturdy armor so we can protect ourselves.#l\r\n#L3#I don't need any preparations! I can take care of this alone.#l");
			break;
	case 4:
		if (selection != 2) {
			qm.sendNext("No, you'll get hurt if you jump into this without any preparations.");
			qm.dispose();
			return;
			}
			qm.sendNext("You're right! We should prepare accordingly.");
			break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31010).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(4500);
		qm.dispose();
}
}