/*
	名字:	路易士
	地圖:	第1階段
	描述:	910130000
*/

function start() {
	cm.sendYesNo("You want to get out of here? Well ... this place can really wear you down ... I'm used to it so I'm fine, though. Anyway make sure you remember that if you leave this place through me, you'll have to restart the mission. Do you still want to?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Isn't it awful that you have to restart the whole thing? Keep trying...the more you go through it, the more you'll know about this place in and out. Pretty soon you'll be able to go through this with your eyes closed hehe.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(101000000), cm.getMap(101000000).getPortal(0));
		}
		cm.dispose();
}