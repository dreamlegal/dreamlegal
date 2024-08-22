"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

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

export function ProductInformation2({ onStepData, setFormValid }: any) {
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const formSchema = z.object({
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
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [thumbnailsPreview, setThumbnailsPreview] = useState<string[]>([]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      onStepData(data);
      setFormValid(isValid);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, onStepData, isValid, setFormValid]);

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
      <form className="space-y-8 font-clarity">
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
      </form>
    </Form>
  );
}
