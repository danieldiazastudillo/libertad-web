import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "./Input";

export interface RsvpFormProps {
  nameLabel: string;
  namePlaceholder: string;
  lodgeLabel: string;
  lodgePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

export function RsvpForm({
  nameLabel,
  namePlaceholder,
  lodgeLabel,
  lodgePlaceholder,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  successMessage,
}: RsvpFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {submitted ? (
        <p className="rsvp-success">{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          <Input label={nameLabel} placeholder={namePlaceholder} required />
          <Input label={lodgeLabel} placeholder={lodgePlaceholder} />
          <Input label={emailLabel} type="email" placeholder={emailPlaceholder} required />
          <button type="submit" className="rsvp-submit">{submitLabel}</button>
        </form>
      )}
      <style>{`
        .rsvp-form { display: flex; flex-direction: column; gap: var(--space-5); }
        .rsvp-success { text-align: center; font: var(--font-body-lg); color: var(--text-accent-gold); }
        .rsvp-submit {
          font-family: var(--font-display);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          font-weight: 500;
          font-size: var(--text-sm);
          padding: 16px 40px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          background: var(--action-primary-bg);
          color: var(--action-primary-text);
          border: 1px solid var(--action-primary-border);
          transition: background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
        }
        .rsvp-submit:hover, .rsvp-submit:focus-visible {
          background: var(--action-primary-bg-hover);
        }
      `}</style>
    </>
  );
}
