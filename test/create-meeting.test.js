import createMeeting from "../src/create-meeting";

test("create-meeting formats meetings correctly", () => {
  // no timezone added so we can play around with the current time
  expect(createMeeting("2020-08-26T03:45:00.000", 75)).toEqual({
    label: "03:45 - 05:00",
    minutes: 75
  });
});
