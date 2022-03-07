import generateDurationPermutations from "../src/create-durations";

test("permutation generator", function () {
  expect(generateDurationPermutations(5, 30)).toEqual([
    { label: "5 min", minutes: 5 },
    { label: "10 min", minutes: 10 },
    { label: "15 min", minutes: 15 },
    { label: "20 min", minutes: 20 },
    { label: "25 min", minutes: 25 },
    { label: "30 min", minutes: 30 }
  ]);

  expect(generateDurationPermutations(15)).toEqual([
    { label: "15 min", minutes: 15 },
    { label: "30 min", minutes: 30 },
    { label: "45 min", minutes: 45 },

    { label: "1 hour", minutes: 60 },
    { label: "1 hour 15 min", minutes: 75 },
    { label: "1 hour 30 min", minutes: 90 },
    { label: "1 hour 45 min", minutes: 105 },

    { label: "2 hours", minutes: 120 },
    { label: "2 hours 15 min", minutes: 135 },
    { label: "2 hours 30 min", minutes: 150 },
    { label: "2 hours 45 min", minutes: 165 },

    { label: "3 hours", minutes: 180 },
    { label: "3 hours 15 min", minutes: 195 },
    { label: "3 hours 30 min", minutes: 210 },
    { label: "3 hours 45 min", minutes: 225 },

    { label: "4 hours", minutes: 240 },
    { label: "4 hours 15 min", minutes: 255 },
    { label: "4 hours 30 min", minutes: 270 },
    { label: "4 hours 45 min", minutes: 285 },

    { label: "5 hours", minutes: 300 },
    { label: "5 hours 15 min", minutes: 315 },
    { label: "5 hours 30 min", minutes: 330 },
    { label: "5 hours 45 min", minutes: 345 },

    { label: "6 hours", minutes: 360 },
    { label: "6 hours 15 min", minutes: 375 },
    { label: "6 hours 30 min", minutes: 390 },
    { label: "6 hours 45 min", minutes: 405 },

    { label: "7 hours", minutes: 420 },
    { label: "7 hours 15 min", minutes: 435 },
    { label: "7 hours 30 min", minutes: 450 },
    { label: "7 hours 45 min", minutes: 465 },

    { label: "8 hours", minutes: 480 }

    // up to a maximum of 8 hours.
  ]);
});
