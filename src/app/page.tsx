'use client';

import { useState } from 'react';
import EanGenerator from '@/components/EanGenerator';
import EanList from '@/components/EanList';
import { generateInternalEan } from '@/utils/eanGenerator';
import * as XLSX from 'xlsx';

export default function Home() {
  const [items, setItems] = useState<{ code: string; ean: string }[]>([]);

  const generateEan = (codes: string[]) => {
    const newItems = codes.map(code => ({
      code,
      ean: generateInternalEan(code)
    }));
    setItems(newItems);
  };

  const exportToExcel = () => {
    if (items.length === 0) return;

    // Criar a planilha
    const ws = XLSX.utils.json_to_sheet(
      items.map(item => ({
        'Código Interno': item.code,
        'EAN Gerado': item.ean
      }))
    );

    // Criar o workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EANs");

    // Gerar o arquivo
    XLSX.writeFile(wb, "EANs_gerados.xlsx");
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Gerador de EANs Genéricos
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <p className="text-gray-300">
            Este gerador cria EANs genéricos para fins de organização interna.
            Os códigos gerados seguem o padrão:
          </p>
        </div>
        <EanGenerator onGenerate={generateEan} />
        {items.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Exportar para Excel
            </button>
          </div>
        )}
        <EanList items={items} />
      </div>
    </main>
  );
}
