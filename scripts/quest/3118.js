/*
	名字:	邪摩斯的找回的記憶
	地圖:	邪摩斯的單人房
	描述:	211000002
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
		qm.sendNext("The missing pages were a great help. I think I'm starting to understand who I am. But still, my memory comes and goes. While I write this, I am sane. But who knows when I'll lose my mind again. I have a bad feeling about all of this. If what I've learned so far is correct, something very dangerous is about to happen. I need your help, friend!");
		break;
	case 1:
		qm.sendNextPrevS("(Fr... friend? Since when did the two of you become friends? Shammos still seems quite suspicious, but you should talk to him when you have time.)", 2);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3118).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}