/*
	名字:	奇裡盧
	地圖:	前往耶雷弗
	描述:	200090030
*/

var map = [101000000, 100000000, 102000000, 103000000, 104000000, 120000000, 105000000];

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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 200090031 ? 8 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("The weather is nice. At this rate, we'll make Victoria Island in no time... Is this your first time going to Victoria Island? Should I give you a brief introduction, then?\r\n#L0##bYes, please do.#l\r\n#L1#No, I'm fine.#l");
		break;
	case 1:
		if (selection == 1) {
			cm.sendNext("It seems you're familiar with Victoria Island. Hope you enjoy the voyage...");
			cm.dispose();
			return;
			}
            			var text = "Victoria Island is the largest island in Maple World. Technically, it's big enough to be a continent. Travel's convenient, since each town has a #btaxi service#k. And each town on the island has its own character, so it's worth seeing them all. Anyplace in particular you'd like to know about?#b";
			for (var i = 0; i < map.length; i++) {
			text += "\r\n#L" + i + "##m" + map[i] + "##l";
            			}
            			cm.sendSimple(text);
			break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + (select + 1);
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Ellinia is a town of Magicians on the west side of Victoria Island. Maple World took its earliest forays into magic there. That's why their weapon shop is full of Magician equipment.");
		break;
	case 3:
		cm.sendNextPrev("Ellinia is a town of fairies. You can meet Wing the temperamental fairy, Arwen the prim fairy, and Rowen the gentle and modest fairy. Come to think of it, Grendel the Really Old, in Ellinia's Magic Library, was raised by fairies too...");
		break;
	case 4:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 5:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about Henesys? It's the town of Bowmen, in the south of Victoria Island. Athena Pierce is their protector. If you want to purchase Bowman equipment, you should take a look around Henesys Market.");
		break;
	case 3:
		cm.sendNextPrev("Henesys is the center of Victoria Island. It's always boisterous since so many people come and go. Low-level people, mainly, since there's a hunting zone for Beginners nearby.");
		break;
	case 4:
		cm.sendNextPrev("The chief of Henesys is a man named Stan. He's having a hard time right now, because his wife is always pushing him to throw festivals, and -- more importantly, I suppose -- his son ran away from home. He looks grouchy, but I've been told he's actually nice.");
		break;
	case 5:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 6:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about Perion? It's a highlands town in the north of Victoria Island. It's also the town of Warriors. If you're looking for Warrior equipment, you should visit the weapon shop there.");
		break;
	case 3:
		cm.sendNextPrev("Perion is very dry, and there are many Stump-type monsters. Have you seen a Stump before? It's in the shape of a tree trunk, but with one big eye. They're tough, too. Very resilient. People have a hard time dealing with them.");
		break;
	case 4:
		cm.sendNextPrev("The warriors of Perion give special names to show their courage. That is why there are people with strange names such as 'Blackbull' and 'Dances with Balrog'. It might seem odd to us, but to them, it's the mark of a strong warrior.");
		break;
	case 5:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 6:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about Kerning City? It's a town on the west side of Victoria Island. Since it's a town of Thieves, their weapon shop has plenty of Thief equipment. But...");
		break;
	case 3:
		cm.sendNextPrev("There's a secret side to Kerning City: it's a town of Thieves. A lot of its buildings don't advertise their entrances with portals. But you can still get in, if you know where to look...");
		break;
	case 4:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 5:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about Lith Harbor? It's a town in the southwest of Victoria Island, a sea harbor. Sea, not airships, so you can't actually go very far from there.");
		break;
	case 3:
		cm.sendNextPrev("You can go to Florina Beach, Maple World's famous vacation spot, from Lith Harbor. I say 'vacation spot,' but it's occupied by the very dangerous Lorangs and Clangs. Don't plan to get a lot of rest there.");
		break;
	case 4:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 5:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about the Nautilus? It's a submarine that anchored recently in the southeast of Victoria Island. Captain Kyrin commands the pirates. If you need Pirate equipment, you can buy it at the weapon shop there.");
		break;
	case 3:
		cm.sendNextPrev("Nautilus looks like a huge whale. In fact, it's actually been mistaken for a whale under the sea. They say it's proof of the Omega Sector's latest technology, but why's it have to look like that?");
		break;
	case 4:
		cm.sendNextPrev("I heard Kyrin, the captain of Nautilus, is this gorgeous lady with fiery hair. I wonder if that's true? A pirate captain would have to be tough, right? Well, even if she is a beauty, she can't compare to Shinsoo. That beak, those feathers...");
		break;
	case 5:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 6:
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you talking about Sleepy Dungeon? There's a large forest in the center of Victoria Island called Sleepywood, and in the middle of that place is an entrance to Sleepy Dungeon. Around the entrance, you might find aescetic practitioners training.");
		break;
	case 3:
		cm.sendNextPrev("I hear there are all sorts of scary monsters in the underground dungeon. And at the heart of it all, there's a Balrog! Terrifying, right?");
		break;
	case 4:
		cm.sendNextPrev("Do you think that Balrog is the be-all and end-all? Or do you think they call it 'Sleepy Dungeon' because something else is sleeping there? I think maybe there's something deep down that hasn't woken up yet... Or maybe I'm just worrying for no reason.");
		break;
	case 5:
		cm.sendNextPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 6:
		cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("The weather is nice. At this rate, we should reach Ereve in no time... Do you know about Ereve? It's a beautiful floating island under the protection of Shinsoo. Shall I tell you about it?\r\n#L0##bYes, please.#l\r\n#L1#No, thanks.#l");
		break;
	case 1:
		if (selection == 1) {
			cm.dispose();
			return;
			}
			cm.sendNext("Ereve is the base of the Cygnus Knights. Empress Cygnus trains them herself. She's a lovely lady, but she has a weak constitution. Luckily, she has Shinsoo protecting her.");
			break;
	case 2:
		cm.sendNextPrev("Besides Shinsoo, Cygnus always has the tactician Neinheart helping her out. His smile's so sharp, it can cut you. Even the Chief Knights know not to cross him, since he's in charge of their budget.");
		break;
	case 3:
		cm.sendNextPrev("The Chief Knights protect Cygnus from right alongside her. Mihile, the curt one, and Eckhart, the cold one, aren't on very good terms, but Irena the Righteous and Oz the Dense -- that's not his real name -- are surprisingly close. Oh, and Hawkeye is an exception. He can get close to anyone, even Horntail.");
		break;
	case 4:
		cm.sendNextPrev("We, the blue-feathered Piyo Tribe, like humans. We rarely meet them, since we have to live in the heights, but we do make friends with them here in Ereve.");
		break;
	case 5:
		cm.sendPrev("#b(Kiriru continued talking for a long time...)");
		break;
	case 6:
		cm.dispose();
}
}