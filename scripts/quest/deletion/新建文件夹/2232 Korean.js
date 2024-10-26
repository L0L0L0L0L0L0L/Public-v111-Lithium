/*
	名字:	登記成為跟隨者！
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2232)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2232).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (!(qm.getPlayer().getJunior1() > 0 || qm.getPlayer().getJunior2() > 0)) {
			qm.sendOk("흐음, 아직 자네가 후원해 줄 주니어를 찾지 못한 모양이구만?");
			qm.dispose();
			return;
			}
			qm.sendNext("오! 자네가 후원해 줄 주니어를 찾았나보군. 정말 잘 했네!");
			break;
	case 1:
		qm.sendNextPrev((qm.getPlayer().getJunior1() > 0 && qm.getPlayer().getJunior2() > 0) ? "주니어를 두 명 모두 등록했군? 역시~ 자네는 내가 본 눈이 틀리지 않은 것 같군!" : "주니어를 한 명만 등록했다면 다른 한 명도 어서 찾아보게. 당연히 한 명보다는 두 명이 낫지 않겠나?");
		break;
	case 2:
		qm.sendNextPrev("그럼, 좋은 엘더가 되어 주게나.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2232).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(2000);
		qm.dispose();
}
}