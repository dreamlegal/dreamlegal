"use client"
import ContactDesk from "@/components/ContactDesk";
import ContactFaq from "@/components/ContactFaq";
import ContactHero from "@/components/ContactHero";
import React from "react";

function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactDesk />
      <ContactFaq />
    </div>
  );
}

export default ContactPage;
