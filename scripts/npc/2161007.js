/*
    Name: Jian's Brother
    Map: Dangerous First Tower
    Description: 921140100
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("Due to the presence of monsters, Jian's brother cannot be rescued.");
		cm.dispose();
		return;
	}
	cm.removeAll(4032858); // Remove specific item (could be related to the quest or event)
	cm.gainItem(4032831, 1); // Give the player an item
	cm.getPlayer().changeMap(cm.getMap(211060200), cm.getMap(211060200).getPortal(3)); // Move player to a new map
	cm.dispose();
}
