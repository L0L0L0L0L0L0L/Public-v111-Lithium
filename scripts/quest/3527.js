/*
	名字:	找回遺失的記憶
	地圖:	航海室
	描述:	120000101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNext("A stable position, with a calm demeanor-- but I can tell you're hiding your explosive attacking abilities-- you've become quite an impressive pirate, #h0#. It's been a while.");
		break;
	case 1:
		qm.sendNextPrev("You used to be a kid that was scared of water-- and look at you now. I knew you'd grow to a formidable pirate, but like this? I am thrilled to see you all grown up like this.");
		break;
	case 2:
		qm.sendNextPrev("What I can tell you is-- keep going. As the person responsible for making you a pirate, I have no doubt in my mind that you still have room to grow-- and that you will become an even more powerful force.");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3527));
		Packages.server.quest.MapleQuest.getInstance(3527).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}