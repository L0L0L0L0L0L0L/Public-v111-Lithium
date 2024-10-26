/*
    Name:    Bat Man
    Map:     New Leaf City - City Center
    Description:    600000000
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
			if (status < 8) {
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
			cm.sendSimple("Who knows how long evil monsters have been around? Mosquito Bat knows! \r\n#L0##bWell, you look like... a superhero?#l");
			break;
		case 1:
			cm.sendNext("That's right! I am Mosquito Bat, <puts on cape covering half of the face>, the city's number one crime fighter!");
			break;
		case 2:
			cm.sendSimple("I came to New Leaf City to fight crime, monsters, and all the good or evil forces... I guess you want to join our hero association, the Mosquito Alliance! While I am flattered, Mosquito Bat operates solo! \r\n#L0##bI'm curious why you're not wearing pants.\r\n#L1#Join you? I think you should put on some pants before fighting crime.#l");
			break;
		case 3:
			if (selection < 1) {
				cm.sendSimple("Oh, that... haha <blushes>, my pants got burned during a fight with a Fire Fang Beast in the Secret Treasure Gear. I wanted to help that person called #b#p9201051##k; he seems to be researching New Leaf City and looks important. A true hero never refuses to help others! \r\n#L0##bWhy don't you wear other pants? Don’t you have a spare pair?\r\n#L1#So what are you going to do? You can't run around with your pants off.#l");
			}
			if (selection > 0) {
				cm.sendOk("Don't get me wrong! Whether or not you're wearing pants has nothing to do with being a superhero. As long as you have the courage to fight evil and help people, you can be a superhero. If you don't think so, then goodbye.");
				cm.dispose();
			}
			break;
		case 4:
			if (selection < 1) {
				cm.sendNext("This, I made a little mistake while moving to New Leaf City. I forgot to close the trunk when packing my supplies into the Mosquito Bat vehicle. When I arrived in New Leaf City and checked the trunk, I found out that all my supplies were lost! I did go to see the armor merchant Dailfi, but it seems I gained a few pounds after arriving in New Leaf City.");
			}
			if (selection > 0) {
				status = 6;
				cm.sendSimple("So, I’m in a dilemma: while I need to find my pants, the criminals won’t take a break just because I’m looking for them. This area is full of evil forces, and I don’t have time to explore... Unless. How about a trade? \r\n#L0##bWhat kind of trade?#l");
			}
			break;
		case 5:
			cm.sendPrev("Mitch’s grilled cheese and supreme pizza are so—mosquitoed! They made me wear tight pants!");
			cm.dispose();
			break;
		case 7:
			cm.sendSimple("Since I can't leave my post, can you help me find my supplies while you're out adventuring? If you help me find them, I'll make you an honorary member of our hero association, the Mosquito Alliance! How about it? \r\n#L0##bCount on me, Mosquito Bat! I’ll report back as soon as I find something!#l");
			break;
		case 8:
			cm.sendPrev("That's the spirit! Keep it up, and one day you too can become a hero!");
			break;
		case 9:
			cm.dispose();
	}
}
