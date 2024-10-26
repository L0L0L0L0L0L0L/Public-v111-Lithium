/*
	名字:	最後演奏曲
	地圖:	101大道
	描述:	103040000
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
		qm.sendNext("Do you remember the last song that the Spirit of Rock played? I can think of a few songs that he may be imitating, so listen carefully and tell me which song it is. #bYou only get one chance,#k so please choose wisely.");
		break;
	case 1:
		var chat = "Here, I'll give you some samples. Please listen to them and choose one. You can only listen to it #bonce#k, so please listen carefully before making your choice.#b";
		chat += "\r\n#L1#Listen to Song No. 1#l";
		chat += "\r\n#L2#Listen to Song No. 2#l";
		chat += "\r\n#L3#Listen to Song No. 3#l";
		chat += "\r\n\r\n#L4##eEnter the correct song.#n#l";
		qm.sendSimple(chat);
		break;
	case 2:
		if (selection == 1) {
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
			qm.sendOk("Awkwardly familiar..."); 
			status = 0;
			}
		if (selection == 2) {
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Coconut/Failed", 4));
			qm.sendOk("Was it this?");
			status = 0;
			}
		if (selection == 3) {
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("quest2293/Die", 4));
			qm.sendOk("You heard that?");
			status = 0;
			}
		if (selection == 4) {
			qm.sendGetNumber("Now, please tell me the answer. You only get #bone chance#k, so please choose wisely. Please enter #b1, 2, or 3#k in the window below.\r\n", 1, 1, 3);
			}
			break;
	case 3:
		if (selection == 1) {
			qm.sendNext("Obviously you don't enjoy music.");
			status = 0;
			}
		if (selection == 2) {
			qm.sendNext("I suppose you could get #b#eone#n#k more chance.");
			status = 0;
			}
		if (selection == 3) {
			qm.sendNext("So that was the song he was playing... Well, it wasn't my song after all, but I'm glad I can know that now with certainty. Thank you so much.");
			}
			break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(2293).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(2293));
		qm.gainExp(3300);
		qm.dispose();
}
}