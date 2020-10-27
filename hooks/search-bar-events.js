const getSearchBarEvents = (eventsdata,keyWord) => {
    results = [];
    keyWord = keyWord.toLowerCase();
    eventsdata.forEach(event => {
        if(event.title.toLowerCase().includes(keyWord)||(event.notes&&event.notes.toLowerCase().includes(keyWord)))
            results.push(event);
    });
    return results;
};

export default getSearchBarEvents;