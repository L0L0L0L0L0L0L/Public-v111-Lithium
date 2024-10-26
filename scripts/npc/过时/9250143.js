/*
	名字:	Doctor Bing at the Scene
	地圖:	502029000
	描述:	502029000
*/

function start() {
	var chat = "#e<組隊任務：外星人>#n  \n\r\n\r 2 Party Members, all level#r 30 and level 200 \r\n#b";
	chat += "\r\n#L0#Go to Mothership - Easy (Level 30+)";
	chat += "\r\n#L1#Go to Mothership - Medium (Level 60+)";
	chat += "\r\n#L2#Go to Mothership - Hard(Level 120+)";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode == 1) {
	var em = cm.getEventManager("Visitor");
	if (em == null) {
		cm.sendOk("腳本錯誤，請稍後嘗試。");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
		cm.sendOk("很抱歉，裡面的怪物很危險，我不能讓你單獨去冒險，如果妳想執行這項任務，請告訴妳的組長與我談話。");
	} else {
		var party = cm.getPlayer().getParty().getMembers();
		var mapId = cm.getPlayer().getMapId();
		var next = true;
		var size = 0;
		var it = party.iterator();
		while (it.hasNext()) {
		var cPlayer = it.next();
		var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
		if (ccPlayer == null || ccPlayer.getLevel() < (selection == 0 ? 30 : (selection == 1 ? 60 : 120))) {
			next = false;
			break;
			}
			size += (ccPlayer.isGM() ? 2 : 1);
			}	
			if (next && size >= 2) {
				if (em.getInstance("Visitor" + selection) == null) {
					em.startInstance_Party("" + selection, cm.getPlayer());
				} else {
					cm.sendOk("任務正在執行中，請嘗試其它頻道。");
					}
				} else {
					cm.sendOk("2 Party Members, all level#r 30 and level 200");
					}
					}
					}
				cm.dispose();
}
