const getTitleSortedEvents = eventsdata => {
    eventsdata.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
    return eventsdata;
};

export default getTitleSortedEvents;