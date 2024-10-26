/*
    Name: Yulita
    Map: Yulita's Traces
    Description: 926110500
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
				cm.dispose();
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
			cm.sendSimple("I have been defeated, and the development of Magatia's alchemy may come to an end. How sad. You might find it amusing, but everything I did was for Magatia!!\r\n#L0##bYou should pull yourself together. Because of you, Magatia has established some restrictive laws, making alchemy control more stringent. Perhaps this is your contribution to the development of alchemy.#l");
			break;
		case 1:
			cm.sendPrev("Do you forgive me for everything I've done? I am very sorry. If given the chance, I would be willing to help society again in the advancement of alchemy.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15,000 exp");
			break;
		case 2:
			cm.gainExp(15000);
			cm.getPlayer().changeMap(cm.getMap(926110700), cm.getMap(926110700).getPortal(0));
			cm.dispose();
	}
}
