/*
	名字:	說服莫哈默德
	地圖:	納希民宅
	描述:	260000200
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 5) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3953)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3953).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("If you're going to keep blabbing some nonsense about how Deo has turned into a monster, I'm not interested! ...Huh? Hmm... isn't this Lidium? Looking at its color, this is high-quality Lidium...and it's in good condition... Hmm...you're giving this to me? Well... I can't say no to Lidium. Fine... what is it? \r\n#L0##bI want to inform you that Deo is a monster.#l\r\n#L1#Have you heard that a group of merchants crossing through the desert were attacked by the monsters?#l");
			break;
	case 1:
		if (selection < 1) {
			qm.sendNext("What are you saying?! Deo is the guardian deity of deserts! Get out of here if you're going to keep talking nonsense!");
			qm.dispose();
			return;
			}
			qm.sendSimple("The merchants? ...They probably lacked protection. There aren't any particularly dangerous monsters in the Burning Road, but we should always remain cautious... You must be careful in the desert. \r\n#L0##bThis won't happen if we defeat Deo.#l\r\n#L1#This is all because of the Queen's negligence in maintaining the safety of the town.#l");
			break;
	case 2:
		if (selection < 1) {
			qm.sendNext("What are you talking about? It would have been much more dangerous if it weren't for Deo!");
			qm.dispose();
			return;
			}
			qm.sendSimple("You're right! It's because of the Queen! Ever since her reign, the ever-wise Abdullah Vlll has changed and Ariant is slowly perishing...like an oasis drying out! And it's all her fault! \r\n#L0##bWhat is the guardian of deserts doing when we're under the Queen's tyranny?#l\r\n#L1#We must hurry up and form an army to escape from the Queen's oppression!#l");
			break;
	case 3:
		if (selection > 0) {
			qm.sendNext("This is true! But who would have the courage to do so...?");
			qm.dispose();
			return;
			}
			qm.sendSimple("...I agree. Only if Deo had helped us a little... How could he be so heartless? \r\n#L0##bPerhaps, Deo has already turned into a monster.#l\r\n#L1#He couldn't have done anything as a monster, right?#l");
			break;
	case 4:
		if (selection > 0) {
			qm.sendNext("Deo isn't just any monster! Don't underestimate his power!");
			qm.dispose();
			return;
			}
			qm.sendSimple("What are you talking about? Deo has turned into...a monster? But he's the guardian deity of Ariant... Well, Ariant isn't the same as it used to be... \r\n#L0##bI know ...and on top of that, Queen Areda is sucking the life out of the desert. Perhaps Deo's divine powers were lost and he gradually turned into a monster...#l");
			break;
	case 5:
		qm.gainItem(4011008, -1);
		Packages.server.quest.MapleQuest.getInstance(3953).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("You might be right. I can't believe Ariant has changed like this, but this could be directly related to Deo's transformation. Perhaps, it really is time for us to defeat Deo...");
		break;
	case 6:
		qm.dispose();
}
}