import type { ChangeEvent } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

/** Single-line text field for RSVP / correspondence forms. Underline style, not boxed — matches the brand's flat, unboxed formality. */
export function Input({ label, placeholder, type = "text", value, onChange, required = false }: InputProps) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontFamily: "var(--font-serif)" }}>
      {label && (
        <span style={{ fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-on-dark-muted)" }}>
          {label}{required ? " *" : ""}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--border-on-dark-strong)",
          color: "var(--text-on-dark-primary)",
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-sm)",
          padding: "8px 2px",
          outline: "none",
        }}
      />
    </label>
  );
}
