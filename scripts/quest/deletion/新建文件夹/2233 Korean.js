/*
	名字:	增加聲望值！
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2233)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2233).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getCurrentRep() < 1000) {
			qm.sendOk("흐음, 아직 명성도 1000은 모으지 못한 모양이지? 조금 어려울 수 있지만 주니어들과 함께 사냥을 하다보면 금방 이룩할 수 있을걸세!");
			qm.dispose();
			return;
			}
			qm.sendNext("오~! 명성도가 1,000이 넘다니.. 자네도 이제 유명한 모험가가 되었어. 정말 잘 했네!")
			break;
	case 1:
		qm.sendNextPrev("자네의 활약을 보면 나도 피가 다시 끓는군. 빨리 젊고 유능한 주니어를 다시 찾아봐야 겠어. 어떤가? 명성도를 올리는 것은 그리 어렵지 않지? 핵심은 주니어가 빠르게 성장하도록 지원과 관심을 아끼지 않는 것이라네..");
		break;
	case 2:
		qm.sendNextPrev("그럼, 앞으로도 좋은 엘더가 되어 주게나.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2233).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(2400);
		qm.dispose();
}
}