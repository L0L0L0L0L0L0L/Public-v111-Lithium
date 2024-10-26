load('nashorn:mozilla_compat.js');
importPackage(Packages.util);
importPackage(Packages.client.inventory);
importPackage(Packages.server.life);

var status;
var h1 = -1;
var h2 = -1;

function start() {
	status = -1;
	str = "";
	select = -1;
	str += "\r\n#L1#Drop Query#l";
	cm.sendSimple("#rThe Drop Query System provides accurate information on item drops:#k" + str);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		status--;
		cm.dispose();
		return;
	}

	switch (status) {
		case 0:
			str = selection;
			cm.sendGetText("Please enter the item you want to query:");
			break;
		case 1:
			cm.sendOk(cm.searchData(str, cm.getText()));
			break;
		case 2:
			h2 = selection;
			if (!cm.foundData(str, cm.getText())) {
				cm.dispose();
				return;
			} else {
				cm.getMobs(h2);
			}
			cm.dispose();
	}
}
