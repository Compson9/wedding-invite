"use client";

import { Contact } from "@/components/sections/Contact";
import { Details } from "@/components/sections/Details";
import { Footer } from "@/components/sections/Footer";
import { Guestbook } from "@/components/sections/Guestbook";
import { Program } from "@/components/sections/Program";
import { Quote } from "@/components/sections/Quote";
import { Registry } from "@/components/sections/Registry";
import { RSVP } from "@/components/sections/RSVP";
import { Welcome } from "@/components/sections/Welcome";
import { Hero } from "@/components/hero/Hero";
import { EnvelopeIntro } from "@/components/intro/EnvelopeIntro";
import { Topnav } from "@/components/layout/Topnav";
import { MusicPlayer } from "@/components/music/MusicPlayer";

export function WeddingInvite() {
  return (
    <>
      <EnvelopeIntro />
      <Topnav />
      <MusicPlayer />
      <Hero />
      <Welcome />
      <Quote />
      <Details />
      <Program />
      <Registry />
      <RSVP />
      <Guestbook />
      <Contact />
      <Footer />
    </>
  );
}
