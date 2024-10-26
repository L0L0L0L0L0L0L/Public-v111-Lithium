/*
	名字:	寵物訓練師巴羅德
	地圖:	寵物公園
	描述:	100000202
*/

var close = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getPosition().y > - 1586) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You're too far from Trainer Frod. Get closer."));
			cm.dispose();
			return;
			}
		if (!cm.getPlayer().itemQuantity(4031035)) {
			cm.sendOk("My brother told me to take care of the pet obstacle course, but ... since I'm so far away from him, I can't help but wanting to goof around ...hehe, since I don't see him in sight, might as well just chill for a few minutes.");
			cm.dispose();
			return;
			}
			cm.sendNext("Eh, that's my brother's letter! Probably scolding me for thinking I'm not working and stuff...Eh? Ahhh...you followed my brother's advice and trained your pet and got up here, huh? Nice!! Since you worked hard to get here, I'll boost your intimacy level with your pet.");
			break;
	case 1:
		if (cm.getPlayer().getPet(0) != null) {
			cm.gainItem(4031035, -1);
			cm.gainClosenessAll(close[parseInt(Math.random() * close.length)]);
			cm.sendOk("What do you think? Don't you think you have gotten much closer with your pet? If you have time, train your pet again on this obstacle course...of course, with my brother's permission.");
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Hmmm ... did you really get here with your pet? These obstacles are for pets. What are you here for without it?? Get outta here!");
			break;
	case 2:
		cm.dispose();
}
}