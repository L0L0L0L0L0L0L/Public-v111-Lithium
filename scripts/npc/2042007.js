function start() {
	if (cm.getPlayer().getMap().getId() == 980030010) {
		cm.sendNext("How was it? Did you enjoy the Monster Carnival? Regardless, your support has been my greatest honor!");
	} else {
		cm.sendNext("What a spectacular performance! I hope the Monster Carnival brought you joy.\r\n#bYour score for this round: #r" +
			(cm.getCarnivalParty().getTotalCP() < 1000 ? "D" :
				cm.getCarnivalParty().getTotalCP() < 2000 ? "C" :
					cm.getCarnivalParty().getTotalCP() < 3000 ? "B" : "A") + "");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		if ((cm.getPlayer().getMap().getId() / 100) % 4 == 3 &&
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29021)).getStatus() == 1) {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)).setCustomData(
				parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)).getCustomData()) + 1
			);
			cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)), true);
		}
		cm.gainExp(cm.getPlayer().getMap().getId() != 980030010 ? cm.getPlayer().getLevel() * cm.getCarnivalParty().getTotalCP() : 0);
		cm.getCarnivalParty().removeMember(cm.getChar()); // Remove points for this Monster Carnival session
		cm.getPlayer().changeMap(cm.getMap(980030000), cm.getMap(980030000).getPortal(0));
	}
	cm.dispose();
}
