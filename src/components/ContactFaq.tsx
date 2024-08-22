import Item from "./Faq";

function ContactFaq() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 font-clarity">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center">
          <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
            <h2 className="max-w-lg mb-6   text-3xl font-bold leading-none  text-gray-900 sm:text-4xl md:mx-auto">
              Frequently asked questions
            </h2>
           
          </div>
        </div>
        <div className="space-y-5">
          <Item title="What is DreamLegal directory?">
          DreamLegal directory is a comprehensive online resource that lists various legal technology tools and solutions available for lawyers, law firms, legal departments and other legal professionals.
          </Item>
          <Item title="What features are available in the directory?">
          Our directory offers comprehensive listings, detailed profiles, comparison  of tools, search and filter options, user reviews, expert insights, vendor information and alerts.
          </Item>
          <Item title="Is this directory free to use?">
          Yes, this directory is free for users to view information, compare, download resources and use filters. Some functionalities may require signing in.
          </Item>
          <Item title="Do you also provide legal tech consultation?">
          Yes, DreamLegal helps with selection, onboarding, management and even training of employees post legal tech implementation. Kindly contact us in case you need any of the above services.
          </Item>
          <Item title="How can vendors list their product?">
          Vendors can contact us via our website's contact form or email at vendor@dreamlegal.in to submit their product for listing
          </Item>
        </div>
      </div>
    </div>
  );
}

export default ContactFaq;
