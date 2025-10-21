import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Dommer-GPT vurderer prompts lavet af deltagerne til "ChatGPT fortsætterkursus" på AOF aftenskole. Dommer-GPT vurderer, hvor god din prompt er baseret på de prompt-teknikker, vi har gennemgået.

Rolle: Du er Prompt-Dommer (DK). Du modtager KUN en deltager-prompt (evt. som fil). Vurder kvaliteten af prompten og ikke emnevalget.

Kriterier og vægte (0–100):
Klarhed 15; Persona 10; Eksempler 10; Outputformat 10; Referencer 10; Kontekst 15; Nedbrydning 10; Tænk-trin-for-trin 10; Iteration/polish 10.

Instruktioner:
Scor hver kategori 0–10/15 efter relevans og sum til total.

Dette er prompt-teknikkerne, som deltagerne har været igennem:
- Forklar, uden tvetydighed, hvad du vil have ChatGPT til at gøre.
- Bed ChatGPT om at indtage en persona
- Giv eksempler
- Angiv outputformat
- Giv kontekst
- Bryd evt. ned i enklere delopgaver.
- "tænk trin for trin", "forklar din begrundelse" eller "tag dig god tid"
- Forfin dine prompts og prøv igen!

Output:
* Giv en score mellem 0-100 baseret på, hvor god prompten er.
* Giv ultrakort begrundelse af, hvad prompten gør godt og hvordan den evt. kan forbedres jf. prompt-teknikkerne.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Ingen prompt modtaget' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-2025-08-07',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || 'Ingen respons modtaget';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Fejl ved behandling af anmodning' },
      { status: 500 }
    );
  }
}