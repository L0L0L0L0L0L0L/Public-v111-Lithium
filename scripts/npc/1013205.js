/*
	名字:	亞普力耶
	地圖:	陣地後面
	描述:	900030000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.sendNext("Are you ok, master? You look so tired.");
		break;
	case 1:
		cm.sendNextPrevS("#bI'm fine. Aran is the only one who's hurt, since he was fighting on the front lines. But everyone's all right. How about you? Are you ok?", 2);
		break;
	case 2:
		cm.sendNextPrev("No problem whatsoever.");
		break;
	case 3:
		cm.sendNextPrevS("#bI'm not worried about your physical state. I'm more worried about your heart. Your entire race has been completely...", 2);
		break;
	case 4:
		cm.sendNextPrev("...");
		break;
	case 5:
		cm.sendNextPrevS("#bI'm so sorry. I got you into this whole mess. I should have let you go with the Black Mage. If you had gone with the Black Mage, all the Onyx Dragons would have survived!", 2);
		break;
	case 6:
		cm.sendNextPrev("Don't be silly, master. We fought because we chose to. It is not your fault.");
		break;
	case 7:
		cm.sendNextPrevS("#bBut...", 2);
		break;
	case 8:
		cm.sendNextPrev("I don't care how much the Black Mage wants our powers. We'd never align ourselves with him. We Onyx Dragons belong with humans. You are the ones with such strong spirits. We could never become one with such an evil being.");
		break;
	case 9:
		cm.sendNextPrev("So, please do not apologize, master...Freud. Even if we are completely annihilated, that is our choice. You must respect our wishes.");
		break;
	case 10:
		cm.sendNextPrevS("#bAfrien...", 2);
		break;
	case 11:
		cm.sendNextPrev("I have one request, though. If I...die in the final battle against the Black Mage, could you watch over my child? It will be a long, long time before it hatches from its egg, but...I trust you with it.");
		break;
	case 12:
		cm.sendNextPrevS("#bDon't say things like that, Afrien. You must stay alive and take care of your own child!", 2);
		break;
	case 13:
		cm.sendNextPrev("Who knows whether either of us will survive? That is why I'm asking you. Promise me, master?");
		break;
	case 14:
		cm.sendNextPrevS("#bOkay, okay, I promise. But you need to promise me something, too. You have to promise that you will do everything in your power to survive.", 2);
		break;
	case 15:
		cm.sendNextPrev("Done, master.");
		break;
	case 16:
		cm.sendNextPrevS("#bDo not sacrifice yourself on my behalf.", 2);
		break;
	case 17:
		cm.dispose();
		Packages.server.quest.MapleQuest.getInstance(22601).forceStart(cm.getPlayer(), 0, 1);
		cm.getPlayer().changeMap(cm.getMap(914100021), cm.getMap(914100021).getPortal(1));
}
}