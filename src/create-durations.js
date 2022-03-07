export default function generateDurationPermutations(
  timestepMin,
  totalUseableTimeMin = 480 // 480 = 60 * 8 aka 8 hours as maximum timelot length
) {
  const maximumTimeslotAsMultipleOftimestepMin = Math.floor(
    totalUseableTimeMin / timestepMin
  );

  // generate permutations for display
  let permutations = [];
  for (let i = 0; i <= maximumTimeslotAsMultipleOftimestepMin; i++) {
    if (!i) {
      // since a meeting of 0 minutes(time) cant really happen unless the participants are comprised of masless enetites like photons, we're gonna skip it.
      continue;
    }

    const durationOfVariationMin = timestepMin * i;

    permutations.push({
      label: formatMinutes(durationOfVariationMin),
      minutes: durationOfVariationMin
    });
  }

  return permutations;
}

export function formatMinutes(numberOfMinutes) {
  // general logic: generate hour text and minute text and combine them and trim the spaces
  // was hoping moment gave us that function for free but oh well...

  let hoursText = "";
  let minutesText = "";
  let durationHours = Math.floor(numberOfMinutes / 60);
  let durationMinutes = numberOfMinutes % 60;

  // for later: find a good localization option for this behaviour since it doesn't seem like moment is doing it for us for free
  if (durationHours) {
    if (durationHours > 1) {
      hoursText = `${durationHours} hours`;
    } else {
      hoursText = `${durationHours} hour`;
    }
  }
  if (durationMinutes) {
    minutesText = `${durationMinutes} min`;
  }

  return `${hoursText} ${minutesText}`.trim();
}
