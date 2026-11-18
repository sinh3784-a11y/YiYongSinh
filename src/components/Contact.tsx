import { useState, type ChangeEvent, type FormEvent } from "react";

import { contactCopy, profile } from "../data/profile";
import CopyEmail from "./CopyEmail";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { sendContactEmail } from "../services/emailService";

import type { ContactData } from "../types/contact";

type FieldName = keyof ContactData;
type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: ContactData = { name: "", email: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

function validate(values: ContactData): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = "Please tell me your name.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter an email address I can reply to.";
  }

  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `A little more detail, please — at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

function Contact() {
  const [values, setValues] = useState<ContactData>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [failureMessage, setFailureMessage] = useState<string | null>(null);

  function handleChange(field: FieldName) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));

      setErrors((previous) => {
        if (!previous[field]) {
          return previous;
        }

        const next = { ...previous };
        delete next[field];

        return next;
      });
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFailureMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setFailureMessage(null);

    try {
        await sendContactEmail({
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim()
        });

        setValues(EMPTY_VALUES);
        setErrors({})
        setStatus("success")

    } catch (err) {
      console.error("EmailJS Error:", err)

      setStatus("error")
      setFailureMessage(
        "That message could not be sent. Please email me directly instead."
      )
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="section contact">
      <Reveal className="contact-layout">
        <div className="contact-info">
          <SectionHeading
            label={contactCopy.label}
            title={contactCopy.title}
            body={contactCopy.body}
          />

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail />
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Based in</span>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="contact-socials">
            <span className="contact-detail-label">
              {contactCopy.detailsLabel}
            </span>

            <ul className="hero-socials" aria-label="Social links">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="social-link"
                    target={social.icon === "email" ? undefined : "_blank"}
                    rel={social.icon === "email" ? undefined : "noreferrer"}
                  >
                    <Icon name={social.icon} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-form-wrap">
          <form className="contact-form" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Ada Lovelace"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="form-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="form-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell me about the project, the role, and the timeline."
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p className="form-error" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>

            {/* One live region for the whole form, so a screen
                            reader hears the outcome once rather than three
                            times. */}
            <div className="form-status" role="status">
              {status === "success" && (
                <p className="form-success">
                  Thanks — that came through. I will reply within a couple of
                  days.
                </p>
              )}

              {failureMessage && <p className="form-error">{failureMessage}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
