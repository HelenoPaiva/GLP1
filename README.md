# GLP-1 / Perioperatório

**Referência rápida para avaliação perioperatória · Português / English · v1.1.1**

Aplicativo web independente para profissionais de saúde, organizado em dois momentos: **planejamento pré-operatório** e **dia da cirurgia**. Baseado na nota **C.SBA-01744/2026, de 15 de maio de 2026**, especialmente no fluxograma das páginas 8–9. [Fonte oficial da SBA](https://www.sbahq.org/wp-content/uploads/2026/05/C1744_26.pdf).

**Autoria e manutenção:** Heleno Paiva · [heleno@gmail.com](mailto:heleno@gmail.com)


> Ferramenta independente, sem vínculo ou endosso oficial da SBA e sem validação clínica independente documentada. Apoia a consulta profissional; não substitui avaliação individual, protocolos institucionais ou julgamento clínico. O número da versão identifica o software, não uma atualização automática da recomendação.

## Recursos

| Recurso | Implementação |
|---|---|
| Consulta rápida | Perguntas adaptadas ao ramo escolhido; sem agenda ou campos de data/hora. |
| Duas etapas | Planejamento e avaliação no dia, conectados sem presumir que o plano foi cumprido. |
| Idiomas | Português por padrão; botão EN/PT sem apagar respostas. |
| Interface | Tema escuro, layout responsivo e atalho móvel para o resultado. |
| Rastreabilidade | Resultado acompanhado de justificativa, próximo passo e páginas da fonte. |
| Compartilhamento | Cópia de resumo e impressão em fundo branco. |
| Privacidade | Sem identificação do paciente, conta, anúncios, analytics ou envio de respostas pelo código do app. |
| Distribuição | Um único `index.html`, sem bibliotecas externas, instalação ou compilação. |





## Privacidade e contato

As respostas ficam somente na memória da aba. Recarregar a página apaga a avaliação. Apenas a preferência de idioma é armazenada em `localStorage`, quando permitido pelo navegador.

O código não envia respostas nem faz requisições remotas durante a avaliação. A hospedagem pode manter registros próprios de acesso. Links para SBA/GitHub abrem serviços externos; o link de e-mail abre o cliente de e-mail do usuário. Depois de copiar ou imprimir um resumo, o tratamento desse conteúdo depende de quem o utiliza.

Para manutenção, falhas ou sugestões: **Heleno Paiva — [heleno@gmail.com](mailto:heleno@gmail.com)**. Não envie informações identificáveis de pacientes. O contato é para manutenção do software, não para assistência clínica individual ou situações urgentes.

## Como citar

### Software

> Paiva, H. (2026). *GLP-1 / Perioperatório* (Versão 1.1.1) [Software]. https://github.com/HelenoPaiva/GLP1


### Fonte clínica — citar separadamente

> Sociedade Brasileira de Anestesiologia. *Nota da Sociedade Brasileira de Anestesiologia (SBA) de atualização sobre as recomendações do manejo perioperatório dos agonistas do receptor GLP-1 e coagonistas GLP-1/GIP*. C.SBA-01744/2026. Rio de Janeiro: SBA; 15 maio 2026. Fluxograma: p. 8–9. [Documento oficial](https://www.sbahq.org/wp-content/uploads/2026/05/C1744_26.pdf).

A referência do software atribui crédito à implementação. A referência da SBA identifica a origem clínica. Uma não substitui a outra. O arquivo CFF não usa `preferred-citation` para substituir a autoria do software pela da nota.

## Licença

O código e a documentação original deste projeto são distribuídos sob a **licença MIT**, com **Copyright (c) 2026 Heleno Paiva**. O texto integral está em [LICENSE](LICENSE) e também em um comentário no `index.html`, para acompanhar a distribuição do arquivo autônomo.

A MIT permite reutilização, modificação e distribuição, inclusive comercial, com preservação do aviso de copyright e da licença. A solicitação de citação acadêmica é uma prática de atribuição; não adiciona uma restrição à MIT. [Texto e explicação da licença](https://choosealicense.com/licenses/mit/).

## v1.1.1 — salvaguardas do dia da cirurgia / day-of-surgery safeguards

Atualização de software proposta em **10/11/2026**, não uma nova recomendação da SBA. A fonte clínica permanece **15/05/2026** (itens 6 e 8; fluxograma p. 9).

- Confirmar sintomas gastrointestinais atuais e preparo em ambos os ramos, com e sem POCUS. O planejamento não preenche essas respostas.
- POCUS inicial ou repetido de baixo risco só conduz ao resultado de prosseguimento se o preparo estiver confirmado e não houver sintomas informados. Dados ausentes exigem confirmação; desconhecidos, sintomas presentes ou preparo incompleto exigem revisão clínica individual, sem cancelamento automático nesse ramo.
- Achados ultrassonográficos de alto risco continuam visíveis e acionáveis mesmo com confirmações incompletas. Sem POCUS e com preparo incompleto, preserva-se o adiamento da figura; sem POCUS e com preparo completo, exige-se também revisão negativa de sintomas e confirmação da suspensão planejada.
- Resultados e resumos de cópia/impressão registram o estado das duas confirmações em PT/EN. Alterar o planejamento ou a disponibilidade de POCUS apaga as confirmações do dia.
- Sem mudança em medicamentos, intervalos, limiar de 1,5 mL/kg, referências de jejum ou alerta `short_conflict`. Não há validação clínica independente documentada.

Software safeguard only: low-risk POCUS is not a substitute for fresh symptom and preparation checks. Positive/unknown symptoms or incomplete/unknown preparation require clinician review, not automatic clearance. The existing no-POCUS/incomplete-preparation postponement and high-risk scan pathways are preserved. Clinical source dates and thresholds are unchanged.

### Regression checks

Run `node tests/decision-engine.test.cjs` and `node tests/rendering.test.cjs` (Node.js 18+; no dependencies). The rendering tests use a mock DOM, not a browser. Browser checks: `node tests/browser.test.cjs` (requires Playwright and Chromium installed in the test environment; optionally set `GLP1_CHROMIUM_PATH` to an installed Chromium executable). These tests verify software behavior, not clinical validity.

## English overview

**GLP-1 / Perioperatório** is an independent, bilingual professional reference for preoperative planning and day-of-surgery assessment. It is based on the Brazilian Society of Anesthesiology note dated **15 May 2026**, with the source mapping and software safeguards documented separately. It does not have SBA endorsement or documented independent clinical validation.

The complete app is the single **`index.html`** file. It has a dark interface, Portuguese/English toggle, responsive layout, and copy/print summaries. No scheduling fields, patient accounts, external runtime libraries, or automatic guideline updates are included.

**Author and maintainer:** Heleno Paiva — **heleno@gmail.com**. 

