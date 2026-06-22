'use client';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'input' | 'textarea';
  required?: boolean;
  error?: string;
  rows?: number;
}

export default function FormField({
  label, name, value, onChange, placeholder,
  type = 'textarea', required, error, rows = 4,
}: FormFieldProps) {
  const base = `w-full border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors
    focus:ring-2 focus:ring-brand-500 focus:border-brand-500
    ${error ? 'border-red-500 bg-red-900/20' : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {type === 'input' ? (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
