import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  label?: string;
}

export function PasswordInput({
  value,
  onChange,
  autoComplete = "current-password",
  required = true,
  maxLength = 72,
  placeholder = "••••••••",
  label = "Mot de passe",
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-background/70 py-2.5 pl-9 pr-10 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-ring/40"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? `Masquer ${label.toLowerCase()}` : `Afficher ${label.toLowerCase()}`}
        title={visible ? "Masquer" : "Afficher"}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
      >
        {visible ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}
