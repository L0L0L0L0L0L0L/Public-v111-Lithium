/*
	Name: Leader Al
	Map: Victoria Harbor
	Description: 104000000
*/

function start() {
	cm.sendSimple("I can tell you some things about the Family system.\r\n#L0##bWhat is the Family system?#l\r\n#L1#What are the benefits of joining a Family?#l\r\n#L2#How to join the Family system?#l\r\n#L3#How to gain reputation?#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			cm.sendOk("The Family system allows players to register as a Leader & Followers, and it can continuously expand upward and downward. Isn't it like a multi-level marketing company, just like a #bbig family#k, right?");
			break;
		case 1:
			cm.sendOk("Joining a Family allows you to use the system's privileges. You can add the Family system shortcut to your hotkeys, and when you open it, you will see 11 privileges available. Of course, using them requires reputation points, and you can only use them once every #b24 hours#k.");
			break;
		case 2:
			cm.sendOk("Creating a Family doesn't require going to a specific location like creating a guild. Each player can register two followers. Simply right-click on a player and register them as a follower to join, but the registered player must be within #b1~20#k levels below you and must not already have a leader.");
			break;
		case 3:
			cm.sendOk("To gain reputation points, your followers must gain experience by defeating monsters or completing quests.");
	}
	cm.dispose();
}
