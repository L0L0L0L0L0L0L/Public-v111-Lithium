/*
    Name:    Chillestan
    Map:     Twilight of the Gods
    Description: 270050100
*/

function start() {
	cm.sendAcceptDecline("Only with the Mirror of Kindness can you summon the Black Mage. Wait!! Something is wrong, why isn't the Black Mage being summoned? What is this power? I feel... #bThis is completely different from the Black Mage#k... Ahhhhh!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.forceStartReactor(270050100, 2709000);
	}
	cm.dispose();
}
