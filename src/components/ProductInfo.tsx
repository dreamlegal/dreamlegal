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

  
  const [form1Pending, setForm1Pending] = useState(false);
  const [form2Pending, setForm2Pending] = useState(false);
  const [form3Pending, setForm3Pending] = useState(false);
  const [form4Pending, setForm4Pending] = useState(false);
  const [form5Pending, setForm5Pending] = useState(false);
  const [form6Pending, setForm6Pending] = useState(false);
  const [form7Pending, setForm7Pending] = useState(false);
  const [form8Pending, setForm8Pending] = useState(false);
 

  return (
    <>
      <div className="my-4 font-clarity">
        <h2
          onClick={() => {
            setStep(step === 1 ? 0 : 1);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Product Information
        </h2>

        {step=== 1 && <Form1  form1Pending={form1Pending} setForm1Pending={setForm1Pending} />}

        <h2
          onClick={() => {
            setStep(step === 2 ? 0 : 2);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Overview
        </h2>

        {step === 2  &&  form1Pending==true && <Form2  form2Pending={form2Pending} setForm2Pending={setForm2Pending}  />}

        <h2
          onClick={() => {
            setStep(step === 3 ? 0 : 3);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Customer Segment
        </h2>

        {step === 3  && form2Pending==true && <Form3 form3Pending={form3Pending} setForm3Pending={setForm3Pending}   />}

        <h2
          onClick={() => {
            setStep(step === 4 ? 0 : 4);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Process Lifecycle
        </h2>

        {step === 4  && form3Pending==true && <Form4 form4Pending={form4Pending} setForm4Pending={setForm4Pending}/>}

        <h2
          onClick={() => {
            setStep(step === 5 ? 0 : 5);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Features
        </h2>

        {step === 5  && form4Pending==true && <Form5 form5Pending={form5Pending} setForm5Pending={setForm5Pending} />}

        <h2
          onClick={() => {
            setStep(step === 6 ? 0 : 6);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Pricing
        </h2>

        {step === 6   && form5Pending==true && <Form6 form6Pending={form6Pending} setForm6Pending={setForm6Pending} />}

        <h2
          onClick={() => {
            setStep(step === 7 ? 0 : 7);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Service and Support
        </h2>

        {step === 7 && form6Pending==true && <Form7 form7Pending={form7Pending} setForm7Pending={setForm7Pending} />}

        <h2
          onClick={() => {
            setStep(step === 8 ? 0 : 8);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Post implementation service
        </h2>

        {step === 8   && form7Pending==true && <Form8  form8Pending={form8Pending} setForm8Pending={setForm8Pending}/>}

        <h2
          onClick={() => {
            setStep(step === 9 ? 0 : 9);
          }}
          className="text-gray-900 text-xl font-bold flex gap-2 items-center mt-4 hover:cursor-pointer"
        >
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          References
        </h2>

        {step === 9  && form8Pending==true && <Form9 editing={editing}  />}
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
