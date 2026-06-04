export type WeddingContact = {
  role: string;
  name: string;
  phone: string;
  email?: string;
};

export type ProgramItem = {
  time: string;
  title: string;
  note: string;
};

export type WeddingConfig = {
  groom: string;
  bride: string;
  groomFull: string;
  brideFull: string;
  date: Date;
  dateDisplay: string;
  dateLong: string;
  timeDisplay: string;
  hashtag: string;
  quote: string;
  quoteRef: string;
  welcomeMessage: string;
  officiant: string;
  rsvpBy: string;
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  musicTitle: string;
  musicArtist: string;
  program: ProgramItem[];
  giftRegistry: string[];
  contacts: WeddingContact[];
};

export const wedding: WeddingConfig = {
  groom: "Richard",
  bride: "Beatrice",
  groomFull: "Richard Cobbinah",
  brideFull: "Beatrice Ekua Sikapa Baah",
  date: new Date("2026-07-04T10:00:00"),
  dateDisplay: "04 \u00b7 July \u00b7 2026",
  dateLong: "The Fourth of July, 2026",
  timeDisplay: "10:00 in the morning",
  hashtag: "#foreverrichbea",
  quote: "When the time is right, I the Lord will make it happen.",
  quoteRef: "Isaiah 60:22",
  welcomeMessage:
    "With grateful hearts, we invite you to share in the joy of our wedding day. Your love, prayers, and presence mean so much to us as we begin this beautiful new chapter together.",
  officiant: "MC Free Soul",
  rsvpBy: "15th June 2026",
  venueName: "Chairman Agare House",
  venueAddress: "Closest landmark: Balloon Hotel, Kasoa, Ghana",
  mapQuery: "Balloon Hotel, Kasoa, Ghana",
  musicTitle: "Just the Two of Us",
  musicArtist: "Bill Withers",
  program: [
    { time: "10:00 AM", title: "Arrival of Hosts", note: "Bride's family arrives and receives guests." },
    { time: "10:15 AM", title: "Arrival of Groom's Family", note: "Groom's family arrives with dowries." },
    { time: "10:30 AM", title: "Welcome Pleasantries", note: "Introductions and opening courtesies." },
    { time: "10:40 AM", title: "Opening Prayer", note: "A blessing over the ceremony and families." },
    { time: "10:50 AM", title: "Purpose of Gathering", note: "Purpose of gathering and dowry presentation." },
    { time: "11:10 AM", title: "Groom's Intent Speech", note: "The groom's family formally states their intent." },
    { time: "11:20 AM", title: "Bride's Family Response", note: "Response from the bride's family." },
    { time: "11:30 AM", title: "Arrival of Bride", note: "The bride is formally welcomed." },
    { time: "11:40 AM", title: "Formal Consent", note: "Formal consent from the bride." },
    { time: "12:00 PM", title: "Exchange of Rings & Gifts", note: "Rings, gifts, and ceremonial presentation." },
    { time: "12:20 PM", title: "Traditional Dance", note: "Traditional dance and celebration." },
    { time: "12:45 PM", title: "Closing Remarks", note: "Closing remarks and prayer." },
    { time: "1:00 PM", title: "Last Dance & Send-Off", note: "Final dance and send-off." },
  ],
  giftRegistry: ["0546411192", "0539849863"],
  contacts: [
    { role: "For Guest Enquiries", name: "Elizabeth Donkor", phone: "0533621517" },
    { role: "For Guest Enquiries", name: "Ebenezer Cobbinah", phone: "0557202013", email: "joecobbi224@gmail.com" },
  ],
};
