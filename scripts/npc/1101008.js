/*
	名字:	提酷
	地圖:	開始之森林1
	描述:	130030000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
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
		var chat = "Wait! You'll figure the stuff out by the time you reach Lv. 10 anyway, but if you absolutely want to prepare beforehand, you may view the following information.\r\n\r\n Tell me, what would you like to know?#b";
		chat += "\r\n#L0#Abot You";
		chat += "\r\n#L1#Mini Map";
		chat += "\r\n#L2#Quest Window";
		chat += "\r\n#L3#Inventory";
		chat += "\r\n#L4#Regular Attack Hunting";
		chat += "\r\n#L5#How to Pick Up Items";
		chat += "\r\n#L6#How to Equip Items";
		chat += "\r\n#L7#Skill Window";
		chat += "\r\n#L8#How to Use Quick Slots";
		chat += "\r\n#L9#How to Break Boxes";
		chat += "\r\n#L10#How to Sit in a Chair";
		chat += "\r\n#L11#World Map";
		chat += "\r\n#L12#Quest Notifications";
		chat += "\r\n#L13#Enhancing Stats";
		chat += "\r\n#L13#Who are the Cygnus Knights?";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection > 13) {
			cm.sendOk("The Black Mage is trying to revive and conquer our peaceful Maple World. As a response to this threat, Empress Cygnus has formed a knighthood, now known as Cygnus Knights. You can become a Knight when you reach Lv. 10.");
			cm.dispose();
			return;
			}
		if (selection != 0) {
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(selection));
			cm.dispose();
			return;
			}
			cm.sendNext("I serve under Shinsoo, the guardian of Empress Cygnus. My master, Shinsoo, has ordered me to guide everyone who comes to Maple World to join Cygnus Knights. I will be assisting and following you around until you become a Knight or reach Lv. 11. Please let me know if you have any questions.");
			break;
	case 2:
		cm.sendNextPrev("There is no need for you to check this info now. These are basics that you'll pick up as you play. You can always ask me questions that come up after you've reached Lv. 10, so just relax.");
		break;
	case 3:
		cm.dispose();
}
}