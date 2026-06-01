/* =====================================================================
 * app.jsx — root of Richard & Beatrice's wedding invite.
 * ===================================================================== */

function App() {
  return (
    <>
      <EnvelopeIntro />
      <Topnav />
      <MusicPlayer />

      <Hero />
      <Quote />
      <Details />
      <RSVP />
      <Guestbook />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
