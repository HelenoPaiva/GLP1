# GLP-1 / Perioperatório

**Referência rápida para avaliação perioperatória · Português / English · v1.0.1**

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

> Paiva, H. (2026). *GLP-1 / Perioperatório* (Versão 1.0.1) [Software]. https://github.com/HelenoPaiva/GLP1

O arquivo [CITATION.cff](CITATION.cff) contém os metadados para a opção **“Cite this repository”** do GitHub, quando colocado na branch padrão. O arquivo [CITATION.bib](CITATION.bib) oferece as entradas do software e da nota da SBA. [Documentação oficial de citações no GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files).

### Fonte clínica — citar separadamente

> Sociedade Brasileira de Anestesiologia. *Nota da Sociedade Brasileira de Anestesiologia (SBA) de atualização sobre as recomendações do manejo perioperatório dos agonistas do receptor GLP-1 e coagonistas GLP-1/GIP*. C.SBA-01744/2026. Rio de Janeiro: SBA; 15 maio 2026. Fluxograma: p. 8–9. [Documento oficial](https://www.sbahq.org/wp-content/uploads/2026/05/C1744_26.pdf).

A referência do software atribui crédito à implementação. A referência da SBA identifica a origem clínica. Uma não substitui a outra. O arquivo CFF não usa `preferred-citation` para substituir a autoria do software pela da nota.

## Licença

O código e a documentação original deste projeto são distribuídos sob a **licença MIT**, com **Copyright (c) 2026 Heleno Paiva**. O texto integral está em [LICENSE](LICENSE) e também em um comentário no `index.html`, para acompanhar a distribuição do arquivo autônomo.

A MIT permite reutilização, modificação e distribuição, inclusive comercial, com preservação do aviso de copyright e da licença. A solicitação de citação acadêmica é uma prática de atribuição; não adiciona uma restrição à MIT. [Texto e explicação da licença](https://choosealicense.com/licenses/mit/).

A licença não pretende relicenciar a nota da SBA, logotipos ou outros materiais externos. Consulte [NOTICE.md](NOTICE.md). O PDF da SBA não está redistribuído no pacote; são fornecidos links e referência.


## English overview

**GLP-1 / Perioperatório** is an independent, bilingual professional reference for preoperative planning and day-of-surgery assessment. It is based on the Brazilian Society of Anesthesiology note dated **15 May 2026**, with the source mapping and software safeguards documented separately. It does not have SBA endorsement or documented independent clinical validation.

The complete app is the single **`index.html`** file. It has a dark interface, Portuguese/English toggle, responsive layout, and copy/print summaries. No scheduling fields, patient accounts, external runtime libraries, or automatic guideline updates are included.

**Author and maintainer:** Heleno Paiva — **heleno@gmail.com**. The GitHub profile link is a temporary placeholder; replace it with the final repository URL in the app configuration and software citation metadata. Code and original documentation are MIT-licensed; external clinical sources retain their own rights. Cite the software and the underlying SBA note separately.
