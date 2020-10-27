const getRemindSortedEvents = eventsdata => {
    eventsdata.sort(function(a, b) {
        return a.remind.getTime()>b.remind.getTime();
    });
    return eventsdata;
};

export default getRemindSortedEvents;