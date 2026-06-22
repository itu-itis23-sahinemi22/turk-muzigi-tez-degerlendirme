'use client';
import { useState } from 'react';
import FormField from './FormField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ProposalInput } from '@/lib/types';

interface ProposalFormProps {
  onSubmit: (data: ProposalInput) => void;
  isLoading: boolean;
}

const EMPTY: ProposalInput = {
  title: '',
  problemStatement: '',
  researchPurpose: '',
  proposedMethod: '',
};

type Errors = Partial<Record<keyof ProposalInput, string>>;

export default function ProposalForm({ onSubmit, isLoading }: ProposalFormProps) {
  const [form, setForm] = useState<ProposalInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  function set(field: keyof ProposalInput) {
    return (value: string) => {
      setForm(f => ({ ...f, [field]: value }));
      if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
    };
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    const required: { key: keyof ProposalInput; label: string; min: number }[] = [
      { key: 'title', label: 'Araştırmanın konusu', min: 5 },
      { key: 'proposedMethod', label: 'Yöntem', min: 5 },
    ];
    for (const { key, label, min } of required) {
      if (!form[key] || form[key].trim().length < min) {
        newErrors[key] = `${label} en az ${min} karakter olmalıdır.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-slate-100">Araştırma Önerisi</h2>
        <p className="text-sm text-slate-400 mt-0.5">Konu ve yöntem alanları zorunludur. Diğer alanlar değerlendirme kalitesini artırır.</p>
      </div>

      <FormField
        label="Araştırmanın Konusu"
        name="title"
        type="input"
        value={form.title}
        onChange={set('title')}
        placeholder="Örn: Rast Makamının İlkokul Müzik Eğitiminde Kullanımı"
        required
        error={errors.title}
      />
      <FormField
        label="Problem Durumu"
        name="problemStatement"
        value={form.problemStatement}
        onChange={set('problemStatement')}
        placeholder="Araştırmanın çözmeye çalıştığı problemi ve bu problemi ortaya çıkaran durumu açıklayın..."
        error={errors.problemStatement}
        rows={4}
      />
      <FormField
        label="Amacı"
        name="researchPurpose"
        value={form.researchPurpose}
        onChange={set('researchPurpose')}
        placeholder="Bu araştırmanın genel ve özel amaçlarını belirtin..."
        error={errors.researchPurpose}
        rows={3}
      />
      <FormField
        label="Yöntem"
        name="proposedMethod"
        value={form.proposedMethod}
        onChange={set('proposedMethod')}
        placeholder="Örn: Analitik inceleme yöntemi — nota çözümlemesi ve doküman incelemesi..."
        required
        error={errors.proposedMethod}
        rows={3}
      />

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-brand-700 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
        >
          Değerlendirmeyi Başlat
        </button>
        {isLoading && <LoadingSpinner message="Analiz ediliyor..." />}
      </div>
    </form>
  );
}
