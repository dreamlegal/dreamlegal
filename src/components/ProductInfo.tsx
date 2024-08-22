"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { useStepContext } from "@/context/formContext";

import { IoIosInformation } from "react-icons/io";
import Form1 from "./form/form1";
import Form2 from "./form/form2";
import Form3 from "./form/form3";
import Form4 from "./form/form4";
import Form5 from "./form/form5";
import Form6 from "./form/form6";
import Form7 from "./form/form7";
import Form8 from "./form/form8";
import Form9 from "./form/form9";

function ProductInfo({ editing = false }: { editing: boolean }) {
  const { step, prevStep, nextStep, setStep } = useStepContext();

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="my-4 font-clarity">
        <h2
          onClick={() => {
            setStep(1);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Product Information
        </h2>

        {step === 1 && (
          <>
            <Form1></Form1>
          </>
        )}

        <h2
          onClick={() => {
            setStep(2);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Overview
        </h2>

        {step === 2 && (
          <>
            <Form2></Form2>
          </>
        )}

        <h2
          onClick={() => {
            setStep(3);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Customer Segment
        </h2>

        {step === 3 && (
          <>
            <Form3></Form3>
          </>
        )}

        <h2
          onClick={() => {
            setStep(4);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Process Lifecycle
        </h2>

        {step === 4 && (
          <>
            <Form4></Form4>
          </>
        )}

        <h2
          onClick={() => {
            setStep(5);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Features
        </h2>

        {step === 5 && (
          <>
            <Form5></Form5>
          </>
        )}
        <h2
          onClick={() => {
            setStep(6);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Pricing
        </h2>
        {step === 6 && (
          <>
            <Form6></Form6>
          </>
        )}

        <h2
          onClick={() => {
            setStep(7);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Service and Support
        </h2>

        {step === 7 && (
          <>
            <Form7></Form7>
          </>
        )}

        <h2
          onClick={() => {
            setStep(8);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Post implementation service
        </h2>

        {step === 8 && (
          <>
            <Form8></Form8>
          </>
        )}

        <h2
          onClick={() => {
            setStep(9);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          References
        </h2>
        {step === 9 && (
          <>
            <Form9 editing={editing}></Form9>
          </>
        )}
      </div>
      {step === 10 && (
        <>
          <div className="my-4 font-clarity">
            <div className="flex  items-center">
              <div className=" flex flex-col items-center">
                <img src="/submitted.gif" alt="" />
                <h2 className="text-gray-600 text-xl font-bold">
                  Please wait we are submitting form
                </h2>
                <p className="text-gray-500">
                  Thank you for your product submission. We will get back to you
                  soon!
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductInfo;
