/*
	名字:	潘姆
	地圖:	潘姆之家
	描述:	240000006
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
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
		var chat = "You want me to make you my Concentrated Formula? Are you interested in raising a dragon as well? What? It's for a Mount? I don't understand what you're saying, but you just need the Concentrated Formula made, right? As long as you bring the ingredients, I'll concoct it for you. What kind of Formula would you like me to make?#b"
		item = ["#t4032196#", "#t4032197#", "#t4032198#"];
		for (var i = 0; i < item.length; i++)
		chat += "\r\n#L" + i + "#" + item[i] + "#l";
		cm.sendSimple(chat);
		break;
	case 1:
		selectItem = selection;

		item = [4032196, 4032197, 4032198];
		var matSet = [[4000236, 4000237, 4000238], [4000239, 4000241, 4000242], [4000262, 4000263, 4000265]];
		var matSetQty = [[30, 30, 30], [30, 30, 30], [30, 30, 30]];
		var costSet = [2000000, 3000000, 4000000];

		item = item[selectItem];
		mat = matSet[selectItem];
		matQty = matSetQty[selectItem];
		cost = costSet[selectItem];

		var chat = "You want me to make ";
		chat += "#t" + item + "#?";
		chat += " In that case, I'm going to need specific items from you in order to make it. #b";
		for (var i = 0; i < mat.length; i++)
		chat += "\r\n#v" + mat[i] + "#" + (matQty[i] * 1) + "#t" + mat[i] + "#";
		chat += "\r\n#v4031138#" + (cost * 1) + " meso";
		cm.sendYesNo(chat);
		break;
	case 2:
		for (var i = 0; i < mat.length; i++)
		if (cm.getPlayer().itemQuantity(mat[i]) < matQty[i] * 1) {
			cm.sendOk("Surely you, of all people, would understand the value of having quality items? I can't do that without the items I require.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() < (cost * 1)) {
			cm.sendOk("Sorry, but this is how I make my living. No meso, no item.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please make sure you have room in your inventory, and talk to me again."));
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
			cm.gainItem(mat[i], -matQty[i] * 1);
			cm.gainMeso(-cost * 1);
			cm.gainItem(item, 1);
			cm.sendOk("Completed production, I hope you can use it properly.");
			cm.dispose();
}
}