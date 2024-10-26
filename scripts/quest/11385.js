/*
	名字:	活動映入眼簾
	地圖:	維多利亞港
	描述:	104000000
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
	switch (status) {
	case 0:
		qm.sendNext("Hello, #h0#. Are enjoying the many events of #rMapleStory#k? You know, you might be missing out on some huge, awesome events right now! Wouldn't that be terrible? But never fear, because I can help!");
		break;
	case 1:
		qm.sendNextPrev("See, if you press the #r[Menu]#k button at the bottom of your screen, you'll find the #b[Event]#k menu. When you click that, it will show you all the events that are taking place in MapleStory right now! You can see which events are active, how long they run, and what rewards they give, as well. \r\n#v3800221#");
		break;
	case 2:
		qm.sendNextPrev("You can also check by using the shortcut key #b[v]#k, so check it out when you want to participate in some awesome events! \r\n#v3800222#");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(11385).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(11385));
		qm.sendEventWindow();
		qm.dispose();
}
}