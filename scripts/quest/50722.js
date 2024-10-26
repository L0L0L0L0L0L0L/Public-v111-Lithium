/*
	名字:	飛向天空！
	地圖:	天空的渡口
	描述:	240080000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(50722)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(50722).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Do you have the Ancient Dragon Wing Scales?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(50722)).getStatus() < 2) {
			y = qm.getPlayer().getJob();
			Packages.server.quest.MapleQuest.getInstance(50722).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(y < 1000 ? 1142 : y < 2000 ? 10001142 : y < 2200 ? 20001142 : y < 2300 ? 20011142 : y < 2400 ? 20021142 : y < 3200 ? 30011142 : 30001142), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("[Skill] Soaring obtained!"));
			qm.gainItem(4032969, -1);
			}
			qm.sendNext("Good, now close your eyes and imagine soaring through the sky on your mount, using the Up Arrow and Jump keys to soar ever higher.");
			break;
	case 2:
		qm.sendNextPrev("Not many mounts know the Soaring skill. Pegasus and Dragon are two creatures that do.");
		break;
	case 3:
		qm.sendNextPrev("Do not forget, you can only stay aloft for a certain amount of time. Press the Jump key often to stay airborne!");
		break;
	case 4:
		qm.dispose();
}
}