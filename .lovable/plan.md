# Plano de Implementação - Melhorias Premium Barbearia Sá Ferreira

Implementação de um sistema de carrossel para avaliações, animações ricas no rodapé e rastreamento de conversão para o agendamento.

## Alterações Propostas

### 🎨 UI & Animações
- **Carrossel de Avaliações**: Substituir a grade estática de depoimentos por um carrossel interativo usando `framer-motion` para transições suaves.
- **Animações no Rodapé**: Adicionar efeitos de hover mais elaborados (deslocamento, mudança de cor e sublinhado animado) nos links do footer.
- **Feedback de Conversão**: Adicionar um efeito visual e feedback sonoro (opcional, via toast) ao clicar em botões de agendamento para reforçar a ação de conversão.

### ⚙️ Funcionalidades & Rastreamento
- **Métricas de Conversão**: Implementar uma função centralizada para rastrear cliques em botões de agendamento (usando `console.log` para simular analytics e `sonner` para feedback visual).
- **Controle do Carrossel**: Adicionar botões de navegação e indicadores de página para o carrossel de depoimentos.

## Detalhes Técnicos

- **Componente**: `src/routes/index.tsx`
- **Hooks**: `useState`, `useEffect` para o autoplay do carrossel.
- **Framer Motion**: `AnimatePresence` e `drag` para suporte a toque/arraste no carrossel.

---

### 📊 Relatório de Planejamento

- 🎨 **UI Architect** — Preparado para implementar carrossel e hover effects.
- 🔍 **Code Auditor** — Garantirá que as animações não impactem a performance.
- 📈 **SEO Optimizer** — Verificará se os links do rodapé mantêm acessibilidade.
