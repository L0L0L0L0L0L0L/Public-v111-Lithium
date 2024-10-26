/*
	名字:	艾雷諾爾
	地圖:	寧靜的耶雷弗
	描述:	913030000
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
		if (status > 4) {
		cm.sendNext("Hmph, there you go. Just go on with your life, okay kid?");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20407)).getStatus() != 1) {
			cm.sendOk("... Knight, you still #bseem unsure to face this fight#k, don't you? There's no grace in challenging someone when they are still not mentally ready for the battle. Talk your peace to that big clumsy bird of yours, maybe it'll put some guts on you.");
			cm.dispose();
			return;
			}
			cm.sendNext("Ahahahaha! l thought Cygnus Knights were a group of impressive individuals, but this is way too easy. It doesn't matter how powerful the power of Shinsoo is. Even the sturdiest dam cracks and gets demolished because of a small hole. if you use your head, it's that much easier to throw them off guard.");
			break;
	case 1:
		cm.sendNextPrev("So what exactly did l do? Simple. l just gave this smart, yet pompous knight false information. l just told him the Black Witch is placing a curse on the Empress in the Dragon Forest. Well, it wasn't a total lie, since the curse did take place...");
		break;
	case 2:
		cm.sendNextPrev("The curse only gets activated when the carrier of the curse enters Ereve, as in when Dunamis completed his investigation and brought the curse into the island.");
		break;
	case 3:
		cm.sendNextPrev("We all knew that no matter how powerful the curse, it would bounce right out of Ereve... So why bother putting all the effort into penetrating the invisible barrier, when someone can actually bring that curse into Ereve. Hahahaha!");
		break;
	case 4:
		cm.sendNextPrev("Cygnus Knights is really a group of inexperienced knights serving a 10 year old girl. They are no match for the Black Wings. since we have served the Black Mage for hundreds of years.");
		break;
	case 5:
		qm.sendAcceptDecline("It's time for you to step back as well. I don't feel like exerting too much energy into this.");
		break;
	case 6:
		cm.sendNext("Ha, are you telling me you're going to fight me yourself? Not even a Chief Knight, but a regular knight like you? who do you think you are? I am the great Eleanor of the Black Wings!");
		break;
	case 7:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new java.awt.Point(-430, 88));
		cm.dispose();
}
}