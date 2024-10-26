/*
	名字:	小精靈
	地圖:	愛奧斯塔入口
	描述:	220000400
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
		if (status < 1 || type == 2) {
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
		cm.sendSimple("What do you want to know? \r\n#L0##bHow do you revive pets?#l\r\n#L1#How do you raise pets?#l\r\n#L2#Can pets die?#l\r\n#L3#Tell me about Action Pets.#l\r\n#L4#How do I change pet stats?#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("I'm #p2040030#, and I research many types magic here in place of my master, #p1032102#. It seems there are a lot of pets in Ludibrium, as well. I'll excuse myself now, as I have plenty of pending tasks to attend to.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Depending on the command you give, pets can love it, hate, and display other kinds of reactions to it. If you give the pet a command and it follows you well, your intimacy goes up. Double click on the pet and you can check the intimacy, level, fullness and etc...");
		break;
	case 2:
		cm.sendNextPrev("Talk to the pet, pay attention to it and its intimacy level will go up and eventually his overall level will go up too. As the intimacy level rises, the pet's overall level will rise soon after. As the overall level rises, one day the pet may even talk like a person a little bit, so try hard raising it. Of course it won't be easy doing so...");
		break;
	case 3:
		cm.sendNextPrev("It may be a live doll but they also have life so they can feel the hunger too. #bFullness#k shows the level of hunger the pet's in. 100 is the max, and the lower it gets, it means that the pet is getting hungrier. After a while, it won't even follow your command and be on the offensive, so watch out over that.");
		break;
	case 4:
		cm.sendNextPrev("That's right! Pets can't eat the normal human food. Instead a teddy bear in Ludibrium called #b#p2041014##k sells #bPet Food#k so if you need food for your pet, find #b#p2041014##k It'll be a good idea to buy the food in advance and feed the pet before it gets really hungry.");
		break;
	case 5:
		cm.sendNextPrev("Oh, and if you don't feed the pet for a long period of time, it goes back home by itself. You can take it out of its home and feed it but it's not really good for the pet's health, so try feeding him on a regular basis so it doesn't go down to that level, alright? I think this will do.");
		break;
	case 6:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Dying... well, they aren't technically ALIVE per se, so I don't know if dying is the right term to use. They are dolls imbued with #p1012005#'s magical power and the Water of Life. Of course while they're animated, they act just like a living animal...");
		break;
	case 2:
		cm.sendNextPrev("After enough time has passes, the Water of Life bringing your pets to life will run out and they'll go back to being dolls. But they won't stay like that forever! Just use some Premium Water of Life to revive them!");
		break;
	case 3:
		cm.sendNextPrev("Even if it someday moves again, it's sad to see them stop altogether. Please be nice to them while they are alive and moving. Feed them well, too. Isn't it nice to know that there's something alive that follows and listens to only you?");
		break;
	case 4:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("An #baction pet#k is a pet that can transform and evolve. If you use the #r'transform'#k command or #rdefeat Monsters Near Your Level#k, it will take on a new form. The transformed action pet will return to its original form if you enter the #r'return'#k command or wait for it to change back on its own. \r\nAlso, action pets that reach Level 30 can be evolved using the #bAccelerator#k item.");
		break;
	case 2:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("In order to transfer the pet ability points, closeness and level, Pet AP Reset Scroll is required. If you take this scroll to Mar the Fairy in Ellinia, she will transfer the level and closeness of the pet to another one. I am especially giving it to you because I can feel your heart for your pet. However, I can't give this out for free. I can give you this book for 250,000 mesos. Oh, I almost forgot! Even if you have this book, it is no use if you do not have a new pet to tranfer the Ability points.");
		break;
	case 2:
		cm.sendYesNo("250,000 mesos will be deducted. Do you really want to buy?");
		break;
	case 3:
		if (cm.getPlayer().getMeso() < 250000 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check if your inventory has empty slot or you don't have enough meso.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-250000);
			cm.gainItem(4160011, 1);
			cm.dispose();
}
}