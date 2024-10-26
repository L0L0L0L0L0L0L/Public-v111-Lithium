/*
	Name: Ryden
    Map: Kerning City
    Map ID:	103000000
*/

function start() {
	if (cm.getPlayer().getSubcategory() == 1) {
		cm.sendOk("I will contact you when I need you.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() != 10000 || cm.getPlayer().getLevel() > 1) {
		cm.sendOk("Huh...is something wrong?");
		cm.dispose();
		return;
		}
		var chat = "Hey! That little guy over there, are you interested in joining my organization and becoming a member of the Dual Blade? I've been waiting for you here for a long time and found that you have great potential. Do you want to join?#b";
        chat += "\r\n#L0#I will continue to play Adventurer";
        chat += "\r\n#L1#I want to be a Dual Blade";
		cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		cm.sendOk("If you leave here, it's impossible to become a Dual Blade. You'd better think about it carefully.");
		break;
	case 1:
		cm.getPlayer().setSubcategory(1);
		cm.getPlayer().fakeRelog();
		}
		cm.dispose();
}