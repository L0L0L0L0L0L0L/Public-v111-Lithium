var setupTask;
var nextTime;
var activeDays = [java.util.Calendar.SATURDAY, java.util.Calendar.SUNDAY];

function init() {
    var cal = java.util.Calendar.getInstance();
    var dayOfWeek = cal.get(java.util.Calendar.DAY_OF_WEEK);

    // Check if it's Saturday or Sunday
    if (activeDays.includes(dayOfWeek)) {
        scheduleForWeekend(cal);
    }
}

function scheduleForWeekend(cal) {
    cal.set(java.util.Calendar.MINUTE, 0); // Start at the beginning of an hour
    cal.set(java.util.Calendar.SECOND, 0);
    nextTime = cal.getTimeInMillis();

    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 60 * 5; // Schedule every 5 hours (2 hours active + 3 hours break)
    }

    scheduleNew();
}

function scheduleNew() {
    setupTask = em.scheduleAtTimestamp("setup", nextTime);
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}

function setup() {
    // 2 hours active
    em.activateEvent(); // Your function for starting the 2-hour task
    setupTask = em.schedule("endEvent", 1000 * 60 * 60 * 2); // Schedule to stop the task after 2 hours
}

function endEvent() {
    em.deactivateEvent(); // Your function to end the 2-hour task
    nextTime += 1000 * 60 * 60 * 5; // 5 hours (2 hours active + 3 hours idle)
    scheduleNew(); // Schedule the next event
}
