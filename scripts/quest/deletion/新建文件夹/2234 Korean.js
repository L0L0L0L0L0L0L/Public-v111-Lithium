/*
	名字:	享受出名冒險家的特權！
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2234)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2234).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getCurrentRep() > 500 || qm.getPlayer().getTotalRep() < 2000) {
			qm.sendOk("흐음, 아직 #b이름난 모험가의 특권#k을 제대로 맛보지 못했는가? 총 명성도를 2,000 이상 만들고, 현재 명성도를 500 이하로 만들면 되네.");
			qm.dispose();
			return;
			}
			qm.sendNext("드디어 자네도 #b이름난 모험가의 특권#k을 맛보았는가? 후후훗, 남은 명성도를 보니 충분히 맛을 본 모양이군. 그나저나 이렇게 빠른 시간 내에 이 정도까지 해잴 줄은.. 정말 자네의 리더쉽은 타고난 듯 싶네.");
			break;
	case 1:
		qm.sendNextPrev("그럼, 앞으로도 좋은 엘더가 되어 주게나. 패밀리에 대해 궁금한 점이 있거나 칭호에 관심이 생긴다면 언제든지 나를 찾아오게.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2234).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(3000);
		qm.dispose();
}
}