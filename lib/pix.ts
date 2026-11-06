// lib/pix.ts - Gerador de payload PIX EMV / QR Code
export function calcularCRC16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

interface PixParams {
  chave: string;
  nome: string;
  cidade: string;
  valor: number;
  txid?: string;
}

export function gerarPayloadPix({ chave, nome, cidade, valor, txid = '***' }: PixParams): string {
  const formatTLV = (id: string, val: string) => {
    const len = val.length.toString().padStart(2, '0');
    return `${id}${len}${val}`;
  };

  const nomeSanitizado = nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .substring(0, 25)
    .toUpperCase();
  const cidadeSanitizada = cidade
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .substring(0, 15)
    .toUpperCase();
  const valorFormatado = parseFloat(String(valor)).toFixed(2);

  const gui = formatTLV('00', 'BR.GOV.BCB.PIX');
  const key = formatTLV('01', chave);
  const merchantAccount = formatTLV('26', gui + key);
  const additionalData = formatTLV('62', formatTLV('05', txid));

  let payload = [
    formatTLV('00', '01'),
    merchantAccount,
    formatTLV('52', '0000'),
    formatTLV('53', '986'),
    formatTLV('54', valorFormatado),
    formatTLV('58', 'BR'),
    formatTLV('59', nomeSanitizado),
    formatTLV('60', cidadeSanitizada),
    additionalData,
  ].join('');

  payload += '6304';
  const crc16 = calcularCRC16(payload);

  return payload + crc16;
}
