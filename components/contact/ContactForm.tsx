"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  sendContactEmail,
  type ContactFormData,
} from "@/app/actions/sendContactEmail";

const PROJECT_TYPES = [
  "residential",
  "commercial",
  "urban",
  "planning",
  "interior",
  "other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tp = useTranslations("projects");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    const result = await sendContactEmail(data);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-body text-base text-text-primary/80 py-8">
        {t("success")}
      </p>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-border py-3 font-body text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors duration-200";
  const labelClass =
    "block font-body text-xs tracking-[0.2em] uppercase text-text-secondary mb-2";
  const errorClass = "font-body text-xs text-accent mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>{t("name")}</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t("name")}
          className={inputClass}
          {...register("name", { required: t("required") })}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>{t("email")}</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("email")}
          className={inputClass}
          {...register("email", {
            required: t("required"),
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("invalidEmail") },
          })}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>{t("phone")}</label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("phone")}
          className={inputClass}
          {...register("phone")}
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className={labelClass}>{t("projectType")}</label>
        <div className="relative">
          <select
            id="projectType"
            className={`${inputClass} cursor-pointer appearance-none`}
            {...register("projectType", { required: t("required") })}
            defaultValue=""
          >
            <option value="" disabled>{t("selectType")}</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "other" ? t("otherType") : tp(type)}
              </option>
            ))}
          </select>
          {/* Custom dropdown chevron — flips correctly in RTL via logical `end-0` */}
          <span
            aria-hidden="true"
            className="absolute end-0 bottom-3 text-text-secondary pointer-events-none text-xs select-none"
          >
            ▾
          </span>
        </div>
        {errors.projectType && <p className={errorClass}>{errors.projectType.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>{t("message")}</label>
        <textarea
          id="message"
          rows={5}
          placeholder={t("message")}
          className={`${inputClass} resize-none`}
          {...register("message", { required: t("required") })}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <p className="font-body text-xs text-accent">{t("error")}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start font-body text-xs tracking-[0.25em] uppercase text-text-primary border border-border px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? t("submitting") : t("send")}
      </button>
    </form>
  );
}
