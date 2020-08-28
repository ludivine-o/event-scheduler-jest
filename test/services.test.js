import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service", () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => {
                    if (fakeEvents != null) {
                        return fakeEvents.slice()
                    } else {
                        return null;
                    }
                }
            }
        });
    });

    let fakeEvents;
    const fullFakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'), new Date('2019-12-17T13:24:00'), "Hello World", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'), new Date('2020-04-01T17:00:00'), "Unit test againt", "Campus Numerique", "This is an hello world..")
    ];
    const emptyFakeEvent = []
    const nullFakeEvent = null

    test('getEvents shall call repository', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 3 result', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getEvents sahll return null if repo is empty', async () => {
        fakeEvents = emptyFakeEvent;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(0);
    })

    test('getEvents sahll return null if repo is null', async () => {
        fakeEvents = nullFakeEvent;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents()).toBe(null);
    })

    test('getFirstEvent shall return only the first event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    test('getLastEvent shall return only the last event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(fakeEvents[2]);
    })

    test('getLongestEvent shall return only the longest event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    test('getShortestEvent shall return only the shortest event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent()).toBe(fakeEvents[2]);
    })

    test('hasEventOn shall return the events active on specified date', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2019-12-17T05:24:00'))).toStrictEqual([fakeEvents[0]]);
        expect(eventService.hasEventOn(new Date('2023-12-17T05:24:00'))).toStrictEqual([]);
        expect(eventService.hasEventOn(42)).toStrictEqual([]);
    })

    test('getEventByTitle shall return the specified event if exists', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle('First event')).toBe(fakeEvents[1]);
        expect(eventService.getEventByTitle('gzgrethz')).toBeNull();
        expect(eventService.getEventByTitle(42)).toBeNull();
    })

    test('isLocationAvailable shall return the specified event if exists', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2019-12-17T05:24:00'))).toBe(false);
        expect(eventService.isLocationAvailable(new Date('2022-12-17T05:24:00'))).toBe(true);
        expect(eventService.isLocationAvailable(42)).toBeNull();
    })

    test('getCurrentEvents shall return the specified event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.getCurrentEvents()).toStrictEqual([]);
    })

    test('sanitiseEvent shall return a cleaned event', async () => {
        fakeEvents = fullFakeEvents;
        let eventService = new EventService(new EventRepository());
        expect(eventService.sanitiseEvent(fakeEvents[1])).toStrictEqual(new Event(new Date('1995-12-17T03:24:00'), new Date('2018-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."))
    })

});