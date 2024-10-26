/*
	名字:	秘密團體的第二個任務
	地圖:	黑色影子
	描述:	黑色影子
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendOk("That's too bad... The organization would be much better off if we had more people like you. Can you please think about it again? For the sake of Maple World?");
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
		qm.sendNext("Hello there, Evan. Oh, I didn't mean to startle you. Don't worry. I'm not some weirdo. I belong to the secret organization that you just joined.");
		break;
	case 1:
		qm.sendNextPrevS("#bYou're #p1063018#'s master, then?", 2);
		break;
	case 2:
		qm.sendNextPrev("Oh, you must be talking about Francis. No, no, I'm not his master, but I am senior to him, yes. I assigned a mission to you a while back in #m200000000#.");
		break;
	case 3:
		qm.sendNextPrevS("#bThe mission that behind the #p2012034#?", 2);
		break;
	case 4:
		qm.sendNextPrev("Yes. It was I who left the piece of paper with the mission behind the #p2012034#. Thanks to you, I was able to make great use of the Growth Accelerant. It was very helpful.");
		break;
	case 5:
		qm.sendNextPrevS("#bHahaha. I'm happy to be a contributing member of the organization.", 2);
		break;
	case 6:
		qm.sendYesNo("Your contributions have made you quite the talk of the organization. I feel I can entrust you with another mission. Will you accept it?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(22575).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("This task will be more difficult than anything you've done before. You must rescue #bDecaying Zombie Molar#k after eliminating #rToothless Coolie Zombies#k in Forest of the Dead. You can enter the Forest of the Dead through the #rrightmost door, open on the very bottom floor of Chief's Residence.");
		break;
	case 8:
		qm.sendPrev("Collect #b150 #t4000593#s#k, then pass those to #b#p2022003##k in the basement of the #m211000001# in #m211000000#. #p2022003# will give you the promised item. I will get in touch with you again then.");
		break;
	case 9:
		qm.dispose();
}
}