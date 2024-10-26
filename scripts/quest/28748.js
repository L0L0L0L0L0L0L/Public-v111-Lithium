/*
	名字:	破壞
	地圖:	新叶城
	描述:	600000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("We cannot let those aliens take our precious ore! We need to, I don't know, sabotage them? That sounds right, doesn't it! Go sabotage the heck out of them!");
		break;
	case 1:
		qm.sendNextPrev("Alright, a good sabotage job needs a good sabotage plan! I've got four really great sabo-ideas.");
		break;
	case 2:
		qm.sendNextPrev("Your first sabo-mission is in Jungle Valley. They've got Gunpowder Mounds meant for blasting. Light one of those up. While you're at it, I think you could take out one of those Galacto-Drills. They look really flimsy. Heck, I bet they'd blow up if you chucked some rocks into those holes they're digging!");
		break;
	case 3:
		qm.sendNextPrev("Oh, I just thought of another thing that'll really cheese 'em off! Go steal some of their samples and mess up their computers! If I were an alien, I'd put that stuff right near the entrance to my intergalactic mining base. Let's just hope those aliens use the same operating system as us...");
		break;
	case 4:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28748)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28748)), true);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNext("How are the sabo-missions going? Are you sabotaging up a storm?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28767)).getStatus() < 1 || qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28760)).getStatus() < 1 || qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28758)).getStatus() < 1 || qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28757)).getStatus() < 1) {
			qm.sendNext("You haven't sabotaged enough! There's still so much to do! \r\n\r\nCorrupt Their Computer: #b(#u28767#)#k \r\nTamper with the Samples: #b(#u28760#)#k \r\nThrow Rocks at the Drill: #b(#u28758#)#k \r\nLight the Gunpowder Mound: #b(#u28757#)#k");
			qm.dispose();
			return;
			}
			qm.sendNextPrev("I knew you'd mess up their operations!");
			break;
	case 2:
		qm.sendNextPrevS("The aliens are holding a bunch of people hostage! I'm not sure why yet, but I have a very strong theory that people-eating is involved! They must be interstellar space chefs!", 3);
		break;
	case 3:
		qm.sendNextPrev("Hmm, your theory is both ludicrous and implausible, but it's the best we've got! At least we know the people are still alive.");
		break;
	case 4:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28748)).setStatus(2);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28748)), true);
		qm.gainExp(70000);
		qm.dispose();
}
}