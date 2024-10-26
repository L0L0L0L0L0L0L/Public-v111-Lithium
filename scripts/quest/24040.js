/*
	名字:	醒来
	地圖:	精靈遊俠
	描述:	精靈遊俠
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24040)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24040).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("How can this be? I can't be level 10! Even level 100 would be ridiculous, but 10?! This must be a nightmare! That's it! I'll pinch myself to wake up...", 16);
			break;
	case 1:
		qm.sendNextPrevS("OW! Then this is real? Did the curse do this to me? I didn't like the Black Mage when he was destroying Maple World, but this is UNFORGIVEABLE! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 500 exp", 16);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(24040).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/mersedesQuest/Scene2"));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/questEffect/mercedes/q24040"));
		qm.gainExp(500);
		qm.dispose();
}
}