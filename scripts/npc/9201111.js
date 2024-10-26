/*
    Name:    Pirate Master
    Map:     Unity Test
    Description:    610030500
*/

function start() {
	cm.sendOk(cm.getPlayer().getMap().getId() == 610030000
		? "A long time ago, a strange warrior drifted on the Masteria Coast. It is said that he was a member of a mysterious warrior group who defeated enemies using claw weapons and projectile cannons. Known as Iron Fist Jack, he was capable of anything in battle and could adapt to fighting in various environments."
		: "Pirates do not insist on maintaining a certain stance but adapt flexibly in battle, changing their posture to maximize their capabilities and versatility according to the environment and situation. The room specialized for pirates is filled with dangers; you must find the deeply buried #bForbidden Gun#k.");
	cm.dispose();
}
