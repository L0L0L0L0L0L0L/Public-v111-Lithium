/*
	名字:	率先恢復體力
	地圖:	淺海地帶
	描述:	3000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("The thing is, I don't like apples... Sorry, but no thanks.");
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
		qm.sendNext("Ook, ook! Oook! Ook! Ook! Ook?!");
		break;
	case 1:
		qm.sendNextPrevS("I remember...I was on my way to Maple Island, to become an Explorer... What happened? What's going on?", 2);
		break;
	case 2:
		qm.sendNextPrev("Oook! Ook! Ook! Oooook!");
		break;
	case 3:
		qm.sendNextPrevS("I was talking to the captain, and admiring the scenery, and... Balrog! Balrog attacked the ship! So... Did I fall overboard? Then, why am I alive? I know #bI can swim#k, but can I swim while unconscious? Maybe I can. Maybe I'm a natural swimmer!", 2);
		break;
	case 4:
		qm.sendNextPrev("Ooook! Ook! Ook! (Huh, a little monkey...tapping its foot angrily. Actually, when I first woke up, that monkey was the only thing I saw...)");
		break;
	case 5:
		qm.sendNextPrevS("Huh? Why are you waving your arms like that? Are you trying to tell me something? (The monkey took an apple out of the nearby chest. It looks delicious. But, what is he trying to tell you?)\r\n\r\n#v2010000#", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Ook ook! Om nom nom! (The monkey looks frustrated that you don't understand him. He pretends to eat the apple. Wait, does he want YOU to eat it? That must be it! What a nice monkey.)");
		break;
	case 7:
		qm.gainItem(2010000, qm.getPlayer().itemQuantity(2010000) ? 0 : 1);
		Packages.server.quest.MapleQuest.getInstance(2561).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("(You have received a delicious-looking apple. You should eat it. Now...how do you open your Inventory? Was it the #bI#k key...?)", 2);
		break;
	case 8:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/28"));
		qm.dispose();
}
}