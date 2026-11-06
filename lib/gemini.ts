// lib/gemini.ts - Integração com Gemini AI para análise facial e corporal
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface AnaliseIA {
  metricas: {
    papada: number;
    rugas_testa: number;
    flacidez_contorno: number;
    simetria_facial: number;
    hidratacao_pele: number;
    tom_pele: string;
    manchas: number;
  };
  plano: string[];
  descricao_detalhada: string;
  observacoes_corporais?: string;
}

export async function analisarImagemFacial(
  imageBase64: string,
  mimeType: string,
  imcAtual: number,
  metaPerda: number,
  postura: string = 'frontal'
): Promise<AnaliseIA> {
  const prompt = `Você é um sistema especialista em análise estética para uma clínica de SPA (SPA Ana Paula Merêncio).
Analise a imagem fornecida de forma ${postura === 'frontal' ? 'frontal do rosto' : postura === 'lateral' ? 'do perfil do rosto' : 'do colo e pescoço'} do paciente.

Dados clínicos:
- IMC atual: ${imcAtual.toFixed(1)}
- Meta de perda de peso: ${metaPerda} kg

Retorne APENAS um JSON (sem markdown, sem \`\`\`) com EXATAMENTE este formato:
{
  "metricas": {
    "papada": 0.0,
    "rugas_testa": 0.0,
    "flacidez_contorno": 0.0,
    "simetria_facial": 0.0,
    "hidratacao_pele": 0.0,
    "tom_pele": "string",
    "manchas": 0.0
  },
  "plano": ["array de strings"],
  "descricao_detalhada": "string em português",
  "observacoes_corporais": "string"
}

Seja profissional, clínico e ético. Foque em procedimentos estéticos como toxina botulínica, preenchedores, bioestimuladores, limpeza de pele e tratamentos de spa.`;

  try {
    const interaction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: [
        {
          type: 'image' as const,
          data: imageBase64,
          mime_type: mimeType,
        },



        { type: 'text', text: prompt },
      ],
      store: false,
    });

    const text = interaction.output_text || '';
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
      return JSON.parse(jsonText) as AnaliseIA;
    } catch {
      return fallbackAnalise(imcAtual, metaPerda, text);
    }
  } catch (err) {
    console.error('Erro na API Gemini:', err);
    return fallbackAnalise(imcAtual, metaPerda, '');
  }
}

export async function analisarImagemCorporal(
  imageBase64: string,
  mime_type: string,
  imcAtual: number,
  metaPerda: number
): Promise<AnaliseIA> {
  const prompt = `Você é um sistema especialista em análise corporal para uma clínica de SPA.
Analise a imagem corporal do paciente.

Dados clínicos:
- IMC: ${imcAtual.toFixed(1)}
- Meta de perda: ${metaPerda} kg

Retorne APENAS um JSON (sem markdown) com este formato exato:
{
  "metricas": {
    "papada": 0.0,
    "rugas_testa": 0.0,
    "flacidez_contorno": 0.0,
    "simetria_facial": 0.0,
    "hidratacao_pele": 0.0,
    "tom_pele": "string",
    "manchas": 0.0
  },
  "plano": ["procedimentos corporais"],
  "descricao_detalhada": "análise em português",
  "observacoes_corporais": "análise detalhada do corpo"
}`;

  try {
    const interaction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: [
        {
          type: 'image' as const,
          data: imageBase64,
          mime_type: mime_type,
        },
      { type: 'text', text: prompt },
      ],
      store: false,
    });

    const text = interaction.output_text || '';
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
      return JSON.parse(jsonText) as AnaliseIA;
    } catch {
      return fallbackCorpo(imcAtual, metaPerda, text);
    }
  } catch (err) {
    console.error('Erro na API Gemini:', err);
    return fallbackCorpo(imcAtual, metaPerda, '');
  }
}

function fallbackAnalise(imcAtual: number, metaPerda: number, text: string): AnaliseIA {
  const imcFactor = Math.max(0, (imcAtual - 24) / 12);
  return {
    metricas: {
      papada: Math.min(1, 0.35 + imcFactor * 0.5),
      rugas_testa: 0.6,
      flacidez_contorno: Math.max(0.15, 0.7 - imcFactor * 0.4),
      simetria_facial: 0.85,
      hidratacao_pele: 0.65,
      tom_pele: 'Médio',
      manchas: 0.3,
    },
    plano: [
      'Toxina Botulínica — terço superior',
      ...(imcFactor > 0.3 ? ['Redução de papada (Criolipólise)'] : []),
      ...(metaPerda >= 8 ? ['Encaminhamento nutricional (Meta alta)'] : []),
      'Hidratação profunda facial',
    ],
    descricao_detalhada: text || 'Análise realizada com base nos dados clínicos fornecidos.',
    observacoes_corporais: '',
  };
}

function fallbackCorpo(imcAtual: number, metaPerda: number, text: string): AnaliseIA {
  const imcFactor = Math.max(0, (imcAtual - 24) / 12);
  return {
    metricas: {
      papada: 0,
      rugas_testa: 0,
      flacidez_contorno: Math.min(1, 0.3 + imcFactor * 0.5),
      simetria_facial: 0,
      hidratacao_pele: 0.7,
      tom_pele: 'Médio',
      manchas: 0.2,
    },
    plano: [
      ...(metaPerda > 0 ? [`Programa de emagrecimento — meta: ${metaPerda}kg`] : []),
      'Drenagem linfática corporal',
      'Tratamento de celulite',
      ...(imcFactor > 0.5 ? ['Criolipólise em áreas localizadas'] : []),
    ],
    descricao_detalhada: text || 'Análise corporal com base nos dados fornecidos.',
    observacoes_corporais: text || '',
  };
}
