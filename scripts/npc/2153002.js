/*
	名字:	巨人
	地圖:	礦山入口
	描述:	310040200
*/

function start() {
	if (cm.getPlayer().hasEquipped(1003134)) {
		cm.sendNext("Member of the Black Wing indeed. Take the portal to the right to enter.");
		cm.dispose();
		return;
		}
		cm.sendOk("The Verne Mine is currently being used by the Black Wings. You can't enter unless you are a member of the Black Wings. Bring something to prove that you are a member. Something with the Black Wings logo on it... Something sort of like my hat, for instance.");
		cm.dispose();
}