/*
	名字:	飛向天空2
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3759)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3759).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Whoa, you've brought it! Just hold on a minute! I'll make you the special potion.");
			break;
	case 1:
		qm.sendNextPrev("Alrighty! Are you ready? lf you are, I will go ahead andsprinkle this potion on you.You'll be able to fly then!");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3759)).getStatus() < 2) {
			y = qm.getPlayer().getJob();
			Packages.server.quest.MapleQuest.getInstance(3759).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(y < 1000 ? 1026 : y < 2000 ? 10001026 : y < 2200 ? 20001026 : y < 2300 ? 20011026 : y < 2400 ? 20021026 : y < 3200 ? 30011026 : 30001026), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You have obtained the Soaring skill."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have obtained the Soaring skill."));
			qm.gainItem(4032531, -1);
			}
			qm.sendNextPrev("Ok. Looks like you're all set to use the Soaring skill! There's one thing you should keep in mind. You can only use the Soaring skill where there's Dragon energy. The only such place that I know of is the Crimson Sky Dock.");
			break;
	case 3:
		qm.sendPrev("Oh! If you fall while using a flying skill, it will cause #bgreater damage than a normal fall#k. That can be dangerous, even fatal. Be careful out there.");
		break;
	case 4:
		qm.dispose();
}
}