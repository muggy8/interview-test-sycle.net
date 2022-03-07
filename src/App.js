import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import generateDurationPermutations from "./create-durations";
import createMeeting from "./create-meeting";
import "./styles.css";

export default function App() {
  let [minimumMeetingDurationMin, updateMinDurationMin] = useState(15);
  let [avalableMinutes, updateAvalableMinutes] = useState(8 * 60);
  let [avalableHours, updateAvalableHours] = useState(8);
  let [selectedBookingDurationMin, updateSelectedBookingDurationMin] = useState(
    0
  );
  let [selectedBookingDate, updateSelectedBookingDate] = useState(new Date());

  // if either avalable hours or minimum minutes changes, the following should run match the new state.
  // this way, when scope creep eventually hits and we need to add more functions, it wont come at a cost of app performance.
  let [bookingAvalabilityPermutations, updateBookingPermutations] = useState(
    []
  );
  useEffect(() => {
    updateBookingPermutations(
      generateDurationPermutations(minimumMeetingDurationMin, avalableMinutes)
    );
  }, [minimumMeetingDurationMin, avalableMinutes]);

  // when the user selects a booking time, we should try to generate an actual booking beause there's no backend API we neet to talk to
  let [bookedAppointment, updateAppointment] = useState(undefined);
  useEffect(() => {
    if (selectedBookingDurationMin && selectedBookingDate) {
      updateAppointment(
        createMeeting(selectedBookingDate, selectedBookingDurationMin)
      );
    } else {
      updateAppointment(undefined);
    }
  }, [selectedBookingDurationMin, selectedBookingDate]);

  // run this when avalable hours changes as a cleanup function for all the generated values and to match all the values to the correct values
  useEffect(() => {
    if (avalableMinutes !== avalableHours * 60) {
      updateAvalableMinutes(avalableHours * 60);
    }
    updateSelectedBookingDurationMin(0);
    updateSelectedBookingDate(new Date());
    updateAppointment(undefined);
  }, [avalableHours, avalableMinutes]);

  // here's our UI nice and pretty... just kidding. I'm not gonna pretend I'm a designer anymore ;~;
  return (
    <div className="App">
      <h1>Available Timeslots + booking calculator</h1>
      <label className="block">
        Minimum Meeting Duration:
        <input
          value={minimumMeetingDurationMin}
          onChange={(ev) => updateMinDurationMin(ev.target.valueAsNumber)}
          type="number"
        />
      </label>
      <label className="block">
        Hours Available To Meet:
        <input
          value={avalableHours}
          onChange={(ev) => updateAvalableHours(ev.target.valueAsNumber)}
          type="number"
        />
        ({avalableMinutes} min)
      </label>
      {avalableMinutes && minimumMeetingDurationMin ? (
        <div className="select-meeting">
          I would like to have a meeting of:
          <select
            value={selectedBookingDurationMin}
            onChange={(ev) =>
              updateSelectedBookingDurationMin(parseInt(ev.target.value))
            }
          >
            <option value={0} key="empty">
              --Please Select An Option--
            </option>
            {bookingAvalabilityPermutations.map((posibility) => {
              return (
                <option value={posibility.minutes} key={posibility.label}>
                  {posibility.label}
                </option>
              );
            })}
          </select>
        </div>
      ) : undefined}
      {avalableMinutes && minimumMeetingDurationMin ? (
        <div>
          on the date/time of:
          <DateTimePicker
            type="datetime-local"
            value={selectedBookingDate}
            onChange={updateSelectedBookingDate}
          />
        </div>
      ) : undefined}
      {bookedAppointment ? (
        <div>
          You have made a booking for {bookedAppointment.minutes} minutes
          between {bookedAppointment.label}
        </div>
      ) : undefined}
    </div>
  );
}
