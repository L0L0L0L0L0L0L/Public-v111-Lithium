/*
    Name:    Ticket Check
    Map:     New Leaf City - Subway Station
    Description:    600010001
*/

var ticket = 4031713;

function start() {
	if (!cm.getPlayer().itemQuantity(ticket)) {
		cm.sendOk("You don't have a #v" + ticket + "#. I can't let you board the train. You can buy a ticket at the ticket booth!");
		cm.dispose();
		return;
	}
	em = cm.getEventManager("Subway");
	if (em.getProperty("entry") == "false" && em.getProperty("docked") == "true") {
		cm.sendOk("Dear customer, ticket checking has stopped one minute before the train departs.");
		cm.dispose();
		return;
	}
	if (em.getProperty("entry") == "false") {
		cm.sendOk("Sorry, the train has already departed. Please wait for the next train.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("Dear customer, the subway heading to Fallen City has arrived. Would you like to enter the #bwaiting room#k now?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainItem(ticket, -1);
		cm.getPlayer().changeMap(cm.getMap(600010002), cm.getMap(600010002).getPortal(0));
	}
	cm.dispose();
}
