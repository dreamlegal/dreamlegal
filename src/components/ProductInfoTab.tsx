import { FaCircleCheck } from "react-icons/fa6";

import { GrDeploy } from "react-icons/gr";
import { TiWorldOutline } from "react-icons/ti";
import { CiMobile3 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

function ProductInfoTab({ product }: any) {

  
  return (
    <div>
      {/* <div className=" flex flex-col gap-10 font-clarity">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
              <GrDeploy className=" text-primary1 w-4 h-4" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-bold text-lg leading-5">Deployment</h6>
            
            <ul className="mb-4 -ml-1 space-y-2">
              {product.deployement.map((option: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1">
                    <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                  </span>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
              <TiWorldOutline className=" text-primary1 w-5 h-5" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-bold text-lg leading-5">
              Focus countries
            </h6>
            
            <ul className="mb-4 -ml-1 space-y-2">
              {product.focusCountries.map(
                (
                  country:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined,
                  index: Key | null | undefined
                ) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-1">
                      <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                    </span>
                    {country}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
              <CiMobile3 className=" text-primary1 w-5 h-5" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-bold text-lg leading-5">
              Mobile Accessibility
            </h6>
            
            <ul className="mb-4 -ml-1 space-y-2">
              <li className="flex items-start">
                <span className="mr-1">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
                {product.mobileAvailable}
              </li>{" "}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 font-clarity mt-10 w-full">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
              <SlCalender className=" text-primary1 w-4 h-4" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-bold text-lg leading-5">
              Average adoption time
            </h6>
            
            <ul className="mb-4 -ml-1 space-y-2">
              <li className="flex items-start">
                <span className="mr-1">
                  <FaCalendarAlt className="w-5 h-5 mt-px text-teal-500" />
                </span>
                {product.avgTimeAdoption}
              </li>{" "}
            </ul>
          </div>
        </div>

        
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
              <IoLanguage className=" text-primary1 w-4 h-4" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-bold text-lg leading-5">Language</h6>
            

          
          </div>
        </div>
        <ul className="mb-4 md:ml-12 grid grid-cols-3 gap-8 w-full ">
              {product.languages.map((language: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1">
                    <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                  </span>
                  {language}
                </li>
              ))}
            </ul> */}
            <div className="flex flex-col gap-10 font-clarity">
    {/* Deployment Section */}
    <div className="flex flex-col sm:flex-row">
      <div className="sm:mr-4">
        <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
          <GrDeploy className="text-primary1 w-4 h-4" />
        </div>
      </div>
      <div>
        <h6 className="mb-2 font-bold text-lg leading-5">Deployment</h6>
        {product.deployement?.length > 0 ? (
          <ul className="mb-4 -ml-1 space-y-2">
            {product.deployement.map((option: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mb-4 -ml-1 space-y-2">
            {["Cloud deployment", "On-premise solution", "Hybrid setup"].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1 blur-[3px]">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
                <span className="text-gray-800 blur-[3px] select-none font-medium">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Focus Countries Section */}
    <div className="flex flex-col sm:flex-row">
      <div className="sm:mr-4">
        <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
          <TiWorldOutline className="text-primary1 w-5 h-5" />
        </div>
      </div>
      <div>
        <h6 className="mb-2 font-bold text-lg leading-5">Focus countries</h6>
        {product.focusCountries?.length > 0 ? (
          <ul className="mb-4 -ml-1 space-y-2">
            {product.focusCountries.map((country, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
                {country}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mb-4 -ml-1 space-y-2">
            {["United States", "United Kingdom", "European Union"].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1 blur-[3px]">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
                <span className="text-gray-800 blur-[3px] select-none font-medium">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Mobile Accessibility Section */}
    <div className="flex flex-col sm:flex-row">
      <div className="sm:mr-4">
        <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
          <CiMobile3 className="text-primary1 w-5 h-5" />
        </div>
      </div>
      <div>
        <h6 className="mb-2 font-bold text-lg leading-5">Mobile Accessibility</h6>
        <ul className="mb-4 -ml-1 space-y-2">
          <li className="flex items-start">
            <span className="mr-1">
              {product.mobileAvailable ? (
                <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
              ) : (
                <span className="blur-[3px]">
                  <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
                </span>
              )}
            </span>
            {product.mobileAvailable || (
              <span className="text-gray-800 blur-[3px] select-none font-medium">
                Available on iOS and Android platforms
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Second Section Group */}
  <div className="flex flex-col gap-10 font-clarity mt-10 w-full">
    {/* Adoption Time Section */}
    <div className="flex flex-col sm:flex-row">
      <div className="sm:mr-4">
        <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
          <SlCalender className="text-primary1 w-4 h-4" />
        </div>
      </div>
      <div>
        <h6 className="mb-2 font-bold text-lg leading-5">Average adoption time</h6>
        <ul className="mb-4 -ml-1 space-y-2">
          <li className="flex items-start">
            <span className="mr-1">
              {product.avgTimeAdoption ? (
                <FaCalendarAlt className="w-5 h-5 mt-px text-teal-500" />
              ) : (
                <span className="blur-[3px]">
                  <FaCalendarAlt className="w-5 h-5 mt-px text-teal-500" />
                </span>
              )}
            </span>
            {product.avgTimeAdoption || (
              <span className="text-gray-800 blur-[3px] select-none font-medium">
                2-3 weeks average implementation time
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Language Section */}
  <div className="flex flex-col sm:flex-row mt-10">
    <div className="sm:mr-4">
      <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary2">
        <IoLanguage className="text-primary1 w-4 h-4" />
      </div>
    </div>
    <div>
      <h6 className="mb-2 font-bold text-lg leading-5">Language</h6>
    </div>
  </div>
  {product.languages?.length > 0 ? (
    <ul className="mb-4 md:ml-12 grid grid-cols-3 gap-8 w-full">
      {product.languages.map((language: string, index: number) => (
        <li key={index} className="flex items-start">
          <span className="mr-1">
            <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
          </span>
          {language}
        </li>
      ))}
    </ul>
  ) : (
    <ul className="mb-4 md:ml-12 grid grid-cols-3 gap-8 w-full">
      {["English", "Spanish", "French", "German", "Chinese", "Japanese"].map((lang, index) => (
        <li key={index} className="flex items-start">
          <span className="mr-1 blur-[3px]">
            <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
          </span>
          <span className="text-gray-800 blur-[3px] select-none font-medium">{lang}</span>
        </li>
      ))}
    </ul>
  )}

    </div>


    
  );
}

export default ProductInfoTab;
