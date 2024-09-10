"use client";
import { ChangeEvent, useState } from 'react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useProductInfoStore } from '@/store/useStore';

const ProductSAndS = () => {
  const { demo, support, training, storage, fileSize, setDemo, setSupport, setTraining, setStorage, setFileSize } = useProductInfoStore();
  const [inputDemo, setInputDemo] = useState<string[]>(demo);
  const [inputSupport, setInputSupport] = useState<string[]>(support);
  const [inputTraining, setInputTraining] = useState<string[]>(training);
  const [inputStorage, setInputStorage] = useState<number | ''>(storage ?? '');
  const [inputFileSize, setInputFileSize] = useState<number | ''>(fileSize ?? '');
  const [storageUnit, setStorageUnit] = useState<string>("GB");
  const [fileSizeUnit, setFileSizeUnit] = useState<string>("KB");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate all fields
  const validateAllFields = () => {
    const errors: Record<string, string> = {};
    if (inputDemo.length === 0) errors.demo = "Demo selection is required";
    if (inputSupport.length === 0) errors.support = "Support selection is required";
    if (inputTraining.length === 0) errors.training = "Training selection is required";
    if (inputStorage === '' || Number(inputStorage) <= 0) errors.storage = "Storage must be a positive number";
    if (inputFileSize === '' || Number(inputFileSize) <= 0) errors.fileSize = "File size must be a positive number";
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle change events and update state
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'storage') {
      setInputStorage(value ? Number(value) : '');
    } else if (name === 'fileSize') {
      setInputFileSize(value ? Number(value) : '');
    }
  };

  const handleCheckboxChange = (name: string, value: string) => {
    switch (name) {
      case 'demo':
        setInputDemo(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        break;
      case 'support':
        setInputSupport(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        break;
      case 'training':
        setInputTraining(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return; // Stop form submission if there are validation errors
    }

    // Set the validated values to state
    setDemo(inputDemo);
    setSupport(inputSupport);
    setTraining(inputTraining);
    setStorage(inputStorage);
    setFileSize(inputFileSize);

    // Proceed with the form submission logic
    console.log('Form submitted with:', {
      demo: inputDemo,
      support: inputSupport,
      training: inputTraining,
      storage: inputStorage,
      fileSize: inputFileSize,
      storageUnit,
      fileSizeUnit,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mt-2">
        <Label htmlFor="demo">Demo</Label>
        {[
          "Self-demo",
          "Customised prototypes",
          "Guided walkthrough",
          "Video demos",
          "None",
        ].map((item) => (
          <div key={item} className="items-top flex space-x-2 mt-2">
            <Input
              name="demo"
              type="checkbox"
              value={item}
              checked={inputDemo.includes(item)}
              onChange={() => handleCheckboxChange('demo', item)}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium leading-none">{item}</label>
          </div>
        ))}
        <Textarea
          name="demoNote"
          placeholder="Note (optional)"
          value={formValues.demoNote || ''}
          onChange={(e) => setFormValues(prev => ({ ...prev, demoNote: e.target.value }))}
        />
      </div>

      <div className="mt-2">
        <Label htmlFor="support">Support</Label>
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
              checked={inputSupport.includes(item)}
              onChange={() => handleCheckboxChange('support', item)}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium leading-none">{item}</label>
          </div>
        ))}
        <Textarea
          name="supportNote"
          placeholder="Note (optional)"
          value={formValues.supportNote || ''}
          onChange={(e) => setFormValues(prev => ({ ...prev, supportNote: e.target.value }))}
        />
      </div>

      <div className="mt-2">
        <Label htmlFor="training">Training</Label>
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
              checked={inputTraining.includes(item)}
              onChange={() => handleCheckboxChange('training', item)}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium leading-none">{item}</label>
          </div>
        ))}
        <Textarea
          name="trainingNote"
          placeholder="Note (optional)"
          value={formValues.trainingNote || ''}
          onChange={(e) => setFormValues(prev => ({ ...prev, trainingNote: e.target.value }))}
        />
      </div>

      <div className="mt-2">
        <Label htmlFor="storage">Storage</Label>
        <div className="flex gap-4">
          <Input
            name="storage"
            type="text"
            placeholder="Storage"
            value={inputStorage ?? ''}
            onChange={handleChange}
            required
          />
          <Select
            value={storageUnit}
            onValueChange={setStorageUnit}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Storage Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KB">KB</SelectItem>
              <SelectItem value="MB">MB</SelectItem>
              <SelectItem value="GB">GB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          name="storageNote"
          placeholder="Note (optional)"
          value={formValues.storageNote || ''}
          onChange={(e) => setFormValues(prev => ({ ...prev, storageNote: e.target.value }))}
        />
      </div>

      <div className="mt-2">
        <Label htmlFor="fileSize">File upload limit</Label>
        <div className="flex gap-4">
          <Input
            name="fileSize"
            type="text"
            placeholder="File size"
            value={inputFileSize ?? ''}
            onChange={handleChange}
            required
          />
          <Select
            value={fileSizeUnit}
            onValueChange={setFileSizeUnit}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="File Size Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KB">KB</SelectItem>
              <SelectItem value="MB">MB</SelectItem>
              <SelectItem value="GB">GB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          name="fileSizeNote"
          placeholder="Note (optional)"
          value={formValues.fileSizeNote || ''}
          onChange={(e) => setFormValues(prev => ({ ...prev, fileSizeNote: e.target.value }))}
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
        <Button type="submit" className="bg-primary1" disabled={loading}>
          {loading ? "Saving" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default ProductSAndS;
