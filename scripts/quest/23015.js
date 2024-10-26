/*
	名字:	美洲豹馴化
	地圖:	秘密廣場
	描述:	310010000
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
		qm.sendNextS("Wild Hunters must have a Mount. When you became a Wild Hunter, you should have gotten the Capture skill. You can use that skill to tame and ride a Jaguar.", 1);
		break;
	case 1:
		qm.sendNextPrevS("You can find the #s30001061# skill in your skill window. After you attack a Jaguar and get it down to half life, you can use the Capture skill to capture it. Then, use the #s33001001# skill to ride it. Simple, right?", 1);
		break;
	case 2:
		qm.sendNextPrevS("You would like to know where you can find some Jaguars? Black Jack, sitting here in front of me, will lead you to them.", 1);
		break;
	case 3:
		qm.sendNextPrevS("Umm, Black Jack? Can you tell where I should go?", 3);
		break;
	case 4:
		qm.sendNextPrevS("Hmm, a new Wild Hunter? You are still a rookie.", 5, 2151008);
		break;
	case 5:
		qm.sendNextPrevS("Although I am still weak, I will work hard to become a valuable member of the Resistance. Now, where can I find the Jaguars?", 3);
		break;
	case 6:
		qm.sendNextPrevS("You have a good attitude. I will let you meet my brothers. Talk to me whenever you want to meet with them.", 5, 2151008);
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(23015).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23015));
		qm.getPlayer().changeMap(qm.getMap(931000500), qm.getMap(931000500).getPortal(1));
		qm.dispose();
}
}