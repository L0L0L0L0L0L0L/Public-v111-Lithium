/*
	名字:	赫麗娜
	地圖:	避難準備中
	描述:	914000100
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
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21002)).getStatus() == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Aran, you're awake! How are you feeling? Hm? You want to know what's been going on?");
		break;
	case 1:
		cm.sendNextPrev("We're almost done preparing for the escape. You don't have to worry. Everyone I could possibly find has boarded the ark, and Shinsoo has agreed to guide the way. We'll head to Victoria Island as soon as we finish the remaining preparations.");
		break;
	case 2:
		cm.sendNextPrev("The other heroes? They've left to fight the Black Mage. They're buying us time to escape. What? You want to fight with them? No! You can't! You're hurt. You must leave with us!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21002).forceStart(cm.getPlayer(), 0, 1);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Trio"));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("We're in a dire situation. What would you like to know? \r\n\r\n#b#L0#About the Black Mage#l\r\n#L1#About the preparations for the escape#l\r\n#L2#About the other heroes#l");
		break;
	case 1:
		if (selection == 0)
			cm.sendNext("I hear the Black Mage is very close. We can't even go into the forest because the dragons serving the Black Mage are there. Thar's why we're taking this route. We don't have any choice but to fly to Victoria Island, Aran...");
		if (selection == 1)
			cm.sendNext("We're almost ready to go. We can head over to Victoria Island as soon as the remaining few people board the ark. Shinsoo says there isn't anyone left in Ereve he needs to protect, so he's agreed to guide us.");
		if (selection == 2) {
			cm.sendOk("The other heroes... They've already left to fight the Black Mage. They're slowing the Black Mage down so the rest of us can escape. They didn't want to take you with them because you were injured. Escape with us, Aran, as soon as we rescue the child!");
			}
			break;
	case 2:
		cm.dispose();
}
}