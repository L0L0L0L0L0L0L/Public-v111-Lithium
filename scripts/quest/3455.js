/*
	名字:	陷入危機的葛雷
	地圖:	克嵐草原Ⅱ
	描述:	221040100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 5) {
		qm.dispose();
		return;
		}
		if (status < 6) {
		qm.sendNext("Too bad. Well, I guess I'll see you around.");
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
		qm.sendSimple("You...you're back! My human friend, it's nice to see you again, but I really don't have time to chat. Perhaps next time? \r\n#L0# #b(Activate the Wave Translator.)#l");
		break;
	case 1:
		qm.sendSimple("You can ask about Zeno all you want, but I don't have anything to say. The seniors are in charge of Zeno, so I don't know anything.(Oh no, it seems like my palate is getting accustomed to human food. Everything about me is becoming more and more human.) \r\n#L0# #b(Wave Translator activated)#l");
		break;
	case 2:
		qm.sendSimple("More importantly, what has happened to you, my human friend? You're not cooperating with the hypocrites in the Omega Sector, are you? (Even my standards for attractiveness are being affected by the humans. Agent Marco is probably the most handsome human ever.) \r\n#L0# #b(Wave Translator activated)#l");
		break;
	case 3:
		qm.sendSimple("The Grays do not want to hurt the humans. We want to get closer, don't you know? (No, forget it! If Prince finds out, he'll be furious!) \r\n#L0# #b(Wave Translator activated)#l");
		break;
	case 4:
		qm.sendSimple("Don't be afraid of our guidance. The Grays are on the human's side. We will lead the humans to glory. (Let's think of more practical things like washing my chute and drying food... I'm going to get alien's eczema soon.) \r\n#L0# #b(Wave Translator activated )#l");
		break;
	case 5:
		qm.sendAcceptDecline("So, would you like to cooperate with us now?");
		break;
	case 6:
		if (qm.getPlayer().itemQuantity(4031927)) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3455));
			qm.gainItem(4031927, -1);
			}
			qm.sendNext("You must have decided to side with the Grays! Here, sign this contract to pledge your loyalty!");
			break;
	case 7:
		qm.sendNextPrev("Seems like you've made up your mind. Haha! Are you truly happy to have signed your life away to the Grays? What? Am I joking around?");
		break;
	case 8:
		qm.sendNextPrev("What, what are you talking about? You seem so serious. Hmmm... I guess I don't have what it takes to read human facial expressions yet...");
		break;
	case 9:
		qm.sendPrev("#b(Alien Gray has nothing more to say... It seems you've collected nothing but useless information... The Wave Translator must have malfunctioned. Perhaps, you should ask Dr. Kim to build another Wave Translator.)");
		break;
	case 10:
		qm.dispose();
}
}