/*
	名字:	解凍感情的魔祭司
	地圖:	魔法提煉師的房間
	描述:	270020211
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3514)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3514).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getPlayer().getStat().heal(qm.getPlayer());//加滿HP
			qm.dispose();
			return;
			}
			qm.sendNext("Hmm, I see you've drank all the potion. So how was it? Wasn't I right about the effects? My potion is perfection!");
			break;
	case 1:
		qm.sendNextPrev("What? You're okay with losing HP? That's nonsense! It's just not true! \r\n\r\n#fUI/UIWindow2.img/QuestIcon/11/0# Willpower 50\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 2458000 exp");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3514).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.addPartyTrait("will", 50); //意志
		qm.gainExp(2458000);
		qm.dispose();
}
}