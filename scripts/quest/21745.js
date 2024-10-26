/*
	名字:	要想見武公
	地圖:	武陵道場入口
	描述:	925020001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendOk("Do you really think that a trainee of this sacred place would fall for a bribe like that?");
		qm.dispose();
		return;
		}
		if (status == 7) {
		qm.sendNext("Otherwise, you won't find any Bellflowers...");
		qm.dispose();
		return;
		}
		if (status != 6) {
		qm.dispose();
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
		qm.sendSimple("What's going on here? This is a sacred place! No private conversations allowed! \r\n#L0##bI want to meet Mu Gong. I have important business to discuss.#l");
		break;
	case 1:
		qm.sendSimple("Then, challenge yourself at the Mu Lung Dojo! Mu Gong is on the very top floor, waiting for challengers! \r\n#L0##bl wonder if there's a back way I can go to meet Mu Gong...#l");
		break;
	case 2:
		qm.sendSimple("What are you talking about? Nonsense! How dare you think such sneaky thoughts in this sacred place! \r\n#L0##bl can get you some #t4000293#s...they're really good for your heath.#l");
		break;
	case 3:
		qm.sendSimple("No. I can't. No way. \r\n#L0##bHow about 100 #t4000293#s? They're really, really good for your health!#l");
		break;
	case 4:
		qm.sendYesNo("Hmm... Um... Well... Come here for a moment...");
		break;
	case 5:
		qm.sendNext("(Whispers) You say they're really good for my health, yes? I've always wanted some, but I can never find the time, because I'm so busy. The master is always busy training, as well.");
		break;
	case 6:
		qm.sendNextPrev("(Whispers) You said exactly 100, right? Okay. Be warned, I won't move an inch if you're short even one #t4000293#!");
		break;
	case 7:
		qm.sendYesNo("By the way... I know a place where you can easily get #t4000293#s. Would you like to go there?");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(21745).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(925041001), qm.getMap(925041001).getPortal(1));
		qm.dispose();
}
}