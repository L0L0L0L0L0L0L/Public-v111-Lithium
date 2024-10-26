/*
	名字:	瑪哈的請求
	地圖:	燃燒的神木村3
	描述:	272000300
*/

var status = -1;

function start(mode, type, selection) {
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
		var reactor = 'action' + (qm.getPlayer().getJob() < 2000 ? 1 : qm.getPlayer().getJob() < 2200 ? 2 : qm.getPlayer().getJob() < 2300 ? 3 : qm.getPlayer().getJob() < 2400 ? 4 : 1);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
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
		qm.sendNext("I'm not sure it'll work, but I think if we seal Aran up in the frozen ice of Rien Island, we can slow down the curse.");
		break;
	case 1:
		qm.sendNextPrev("I'm just too weak to be of any use. If only master hadn't kept fighting for so long...I had to use up all of my strength just to save this moron's hide!");
		break;
	case 2:
		qm.sendNextPrev("The monsters nearby probably have chunks of my polearm body. I was really breaking up at the end there. EIiminate the monsters and collect #b50 #t4033080##k. That should be enough for me to toughen up and drag the master back to Rien Island.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(31171).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("I'm not sure it'll work, but I think if we seal Aran up in the frozen ice of Rien Island, we can slow down the curse.");
		break;
	case 1:
		qm.sendNextPrev("I'm way too weak to do it myself, though. Master kept fighting and fighting until the idiot just passed out. Now I'm all out of juice!");
		break;
	case 2:
		qm.sendNextPrevS("I'm not the one you should be talking to. Maybe Aran would know what you're talking about, but I doubt it...", 2);
		break;
	case 3:
		qm.sendNextPrev("That's enough talk. Just take out some monsters around here and collect #b50 #t4033080##k. If you really want to help, you'll get a move on.");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(31171).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("I'm not sure it'll work, but I think if we seal Aran up in the frozen ice of Rien Island, we can slow down the curse.");
		break;
	case 1:
		qm.sendNextPrev("I'm just too weak to be of any use. If only master hadn't kept fighting for so long...I had to use up all of my strength just to save this moron's hide!");
		break;
	case 2:
		qm.sendNextPrevS("Is there anything I can do to help you recover your strength?", 2);
		break;
	case 3:
		qm.sendNextPrev("I knew you two were good eggs, just like Freud and #p2144006#. Go and collect #b50 #t4033080##k. That should be enough for me to toughen up and drag the master back to Rien Island.");
		break;
	case 4:
		qm.sendNextPrevS("Where can I find #t4033080#?", 2);
		break;
	case 5:
		qm.sendNextPrev("The nearby monsters might have them. #t4033080# was scattered when I was raining terror all over them; Go quick!");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31171).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("I'm not sure it'll work, but I think if we seal Aran up in the frozen ice of Rien Island, we can slow down the curse.");
		break;
	case 1:
		qm.sendNextPrev("I'm just too weak to be of any use. If only master hadn't kept fighting for so long...I had to use up all of my strength just to save this moron's hide!");
		break;
	case 2:
		qm.sendNextPrevS("Everybody who knows you knows how much you love Aran.", 2);
		break;
	case 3:
		qm.sendNextPrev("Shh! I can't have my reputation getting ruined! Eliminate nearby monsters until you've got #b50 #t4033080##k. That should be enough for me to get this lunkhead to safety. If you were my master, we'd never have gotten into this mess.");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(31171).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		var reactor = 'action' + (qm.getPlayer().getJob() < 2000 ? 5 : qm.getPlayer().getJob() < 2200 ? 6 : qm.getPlayer().getJob() < 2300 ? 7 : qm.getPlayer().getJob() < 2400 ? 8 : 5);
		eval(reactor)(mode, type, selection);
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNextS("Did you get the #t4033080#?", 1);
		break;
	case 1:
		qm.sendNextPrevS("Here you go. Is that enough?", 2);
		break;
	case 2:
		qm.sendNextPrevS("Yeah! This oughtta get me back in shape!", 1);
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31171)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31171).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Polearm has been restored and Maha's power flows again!"));
			qm.showNpcSpecialEffect(2144005, "recovery"); // 特效
			qm.removeAll(4033080);
			qm.gainExp(301891);
			}
			qm.sendNextPrevS("I'm not fully recovered yet, but I'm feeling a lot stronger. I'm going to take my master to Rien Island for now. I was hoping to see #p2144006# one more time, but I'll have to settle with sending my greetings along with you.", 1);
			break;
	case 4:
		qm.sendNextPrevS("Who is #p2144006#?", 3);
		break;
	case 5:
		qm.sendNextPrevS("He's the King of Onyx Dragons. He should be behind that portal to the right. Don't worry about his size, he's a real softy. Tell him I said hello, okay? We've got to go!", 1);
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31183).forceStart(qm.getPlayer(), qm.getNpc(), 1); //隱藏NPC效果
		qm.sendNextPrev("Don't forgot to say hello to #p2144006#!");
		break;
	case 7:
		qm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNextS("Did you get the #t4033080#?", 1);
		break;
	case 1:
		qm.sendNextPrevS("Here you go. Is that enough?", 2);
		break;
	case 2:
		qm.sendNextPrevS("Yeah! This oughtta get me back in shape!", 1);
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31171)).getStatus() < 2) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Polearm has been restored and Maha's power flows again!"));
			qm.showNpcSpecialEffect(2144005, "recovery"); // 特效
			qm.removeAll(4033080);
			}
			qm.sendNextPrevS("I'm not 100%, but you really helped me out. I guess my master can be pretty useful once in a while.", 1);
			break;
	case 4:
		qm.sendNextPrevS("Hey! Do I have to remind you who the boss is around here?", 3);
		break;
	case 5:
		qm.sendNextPrevS("Don't get all grumpy with me, buddy. You're just not seeing things from every angle. Now let's get back to our mission and get over to Rien Island. Make sure to take my regards to #p2144006#. I'm really hoping we can meet up again under better circumstances.", 1);
		break;
	case 6:
		qm.sendNextPrevS("(What was a brief moment in time for me must have been several centuries to you. I am truly sorry, #p2144005#. If only I had been stronger...)", 3);
		break;
	case 7:
		if (qm.getPlayer().getSkillLevel(20000194) < 1) {
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000194), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You learned the Regained Memory skill."));
			}
			qm.sendNextPrevS("Make sure to check out the Beginner's Skill tab under your skill window. It's a little gift from me, but it was precious to my master. Do you remember?", 1);
			break;
	case 8:
		qm.sendPrevS("Thank you, #p2144005#. We will meet again one day.", 3);
		break;
	case 9:
		Packages.server.quest.MapleQuest.getInstance(31171).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(31183).forceStart(qm.getPlayer(), qm.getNpc(), 1); //隱藏NPC效果
		qm.gainItem(3010215, 1);
		qm.gainExp(301891);
		qm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNextS("Did you get the #t4033080#?", 1);
		break;
	case 1:
		qm.sendNextPrevS("Here you go. Is that enough?", 2);
		break;
	case 2:
		qm.sendNextPrevS("Yeah! This oughtta get me back in shape!", 1);
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31171)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31171).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Polearm has been restored and Maha's power flows again!"));
			qm.showNpcSpecialEffect(2144005, "recovery"); // 特效
			qm.removeAll(4033080);
			qm.gainExp(301891);
			}
			qm.sendNextPrevS("I'm not fully recovered yet, but I'm feeling a lot stronger. I'm going to take my master to Rien Island for now. I was hoping to see #p2144006# one more time, but I'll have to settle with sending my greetings along with you.", 1);
			break;
	case 4:
		qm.sendNextPrevS("Where is #p2144006#?", 3);
		break;
	case 5:
		qm.sendNextPrevS("You'll probably run into him if you go through the portal to the right. The young Onyx Dragon should know #p2144006# fairly well.", 1);
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31183).forceStart(qm.getPlayer(), qm.getNpc(), 1); //隱藏NPC效果
		qm.sendNextPrev("Don't forgot to say hello to #p2144006#!");
		break;
	case 7:
		qm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNextS("Did you get the #t4033080#?", 1);
		break;
	case 1:
		qm.sendNextPrevS("Here you go. Is that enough?", 2);
		break;
	case 2:
		qm.sendNextPrevS("Yeah! This oughtta get me back in shape!", 1);
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31171)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31171).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Polearm has been restored and Maha's power flows again!"));
			qm.showNpcSpecialEffect(2144005, "recovery"); // 特效
			qm.removeAll(4033080);
			qm.gainExp(301891);
			}
			qm.sendNextPrevS("I'm not fully recovered yet, but I'm feeling a lot stronger. I'm going to take my master to Rien Island for now. I was hoping to see #p2144006# one more time, but I'll have to settle with sending my greetings along with you. Mercedes.", 1);
			break;
	case 4:
		qm.sendNextPrevS("Is #p2144006# with Freud?", 3);
		break;
	case 5:
		qm.sendNextPrev("Take that portal to the right. They'll be excited to see you back in action. I've got to get master out of here for now, but we'll meet again!");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31183).forceStart(qm.getPlayer(), qm.getNpc(), 1); //隱藏NPC效果
		qm.sendNextPrev("Don't forgot to say hello to #p2144006#!");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31171).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}