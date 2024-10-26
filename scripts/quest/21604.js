/*
	名字:	騎乘狼
	地圖:	冰原雪域
	描述:	211000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Hm, you're really not interested in a Wolf Mount? If you're worried you might hurt the wolf, fear not. Just like Yetis, wolves love having people on their backs.");
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
		qm.sendNext("Whoa, is that a wolf? I haven't seen anyone carry a wolf in ages! But why aren't you using it as a #bMount#k? From your bewildered expression, you probably don't know what I'm talking about...");
		break;
	case 1:
		qm.sendNextPrev("Well, it's just as it sounds. You ride on the wolf's back and it allows you to move lightning fast. Oh boy, did I have some glorious days of riding around #o5130104#s and #o5140000#s in the past!");
		break;
	case 2:
		qm.sendAcceptDecline("Interested in riding one yourself? If so, then allow me, #p2020007#, to help you.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21604).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Just because you want to ride your wolf as a Mount doesn't mean you can ride it just like that. Before anything, you must find a #b#t1912011##k so you won't hurt your wolf. I'll make the saddle for you if you bring me the materials to make it.");
		break;
	case 4:
		qm.sendNextPrev("The key material for the #t1912011# is #b#t4000048##k. I think about #b50#k should do it. When you bring me the materials, I'll give you the Monster Mount skill along with the #t1912011#. Now, hurry.");
		break;
	case 5:
		qm.dispose();
}
}