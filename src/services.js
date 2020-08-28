
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        const events = this._eventRepository.getAll()
        let firstEvent = events[0];
        for (let i = 1; i < events.length; i++) {
            if (events[i - 1].getStartTime() > events[i].getStartTime()) {
                firstEvent = events[i]
            }
        }
        return firstEvent;
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        const events = this._eventRepository.getAll()
        let lastEvent = events[0];
        for (let i = 1; i < events.length; i++) {
            if (events[i].getStartTime() > events[i - 1].getStartTime()) {
                lastEvent = events[i]
            }
        }
        return lastEvent;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        const events = this._eventRepository.getAll()
        let i = 0;
        let longestEvent
        let longestEventLength = 0;
        do {
            events[i] = this.sanitiseEvent(events[i])
            if ((events[i].getEndTime() - events[i].getStartTime()) > longestEventLength) {
                longestEvent = events[i];
                longestEventLength = longestEvent.getEndTime() - longestEvent.getStartTime()
            }

            i++
        }
        while (i < events.length)
        return longestEvent;
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        const events = this._eventRepository.getAll()
        let i = 0;
        let shortestEvent

        let shortestEventLength = this.getLongestEvent().getEndTime() - this.getLongestEvent().getStartTime();
        do {
            events[i] = this.sanitiseEvent(events[i])
            if ((events[i].getEndTime() - events[i].getStartTime()) < shortestEventLength) {
                shortestEvent = events[i];
                shortestEventLength = shortestEvent.getEndTime() - shortestEvent.getStartTime()
            }

            i++
        }
        while (i < events.length)
        return shortestEvent;
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        let evts = this._eventRepository.getAll();
        for (let i = 0; i < evts.length; i++) {
            if (evts[i].title == title) {
                return evts[i]
            }
        }
        return null;
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
        let evts = this._eventRepository.getAll();
        if (time instanceof Date){
            for (let i = 0; i < evts.length; i++) {
                let ev = this.sanitiseEvent(evts[i])
                if (time >= ev.getStartTime() && time <= ev.getEndTime()){
                    return false
                }
            }
            return true
        }
        return null
    }


    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

    sanitiseEvent(event) {
        if (event.getStartTime() > event.getEndTime()) {
            let newEvent = new Event(new Date(event.getEndTime()), new Date(event.getStartTime()), event.title, event.location, event.description)
            return newEvent
        }
        return event
    }
}


