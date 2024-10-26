/*
	名字:	奇怪的情報收集
	地圖:	危險的資料商店
	描述:	910400000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		if (status < 2) {
		qm.sendNext("What are you doing? Stop jibbering and come over!");
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
		qm.sendSimple("Yo, where are you? We have a situation here! \r\n#b#L0# (Yo...? #p1002104# always called me a 'hero,' not 'hey'...)#l");
		break;
	case 1:
		qm.sendAcceptDecline("I have some very important information! Quick, come to #b#m104000004##k!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21733).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendNext("Hmm...my reputation as an Information Dealer's hit rock bottom... I better be much more careful from now on.");
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
		qm.sendNextS("Wow, I would have never guessed something like this would happen to me. Never in my wildest imagination did I think the puppeteer would enter here. I should have trained during my free time. I just got owned!", 8);
		break;
	case 1:
		qm.sendNextPrevS("I'm so sorry. It's all my faut...", 2);
		break;
	case 2:
		qm.sendNextPrevS("Hm? Why would you feel bad? You couldn't have known that they'd show up. No need to apologize. If anything, they just revealed their weaknesses.", 8);
		break;
	case 3:
		qm.sendNextPrevS("Their weaknesses?", 2);
		break;
	case 4:
		qm.sendNextPrevS("There is no reason for the puppeteer to act so urgently if the document he lost was a fake. This proves that the document is the real deal and that the ultimate goal of the Black Wings is the Seal Stone of Victoria Island.", 8);
		break;
	case 5:
		qm.sendNextPrevS("But your location has also been exposed...", 2);
		break;
	case 6:
		qm.sendYesNo("Don't worry! I made a mistake this time because I went out to get an item Lilin sent me, but I'm usually much more careful. I wouldn't last long as an Information Dealer otherwise! I've always got at least one escape route at my disposal. Feel better?");
		break;
	case 7:
		qm.gainExp(1740);
		Packages.server.quest.MapleQuest.getInstance(21733).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("No matter how hard the Black Wings try, they won't be able to stop you from returning to your original state. Keep training until you can defeat the Black Mage. I'll do my best to gather as much information as possible.");
		break;
	case 8:
		qm.dispose();
}
}