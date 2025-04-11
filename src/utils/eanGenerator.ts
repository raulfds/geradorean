import { createHash } from 'crypto';

export function generateInternalEan(code: string): string {
    // Passo 2: Converter o código interno para um número decimal usando SHA-256
    const hash = createHash('sha256').update(code).digest('hex');
    
    // Converter o hash para um número de 9 dígitos
    // Pegar os primeiros 9 caracteres do hash e converter para número
    const nineDigits = hash.substring(0, 9);
    const decimalNumber = parseInt(nineDigits, 16);
    
    // Garantir que temos exatamente 9 dígitos
    const paddedNumber = decimalNumber.toString().padStart(9, '0').substring(0, 9);
    
    // Passo 3: Criar a base do EAN
    const eanBase = "299" + paddedNumber;
    
    // Passo 4: Calcular o dígito verificador (Algoritmo de Luhn)
    const calculateCheckDigit = (ean12: string): number => {
        let soma = 0;
        for (let i = 0; i < ean12.length; i++) {
            const n = parseInt(ean12[i]);
            soma += i % 2 === 0 ? n : n * 3;
        }
        return (10 - (soma % 10)) % 10;
    };
    
    const checkDigit = calculateCheckDigit(eanBase);
    
    // EAN final
    return eanBase + checkDigit.toString();
} 