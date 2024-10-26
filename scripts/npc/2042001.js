/*
    Name: Xue Beideman
    Map: Toy Town
    Description: 220000000
*/

function start() {
	request = cm.getNextCarnivalRequest();
	cm.sendYesNo(request.getChallengeInfo() + "\r\nWould you like these companions to join your Monster Carnival?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
	}
	cm.dispose();
}
