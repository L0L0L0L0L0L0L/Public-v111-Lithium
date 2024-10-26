/*
	名字:	過去，歐尼斯龍，黑魔法師
	地圖:	寂靜的洞穴
	描述:	914100021
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Don't be afraid. It is just a journey into memory. It is no more, and no less, than that.");
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
		qm.sendNext("Hundreds of years ago in Maple World, there were many Onyx Dragons. There were just as many humans who loved Onyx Dragons very much... We, my friend Freud and I, always hoped that humans and the Onyx Dragons could forever live in peace...");
		break;
	case 1:
		qm.sendNextPrev("As powerful as we are, Onyx Dragons are born with incomplete spirits. Humans are born with strong wills but weak bodies. Put the two together, and a Dragon Master is born. We wanted the two races to exist in a symbiotic relationship, each helping each.");
		break;
	case 2:
		qm.sendNextPrev("Unfortunately, our wish was destroyed by the #rBlack Mage#k.");
		break;
	case 3:
		qm.sendNextPrevS("#b(The Black Mage? The Black Wings were saying they wanted to resurrect the Black Mage to bring peace to Maple World, weren't they?)", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Perhaps it would be best to show you. #bI will send you on a journey through my memory.#k. Travel back hundreds of years, to just before the war against the Black Mage started. Go to my memory of when Freud and I conversed about making our dream a really...");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(22591).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(900030000), qm.getMap(900030000).getPortal(1));
		qm.dispose();
}
}