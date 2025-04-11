'use client';

import { useState } from 'react';

interface EanGeneratorProps {
  onGenerate: (codes: string[]) => void;
}

export default function EanGenerator({ onGenerate }: EanGeneratorProps) {
  const [codes, setCodes] = useState('');

  const handleGenerate = () => {
    if (codes.trim()) {
      // Separar os códigos por ponto e vírgula e remover espaços em branco
      const codeList = codes.split(';').map(code => code.trim()).filter(code => code);
      onGenerate(codeList);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
    
      <p className="text-gray-300">
        Este gerador cria EANs genéricos para fins de organização interna.
        Os códigos gerados não são válidos para uso comercial.
      </p>
      <div className="flex flex-col gap-2">
        <label htmlFor="codes" className="text-white">
          Códigos Internos (separados por ;):
        </label>
        <textarea
          id="codes"
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
          placeholder="Ex: COD001; COD002; COD003"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
        Gerar EANs
      </button>
    </div>
  );
} 