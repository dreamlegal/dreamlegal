"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { IoIosInformation } from "react-icons/io";

// Define the checkbox items
const checkboxItems = [
  { id: "business", label: "Business" },
  { id: "productivity", label: "Productivity" },
  { id: "management", label: "Management" },
];

const customerSegmentItems = [
  { id: "lawfirm", label: "Law firm" },
  { id: "startup", label: "Startup" },
  { id: "enterprise", label: "Enterperise" },
];

const Indusries = [
  { id: "lawfirm", label: "Law firm" },
  { id: "startup", label: "Startup" },
  { id: "enterprise", label: "Enterperise" },
];

const PractiseArea = [
  { id: "lawfirm", label: "Law firm" },
  { id: "startup", label: "Startup" },
  { id: "enterprise", label: "Enterperise" },
];

const ProcessLifecycle = [
  { id: "create", label: "Create" },
  { id: "negotiate", label: "Negotiate" },
  { id: "authenticate", label: "Authenticate" },
  { id: "execution", label: "Execution" },
  { id: "renew", label: "Renew" },
  { id: "moniter", label: "Moniter" },
];

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const deploymentOptions = [
  { id: "saas", label: "SaaS" },
  { id: "offline", label: "Offline" },
  { id: "hybrid", label: "Hybrid" },
];

const focusCountriesOptions = [
  { id: "usa", label: "USA" },
  { id: "uk", label: "UK" },
  { id: "india", label: "India" },
  { id: "germany", label: "Germany" },
  { id: "japan", label: "Japan" },
];

const accessibilityOptions = [
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "web", label: "Web" },
];

const adoptionTimeOptions = [
  { id: "1month", label: "1 month" },
  { id: "3months", label: "3 months" },
  { id: "6months", label: "6 months" },
];

const languagesOption = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "japanese", label: "Japanese" },
];

const formSchema = z.object({
  productname: z.string().min(2, {
    message: "Product must be at least 2 characters.",
  }),
  shortDescription: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(130, {
      message: "Description must be less than 130 characters.",
    }),
  companyName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  headQuater: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  phone: z.string().min(3, {
    message: "Phone must be at least 3 characters.",
  }),
  founders: z.string().min(3, {
    message: "Founders must be at least 3 characters.",
  }),
  foundedYear: z.string().min(4, {
    message: "Year must be at least 4 characters.",
  }),

  type: z.string().min(1, {
    message: "Type must be at least 3 characters.",
  }),
  checkboxes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),

  logo: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
    })
    .nullable(),
  images: z
    .array(z.instanceof(File))
    .refine((files) =>
      files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
    ),
  about: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),

  deployement: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),
  focusCountries: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),
  accessibility: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),
  adoptionTime: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),
  languages: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),

  usp: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),

  overview: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),

  founderVision: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),

  customerSegment: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),

  industries: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),

  practiceArea: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),

  processLifecycle: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one option.",
  }),
  features: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ProductInformation() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [thumbnailsPreview, setThumbnailsPreview] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkboxes: [],
      customerSegment: [],
      practiceArea: [],
      industries: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setLogoPreview(URL.createObjectURL(file));
      form.setValue("logo", file);
    }
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const thumbnailPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnailsPreview(thumbnailPreviews);
      form.setValue("images", Array.from(files));
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    form.setValue("logo", null as unknown as File);
  };

  const handleRemoveThumbnail = (index: number) => {
    const updatedPreviews = [...thumbnailsPreview];
    updatedPreviews.splice(index, 1);
    setThumbnailsPreview(updatedPreviews);

    const updatedFiles = form.getValues("images").filter((_, i) => i !== index);
    form.setValue("images", updatedFiles);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 font-clarity"
      >
        <FormField
          control={form.control}
          name="productname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter short description ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your short description of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className=" text-sm font-gray-900  mb-2">Select company tags</h3>
          {checkboxItems.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="checkboxes"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter short description ..."
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormDescription>This is your company email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Company name ..." {...field} />
              </FormControl>
              <FormDescription>This is your company name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headQuater"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Headquater</FormLabel>
              <FormControl>
                <Input placeholder="Enter Company name ..." {...field} />
              </FormControl>
              <FormDescription>This is your head quater.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Company number ..." {...field} />
              </FormControl>
              <FormDescription>This is your head quater.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="founders"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founder name</FormLabel>
              <FormControl>
                <Input placeholder="Eg. Rahul,Ranjeev,etc" {...field} />
              </FormControl>
              <FormDescription>This is your Founders names.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foundedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of founding</FormLabel>
              <FormControl>
                <Input placeholder="Eg. 2024" {...field} />
              </FormControl>
              <FormDescription>This is your Founded date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type od Company</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue="profit">
                  <SelectTrigger>
                    <SelectValue placeholder="Type of company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profit">For profit</SelectItem>
                    <SelectItem value="nonprofit">Non Profit</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your Founded date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={handleLogoChange}
                />
              </FormControl>
              {logoPreview && (
                <div className="mt-4">
                  <img
                    src={logoPreview}
                    alt="Selected logo"
                    className="mb-2 max-h-40"
                  />
                  <Button type="button" onClick={handleRemoveLogo}>
                    Remove Image
                  </Button>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Thumbnails</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={handleThumbnailChange}
                  multiple
                />
              </FormControl>
              {thumbnailsPreview.map((thumbnail, index) => (
                <div key={index} className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="mb-2 max-h-40 "
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveThumbnail(index)}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Product</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter more about product ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-gray-900 text-xl font-bold flex gap-2 items-center">
          <span className="border rounded-full border-primary1 p-1 text-2xl">
            <IoIosInformation />
          </span>
          Company Information
        </h2>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select deployement option
          </h3>
          {deploymentOptions.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="deployement"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select focus countries option
          </h3>
          {focusCountriesOptions.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="focusCountries"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select Accessibility option
          </h3>
          {accessibilityOptions.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="accessibility"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select adoptation time option
          </h3>
          {adoptionTimeOptions.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="adoptionTime"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select adoptation time option
          </h3>
          {languagesOption.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="usp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>USP</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter  product USP ..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter  product USP ..." {...field} />
              </FormControl>
              <FormDescription>
                s This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="founderVision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founder Vision</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter  product USP ..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">
            Select Customer Segment
          </h3>
          {customerSegmentItems.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="customerSegment"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">Select Industries</h3>
          {Indusries.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="industries"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">Select Industries</h3>
          {PractiseArea.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="practiceArea"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h3 className=" text-sm font-gray-900  mb-2">Process lifecycle</h3>
          {ProcessLifecycle.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="processLifecycle"
              render={({ field }) => (
                <FormItem className="flex  space-x-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item.id]
                          : (field.value || []).filter(
                              (value) => value !== item.id
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea
                  rows={25}
                  placeholder="Enter features  ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your short description of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
