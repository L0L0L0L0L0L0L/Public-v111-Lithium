/*
	名字:	結冰的精靈森林
	地圖:	發光的洞穴之路
	描述:	910150002
*/

function init() {
	scheduleNew();
}

function scheduleNew() {
	em.schedule("respawnStages", 10 * 1000);
}

function respawnStages() {//監控地圖時間
	if (em.getChannelServer().getMapFactory().getMap(910150003).getAllMonstersThreadsafe().size() < 7) {
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-1762, -498));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-1862, -498));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-3101, -398));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-3201, -398));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-1808, -118));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2255, -105));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2803, -133));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-3403, -133));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2775, -685));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-3075, -685));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2183, -510));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2483, -510));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2783, -510));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-1862, -805));
		em.getChannelServer().getMapFactory().getMap(910150003).spawnMonsterOnGroundBelow(em.getMonster(9300422), new java.awt.Point(-2162, -805));
		}
		scheduleNew();
}

function cancelSchedule() {}