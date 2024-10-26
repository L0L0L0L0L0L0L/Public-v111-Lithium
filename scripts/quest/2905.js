/*
	名字:	照顧乳牛
	地圖:	餐廳
	描述:	120000103
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("Fine, be that way. It won't be my fault when you get trampled in a Baby Cow stampede.");
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
		qm.sendNext("Hey, if you ain't too busy, mind giving me a hand? I was so busy cooking, I forgot to feed the cows. The PIRATE cows, that is.");
		break;
	case 1:
		qm.sendAcceptDecline("The Baby Cows get hungry real fast, too. If I don't get some food in their bellies soon, they'll probably stampede.\r\nSo, what're you waiting for? Get feeding!");
		break;
	case 2:
		qm.sendNext("All right, the ranch is just this way. All you need to do is collect Hay by hitting Haystacks with a #rRegular Attack#k and bring the Hay to the cows. You can handle this, right?");
		break;
	case 3:
		qm.sendNextPrev("While you're at it, get #ba cup of Milk from the Mama Cow#k #rafter you feed the Baby Cows#k. Do a good job, and Ma will be happy to give you some milk.");
		break;
	case 4:
		qm.sendNextPrev("Alrighty then! I'll send you to the stable where our precious cows are at.");
		break;
	case 5:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)), true);
		qm.getPlayer().changeMap(qm.getMap(912000100), qm.getMap(912000100).getPortal(1));
		qm.dispose();
}
}