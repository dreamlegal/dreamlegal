"use client";
import { FormValues, useFormContext } from "@/context/formValueContext";
import { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useStepContext } from "@/context/formContext";

function Form7() {
  const { formValues, setFormValues } = useFormContext();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { nextStep } = useStepContext();
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = event.target;
    if (type === "checkbox") {
      const { value, checked } = event.target as HTMLInputElement;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked
          ? [...(prevValues[name as keyof FormValues] as string[]), value]
          : (prevValues[name as keyof FormValues] as string[]).filter(
              (item) => item !== value
            ),
      }));
    } else if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && file.size <= 10 * 1024 * 1024) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: file,
        }));
      } else {
        // Display an error message or handle the oversized file in some way
        alert("File size exceeds the limit (10 MB)");
      }
    } else {
      const value = event.target.value;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    nextStep(); // Log form values
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mt-2">
          <Label htmlFor="">Demo</Label>
          {[
            "Self-demo",
            "Customised prototypes",
            "Guided walkthrough",
            "Video demos",
            "None",
          ].map((item) => (
            <div key={item} className="items-top flex space-x-2 mt-2">
              <Input
                name="Demo"
                type="checkbox"
                value={item}
                checked={formValues.Demo.includes(item)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {item}
                </label>
              </div>
            </div>
          ))}
        </div>
        <Textarea
          name="DemoNote"
          placeholder="Note (optional)"
          value={formValues.DemoNote}
          onChange={handleChange}
        ></Textarea>
        <div className="mt-2">
          <Label htmlFor="">Support</Label>
          {[
            "Phone",
            "Live chat",
            "Bot chat",
            "Community forum",
            "Dedicated account manager",
            "Help ticket",
            "None",
          ].map((item) => (
            <div key={item} className="items-top flex space-x-2 mt-2">
              <Input
                name="support"
                type="checkbox"
                value={item}
                checked={formValues.support.includes(item)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {item}
                </label>
              </div>
            </div>
          ))}
        </div>

        <Textarea
          name="supportNote"
          placeholder=" Note (optional)"
          value={formValues.supportNote}
          onChange={handleChange}
        ></Textarea>

        <div className="mt-2">
          <Label htmlFor="">Training</Label>
          {[
            "Video Tutorials",
            "User Manuals",
            "On-demand Training",
            "Certification program",
            "None",
          ].map((item) => (
            <div key={item} className="items-top flex space-x-2 mt-2">
              <Input
                name="training"
                type="checkbox"
                value={item}
                checked={formValues.training.includes(item)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {item}
                </label>
              </div>
            </div>
          ))}
        </div>
        <Textarea
          name="trainingNote"
          placeholder=" Note (optional)"
          value={formValues.trainingNote}
          onChange={handleChange}
        ></Textarea>

        <div>
          <Label htmlFor="storage">Storage</Label>
          <div className="flex gap-4">
            <Input
              name="storage"
              type="text"
              placeholder="Storage"
              value={formValues.storage}
              onChange={handleChange}
              required
            />
            <Select
              value={formValues.storageUnit}
              onValueChange={(value) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  storageUnit: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Storage Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" KB">KB</SelectItem>
                <SelectItem value="MB">MB</SelectItem>
                <SelectItem value="GB">GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Textarea
          name="storageNote"
          placeholder=" Note (optional)"
          value={formValues.storageNote}
          onChange={handleChange}
        ></Textarea>

        <div>
          <Label htmlFor="v">File upload limit</Label>
          <div className="flex gap-4">
            <Input
              name="fileSize"
              type="text"
              placeholder="File size"
              value={formValues.fileSize}
              onChange={handleChange}
              required
            />
            <Select
              value={formValues.fileSizeUnit}
              onValueChange={(value) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  fileSizeUnit: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Storage Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" KB">KB</SelectItem>
                <SelectItem value="MB">MB</SelectItem>
                <SelectItem value="GB">GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            name="fileSizeNote"
            placeholder=" Note (optional)"
            value={formValues.fileSizeNote}
            onChange={handleChange}
          ></Textarea>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <Button type="submit" className="bg-primary1" disabled={loading}>
            {loading ? "Saving" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form7;
