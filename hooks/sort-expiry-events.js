const getExpirySortedEvents = eventsdata => {
    eventsdata.sort(function(a, b) {
        return a.expiry.getTime()>b.expiry.getTime();
    });
    return eventsdata;
};

export default getExpirySortedEvents;