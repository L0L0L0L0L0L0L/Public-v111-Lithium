/*
	名字:	噗洛
	地圖:	前往維多利亞港
	描述:	200090070
*/

var map = [104000000, 100000000, 101000000, 102000000, 103000000, 120000000, 105000000];

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
		if (status < 3) {
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
		cm.sendSimple("The current is serene, which means we may arrive in Riena Strait and Lith Harbor in Victoria Island earlier than expected. Ah, that leaves me with nothing to do. Just so we can pass time quicker, would you like me to tell you about Victoria Island? \r\n#L0##bYes, please do.#l\r\n#L1#Nah, I'll pass...#l");
		break;
	case 1:
		if (selection == 1) {
			cm.sendNext("Alright, if you're not interested... Ahhh, I'm bored.");
			cm.dispose();
			return;
			}
			cm.sendNext("Oh, so check this out. Victoria Island is the biggest island in all of Maple World. It's not as big as the continent of Ossyria, but Victoria Island should really be referred to as a continent. When the Black Mage conquered Ossyria years and years ago, someone took charge of leading its people to Victoria Island.");
			break;
	case 2:
            		var text = "Afterwards, Victoria Island became the heart of Maple World. The monsters are comparatively weak and transportation is convenient with taxis in every town. Oh, should l also tell you about the towns in Victoria Island?#b";
		for (var i = 0; i < map.length; i++) {
		text += "\r\n#L" + i + "##m" + map[i] + "##l";
            		}
            		cm.sendSimple(text);
		break;
	default:
		if (status == 3 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);

}
}

function action0(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about Lith Harbor? It is a town located in southwest Victoria Island right by the coast, and Rien is a little west of Lith Harbor. It's relatively close, but only recently did the two towns began trading and such.");
		break;
	case 4:
		cm.sendNextPrev("Maple World has a top-of-the-line navigation system for their airships. There aren't too many harbors out there that actually have ships that float on water. In terms of transportation, Lith Harbor is quite a unique town, but the population is smaller than what you'd expect in such a famous town since there aren't that many regions you can visit via ship.");
		break;
	case 5:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 6:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about Henesys? It is a Bowman town located in south Victoria Island. The person in charge of protecting Henesys is named Athena Pierce, a fairy, and someone told me that she's been around since the very beginning of Victoria Island. She might be the one that got on the Ark that led to the island.");
		break;
	case 4:
		cm.sendNextPrev("I don't care what anyone else says, I believe Henesys is the center of Victoria Island. It's the place that's visited the most. The hunting grounds near Henesys remain a popular spot for low-leveled Maplers.");
		break;
	case 5:
		cm.sendNextPrev("Henesys is probably best known for Mushrooms. The entire area is infested with Mushroom monsters, although the residents aren't threatened by them since they've gotten so used to seeing those monsters around everywhere. l heard there are even houses that resemble Mushrooms. I hear some people in Henesys also devote most of their time studying Mushroom monsters.");
		break;
	case 6:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 7:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about Ellinia? It is a Magician town located in east Victoria Island. The town is basically just a forest with tall trees. I hear all the buildings and houses are all connected to the trees. That's probably why the town is so long and jumbled.");
		break;
	case 4:
		cm.sendNextPrev("Ellinia is full of fairies with transparent wings because the Magician in charge of protecting Ellinia, known as Grendel the Really Old, has put in a lot of effort to establish friendly relations between humans and fairies. Even with all that, I doubt anyone really befriends those snobby fairies.");
		break;
	case 5:
		cm.sendNextPrev("The giant tree in Ellinia is considered a dungeon. Fortunately, you won't find any powerful monsters there, so it might be a great hunting ground for you.");
		break;
	case 6:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 7:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about Perion? It is a Warrior town located in north Victoria Island. The town is located way up high in the mountains without sufficient moisture. Its atmosphere seems rather primitive, but you may be able to find a whole gamut of Warrior weapons, so try visting at least once.");
		break;
	case 4:
		cm.sendNextPrev("You'll find Stump monsters all over Perion. Have you seen them before? They are single-eyed tree stumps that look a little creepy. They may be powerful, but hunting them won't be too challenging since they move extremely slowly.");
		break;
	case 5:
		cm.sendNextPrev("Head east of Perion, and you'll see a place where the relics are being excavated. I hear people are having a tough time excavating because the area is infested with monsters.");
		break;
	case 6:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 7:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about Kerning City? It is a Thief town located in northwest Victoria Island. The sunset is absolutely gorgeous here, but the town is pretty much designed for Thieves.");
		break;
	case 4:
		cm.sendNextPrev("Kerning City, which has buildings with hidden portals, is much more complex in design than the other towns. I hear there is something called a subway line that doesn't work, but l can't figure out what kind purpose such transportation would serve.");
		break;
	case 5:
		cm.sendNextPrev("According to the rumors, the sewage pipes in Kerning City can lead you to a swamp area. I don't know whether it's true, but if it is, it can conveniently lead you to Sleepywood.");
		break;
	case 6:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 7:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Would you like to learn more about The Nautilus? It is a submarine for Pirates located in southeast Victoria Island. This whale-shaped submarine is led by a beautiful captain, Kyrin.");
		break;
	case 4:
		cm.sendNextPrev("The Nautilus is moored to prevent the Black Mage from acting up. With all these people concerned about the Black Mage, perhaps he'll really appear in the near future...?");
		break;
	case 5:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 6:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendNext("Do you want to hear about Sleepywood? Sleepywood is a large forest located in the center of Victoria Island beyond the Six Path Crossway.");
		break;
	case 4:
		cm.sendNextPrev("Ascetic practitioners formed a small town in front and are training there.");
		break;
	case 5:
		cm.sendNextPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 6:
		cm.sendNextPrev("Inside the swamp, and underground, is the long Drake Cave... Terrifying monsters not seen anywhere appear there. Of course, the most threatening of all would be Balrog.");
		break;
	case 7:
		cm.sendPrev("Many have left to defeat the Balrog. Few have returned...");
		break;
	case 8:
		cm.dispose();
}
}