function start() {
	var request = cm.getNextCarnivalRequest();
	cm.sendYesNo(request.getChallengeInfo() + "\r\nDo you want these partners to join your Monster Carnival 2?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
	}
	cm.dispose();
}
