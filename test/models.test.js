import Event from "../src/models";

describe("Event Entity",()=> {

    let eventBuilder = () => new Event(
        new Date('2019-12-17T03:24:00'),
        new Date('2019-12-17T13:24:00'),
        "Hello World",
        "Campus Numerique",
        "This is an hello world.."
    );

    test('getTitle', async () => {
        let event = eventBuilder();
        expect(event.getTitle()).toBe("Hello World");
    })

    test('getDescription', async () => {
        let event = eventBuilder();
        expect(event.getDescription()).toBe("This is an hello world..");
    })

    test('getLocation', async () => {
        let event = eventBuilder();
        expect(event.getLocation()).toBe("Campus Numerique");
    })

});