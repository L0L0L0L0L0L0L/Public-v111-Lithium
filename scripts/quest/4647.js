/*
	名字:	訓練師的秘方
	地圖:	寵物公園
	描述:	100000202
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(4647)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(4647).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (!qm.getPlayer().itemQuantity(5460000)) {
			qm.sendOk("You do not have #b#t5460000##k. Come back when you have it.");
			qm.dispose();
			return;
			}
			qm.sendSimple("Hurry hurry! I have a new pet to train here! In order to train a pet, a Pet Snack is an essential item to have. \r\n#L0##bHere's the Pet Snack#l\r\n#L1#So you're going to teach me after I give you the Pet Snack? I don't believe it...#l");
			break;
	case 1:
		if (selection > 0) {
			qm.sendOk("You seem a bit too skeptical. Think about it, and let me know.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(4647)).getStatus() < 2) {
			y = qm.getPlayer().getJob();
			Packages.server.quest.MapleQuest.getInstance(4647).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(y < 1000 ? 8 : y < 2000 ? 10000018 : y < 2200 ? 20000024 : y < 2300 ? 20011024 : y < 2400 ? 20020024 : y < 3200 ? 30010024 : 30000024), 1, 1, -1);
			qm.gainItem(5460000, -1);
			}
			qm.sendNext("Please be aware that stats that directly affect pets like Jump. Speed, and others will follow that of the Lead Pet. As for the Selective Pick-Up skill, the Lead Pet needs to have it so the other pets will share the same skill. I sincerely hope you can lead these pets well.");
			break;
	case 2:
		qm.sendNextPrev("Oh, thank you so much. I'll definitely put this to good use. A Pet Snack is essential for a pet trainer like me! If you aren't good at handling pets, then it's useless. Now that I've taught you my secret method, you'll be able to bring along up to 3 pets at once. Select a Lead Pet and the other pets will follows its stats and skills. It certainly doesn't hurt to have the highest-leveled pet as the Lead Pet. Also, you can teach your pets to avoid certain items when picking up items and droppings through the skill called Selective Pick-Up. Take good care of each of them. They deserve it. Be sure to show the world your talents!");
		break;
	case 3:
		qm.dispose();
}
}