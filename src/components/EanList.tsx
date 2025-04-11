'use client';

interface EanListProps {
  items: { code: string; ean: string }[];
}

export default function EanList({ items }: EanListProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4">EANs Gerados</h3>
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg transform transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-300 border-b border-gray-700">
                <th className="pb-2 px-4">Código Interno</th>
                <th className="pb-2 px-4">EAN Gerado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-white">{item.code}</td>
                  <td className="py-3 px-4 text-white font-mono hover:text-blue-400 transition-colors duration-200">
                    {item.ean}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 