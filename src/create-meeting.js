import moment from "moment";

// should return { label: "03:45 - 05:00", minutes: 75 }
export default function createMeeting(
  startTime,
  durationMinu,
  outputFormat = "hh:mm"
) {
  let endMoment = moment(startTime).add(
    moment.duration({
      minute: durationMinu
    })
  );
  return {
    label: `${moment(startTime).format(outputFormat)} - ${endMoment.format(
      outputFormat
    )}`,
    minutes: durationMinu
  };
}
