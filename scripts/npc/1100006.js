/*
	名字:	奇盧
	地圖:	前往天空之城
	描述:	200090021
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 200090020 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Ah, this wind is nice, isn't it? This voyage'll be perfect as long as some stupid passenger doesn't use a weird skill and falls off... No, I'm not talking about you. Just remember, being bored is not a good enough reason to practice your skills while you're up in the air. Since we've got some time, you want to know about Ereve? \r\n#L0##bYes, tell me.#l\r\n#L1#No, I'm fine.#l");
		break;
	case 1:
		if (selection == 1) {
			cm.dispose();
			return;
			}
			cm.sendNext("Ereve is a floating island under the protection of Shinsoo. It's hovering in place for now, but it used to travel all over the world. The Empress would use it to watch over her subjects.");
			break;
	case 2:
		cm.sendNextPrev("But when the Black Mage revivalists started picking up steam, the Empress cut her touring short and starting training the Knights instead. That's how the Cygnus Knights were founded.");
		break;
	case 3:
		cm.sendNextPrev("That may be, but the knights of Cygnus don't remain on the island that long. They train on the island at low levels, and then, when their levels increase, they go out to track the Black Mage's movement.");
		break;
	case 4:
		cm.sendNextPrev("Two species live on this island: low-level knights, and us. Have you seen us before? We're called Piyos, and we're like a distant cousin to Shinsoo. That's why we help around here on the island.");
		break;
	case 5:
		cm.sendNextPrev("In other words, we are not subordinates of the Empress. We are subordinates of Shinsoo. Since Shinsoo is protecting the Empress, we are helping her. But we don't follow her commands directly.");
		break;
	case 6:
		cm.sendPrev("#b(Kiru went on talking for a long time...)");
		break;
	case 7:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Ah, the wind is nice. At this rate, it should be smooth sailing to Orbis. Wait, you over there. Don't go running around, jumping all over the place, while we're flying. No skills, either. It's dangerous. Got it? *ahem* Do you have any questions about Orbis?\r\n#L0##bYes, I do.#l\r\n#L1#No, I'm fine...#l");
		break;
	case 1:
		if (selection == 1) {
			cm.sendNext("Well, fine. Don't do anything strange just because you're bored.");
			cm.dispose();
			return;
			}
			cm.sendNext("Orbis is a town built on a tall tower in the northernmost part of Ossyria. In other words, it's a town in the sky. It's similar to Ereve, in a way. Well, I guess it's different in that Ereve is its own hovering landmass, but...");
			break;
	case 2:
		cm.sendNextPrev("Orbis is the hub of continental travel. Orbis Station is lined with airships heading to each region. There's that one that doesn't look like an airship, but... anyway, wherever you're going, you pretty much always have to pass through Orbis first.");
		break;
	case 3:
		cm.sendNextPrev("Many fairies live in Orbis, but unlike the Ellinia fairies, their wings have feathered. They're more gentle and get along with humans better. Well, most of them, not all...");
		break;
	case 4:
		cm.sendPrev("#b(Kiru went on talking for a long time...)");
		break;
	case 5:
		cm.dispose();
}
}