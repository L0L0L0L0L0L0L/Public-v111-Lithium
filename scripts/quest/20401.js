/*
	名字:	狩獵殭屍
	地圖:	冰原雪域
	描述:	211000000
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
		qm.sendSimple("Hmm? Dunamis? Oh, of course I know. He and Scadur used to hang out and hunt together all the time. He seemed quite imposing, so I had a difficult time trying to strike up a conversation. For a while, it looked like he was investigating something at El Nath; and then soon, he disppeared from the world. Do you have any idea where he might be? \r\n\r\n#b#L0#l had been looking for one as well. What did he do?#l");
		break;
	case 1:
		qm.sendAcceptDecline("He was never really home; rather, he was just concentrating on #rhunting down the zombies#k. I thought he was training, but that wasn't the case. If nothing else, he seemed intent on finding some item. I have no idea what that is, but I do know that he possessed incredible strength. So, is this it for the question?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(20401).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20401));
		qm.sendOk("You must be in the same field with him. Huh? How did I know? Well, I can't really pinpoint it, but it felt like you and that person had a similar feel to it. Anyway, good luck!! Dunamis is such a no-nonsense, intense guy that it worries me that you might later take on a #rdangerous task#k...");
		break;
	case 3:
		qm.dispose();
}
}