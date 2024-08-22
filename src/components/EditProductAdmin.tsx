"use client";

import { useEffect, useState } from "react";

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
import { useFormContext } from "@/context/formValueContext";

function EditProductAdmin({ editing = false, id }: { editing: boolean, id: string }) {
    const { formValues, setFormValues } = useFormContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Access localStorage only in client-side


        const fetchProduct = async () => {


            try {
                const response = await fetch("/api/admin-product-detail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                const data = await response.json();

                if (data.success) {
                    const product = data.product;
                    setFormValues((prevValues: any) => ({
                        ...prevValues,
                        ...product,
                    }));
                } else {
                    console.error(data.msg);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };


        fetchProduct();

    }, [id, setFormValues]);
    const { step, prevStep, nextStep, setStep } = useStepContext();


    const [submitted, setSubmitted] = useState(false);


    if (loading) {
        return <div>Loading...</div>;
    }

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
                               
                                <h2 className="text-gray-600 text-xl font-bold">
                                    Please wait we are submitting form
                                </h2>
                                <p className="text-gray-500">
                                    Uploading Images and Updating the database
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default EditProductAdmin;
