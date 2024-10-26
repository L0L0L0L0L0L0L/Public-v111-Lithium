/*
	名字:	羅傑與蘋果
	地圖:	嫩寶村
	描述:	20000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
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
		qm.sendNext("Hey there, what's up! The name's Roger, and I'm here to teach you new, wide-eyed Maplers lots of cool things to help get you started.");
		break;
	case 1:
		qm.sendNextPrev("You are asking who made me do this? No one! It's just all out of the overflowing kindness of my heart. Haha!");
		break;
	case 2:
		qm.sendAcceptDecline("So...let me just do this for fun! Abracadabra!");
		break;
	case 3:
		qm.getPlayer().addHP(qm.getPlayerStat("HP") > 40 ? -25 : 0);
		qm.gainItem(2010007, qm.getPlayer().itemQuantity(2010007) ? 0 : 1);
		Packages.server.quest.MapleQuest.getInstance(1021).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Ha! Your HP bar almost emptied! If your HP ever gets to 0, you're in trouble. To prevent that, consume food and potions. Here, take this #r#t2010007##k. Open your inventory (press I) and double-click the apple to eat it.");
		break;
	case 4:
		qm.sendNextPrev("Eat the Roger's Apple to get back HP. Talk to me after you do.");
		break;
	case 5:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/28"));
		qm.dispose();
}
}

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
		qm.sendNext("Easy, right? You can set up a #bhotkey#k in the quickslots to the lower right of the screen to make it even easier. Oh, and your HP will automatically recover if you stand still, though it takes time.");
		break;
	case 1:
		qm.sendNextPrev("Alright! I suppose after all that learning, you should receive a reward. This gift is a must for your travel in Maple World, so thank me! Use this for emergencies!");
		break;
	case 2:
		qm.sendNextPrev("Well, that's about all I can teach you. I know it's sad, but it is time to say goodbye. Take good care of yourself and do well, my friend! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2010000# 3 #t2010000# \r\n#v2010009# 3 #t2010009# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(1021).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(2010000, 3);
		qm.gainItem(2010009, 3);
		qm.gainExp(10);
		qm.dispose();
}
}