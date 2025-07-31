'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ShadCN toast
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Textarea } from "@/components/ui/textarea"; // ShadCN Textarea
import { Label } from "@/components/ui/label"; // ShadCN Label



export default function VerifyPage() {
  // Protect page (replace with your actual admin check)

  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    email: "",
    reason: "",
    idPhoto: null as File | null,
    selfie: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("nationalId", form.nationalId);
    data.append("phone", form.phone);
    data.append("email", form.email);
    data.append("reason", form.reason);
    if (form.idPhoto) data.append("idPhoto", form.idPhoto);
    if (form.selfie) data.append("selfie", form.selfie);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        toast.success("Verification submitted!");
        setForm({
          fullName: "",
          nationalId: "",
          phone: "",
          email: "",
          reason: "",
          idPhoto: null,
          selfie: null,
        });
        router.refresh();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-2 text-center">Verification Submission</h1>
      <p className="text-gray-500 text-center mb-6 text-sm">Fill in the details below to submit a manual verification request. All fields marked <span className='text-red-500'>*</span> are required.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="e.g. Amina Yusuf"
            className="mt-1"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="nationalId">National ID / Fayda ID <span className="text-red-500">*</span></Label>
          <Input
            id="nationalId"
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            required
            placeholder="e.g. 1234567890"
            className="mt-1"
            autoComplete="off"
          />
          <p className="text-xs text-gray-400 mt-1">Enter the user's government-issued ID or Fayda number.</p>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="e.g. +251912345678"
            type="tel"
            className="mt-1"
            autoComplete="tel"
          />
        </div>
        <div>
          <Label htmlFor="email">Email <span className="text-gray-400">(optional)</span></Label>
          <Input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. user@email.com"
            type="email"
            className="mt-1"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="reason">Reason for Verification <span className="text-red-500">*</span></Label>
          <Textarea
            id="reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            placeholder="Why is this verification needed?"
            className="mt-1 min-h-[80px]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="idPhoto">Upload ID Photo <span className="text-red-500">*</span></Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
              <Input
                id="idPhoto"
                name="idPhoto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full cursor-pointer"
              />
              <span className="text-xs text-gray-400 mt-2">Accepted: JPG, PNG, PDF</span>
              {form.idPhoto && (
                <span className="text-xs text-green-600 mt-1">Selected: {form.idPhoto.name}</span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="selfie">Upload Selfie <span className="text-red-500">*</span></Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
              <Input
                id="selfie"
                name="selfie"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full cursor-pointer"
              />
              <span className="text-xs text-gray-400 mt-2">Take a clear selfie holding the ID</span>
              {form.selfie && (
                <span className="text-xs text-green-600 mt-1">Selected: {form.selfie.name}</span>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full mt-4 font-semibold text-base py-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Submitting...
            </span>
          ) : (
            "Submit Verification"
          )}
        </Button>
      </form>
    </div>
  );
}
