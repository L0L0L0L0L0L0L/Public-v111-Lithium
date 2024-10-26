/*
	名字:	猶利塔
	地圖:	猶利塔的辦公室
	描述:	926100203
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage7") != null) {
		cm.sendOk(eim.getProperty("stage7") == 1 ? "哈哈哈，法郎肯洛伊德是瑪迦提亞煉金術的巔峰，哈哈哈哈哈..." : "不...我被打敗了，我所做的一切都是為了發展一種更偉大的煉金術，我做了每個人站在我這樣的地方都會做的事！不！！！他們只是因為科學被認為是危險的事務，而決定阻礙科學的發展。");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 926100401) {
		cm.sendNext("什麼........你怎麼來到這裡的，我已經把這裡的入口全關閉了，不管怎樣，這種情況很快就會解決的，看來我有必要向你們展示我的最新的武器，蒙特鳩協會和卡帕萊協會最好的煉金術組合，#b法郎肯洛伊德#k！");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "猶利塔: 什麼........你怎麼來到這裡的，我已經把這裡的入口全關閉了，不管怎樣，這種情況很快就會解決的，看來我有必要向你們展示我的最新的武器，蒙特鳩協會和卡帕萊協會最好的煉金術組合，法郎肯洛伊德"));
		mob = cm.getPlayer().getMap().getReactorById(2619001).getState() > 0 ? 9300139 : 9300140;
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob), new java.awt.Point(250, 100));
		eim.setProperty("stage7", 1);
		cm.dispose();
		return;
		}
		cm.sendNext("哈~~你們很狡猾，不過，我從你們進來就開始監視你們的行動，既然你們來到了這個區域，但別擔心，我的助手會照顧你們的，哈......哈......哈哈，那我就先撤退了。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "猶利塔: 哈~~你們很狡猾，不過，我從你們進來就開始監視你們的行動，既然你們來到了這個區域，但別擔心，我的助手會照顧你們的，哈......哈......哈哈，那我就先撤退了"));
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		for(var i = 0; i < 20; i++) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300143), new java.awt.Point(-500 + (Math.random() * 900), 243));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300144), new java.awt.Point(-500 + (Math.random() * 900), 243));
		}
		cm.dispose();
}