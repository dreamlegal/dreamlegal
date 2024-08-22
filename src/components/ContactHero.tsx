import React from "react";
import ContactForm from "./ContactForm";

function ContactHero() {
  return (
    <div className=" bg-[#f8f8fb]">
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 font-clarity">
        <div className=" grid grid-cols-1 md:grid-cols-3  gap-5 md:px-24 py-14 md:py-20">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl md:text-[44px] font-bold text-gray-900">
              Get in touch
            </h1>
            <p className="text-sm text-slate-500">
            Your inquiries are important to us. Please use the form here or contact us directly through phone or email.
            </p>

            <h2 className="text-xl font-bold mt-5">Contact information</h2>

            <div className=" bg-white rounded-2xl py-5 px-3 flex flex-col gap-3 border shadow">
              <div className=" bg-[#f8f8fb] border  px-4 py-3 transition-all duration-200 hover:translate-y-1 rounded-lg hover:border-primary1 flex gap-5 items-center hover:cursor-pointer">
                <div className="">
                  <img src="/msgicon.svg" alt="" />
                </div>
                <div className="inline-flex flex-col">
                  <h3 className="text-xs text-slate-500">Send us an email</h3>
                  <a href="mailto:contact@dreamlegal.in">
                  <span className="text-sm font-bold text-gray-900">
                  contact@dreamlegal.in
                  </span>
                  </a>
                </div>
              </div>

              <div className=" bg-[#f8f8fb] border  px-4 py-3 transition-all duration-200 hover:translate-y-1 rounded-lg hover:border-primary1 flex gap-5 items-center hover:cursor-pointer">
                <div className="">
                  <img src="/callicon.svg" alt="" />
                </div>
                <div className="inline-flex flex-col">
                  <h3 className="text-xs text-slate-500">Give us a call</h3>
                  <span className="text-sm font-bold text-gray-900">
                  +91-93401-74001
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:pl-20 ">
            <div className=" flex flex-col px-5 py-4 border  rounded-2xl shadow-sm bg-white">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
