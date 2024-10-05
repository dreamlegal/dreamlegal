import { RiPresentationLine } from "react-icons/ri";
import { TbDeviceAnalytics } from "react-icons/tb";
import { GiStairsGoal } from "react-icons/gi";

export const WhyChooseUs = () => {
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 font-clarity">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
         
          <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            
        Why choose DreamLegal

          </h2>
          
        </div>
        <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5">Smart Savings, Swift Decisions</h6>
              <p className="mb-3 text-base text-gray-700 text-justify">
              Slash consultation costs and discovery time with our intuitive compare feature, paving the way for seamless product analysis.
              </p>
            </div>
          
          </div>
          <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <RiPresentationLine className="w-8 h-8 " />
              </div>
              <h6 className="mb-2 font-semibold leading-5">Easy Legal Tech Learning</h6>
              <p className="mb-3 text-base text-gray-700 text-justify">
              We've made catching up legal tech super simple for professionals. Dive in and master with ease!
              </p>
            </div>
            
          </div>
          <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <TbDeviceAnalytics className=" w-8 h-8 " />
              </div>
              <h6 className="mb-2 font-semibold leading-5">Detailed Software Analysis</h6>
              <p className="mb-3 text-base text-gray-700 text-justify">
              Gain access to detailed feature breakdowns of each legal tech with comprehensive insights.

              </p>
            </div>
           
          </div>
          <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <GiStairsGoal className="w-8 h-8"  />
              </div>
              <h6 className="mb-2 font-semibold leading-5">Tailored Software Visions</h6>
              <p className="mb-3 text-base text-gray-700 text-justify">
              Clear communication of the visions of software companies, allowing legal tech buyers to align them with their specific requirements.
              </p>
            </div>
           
          </div>
        </div>
      </div>
    );
  };