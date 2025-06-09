import MDEditor, {
  MDEditorProps,
  ICommand,
  commands,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import 'katex/dist/katex.css';

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

const insertFraction: ICommand = {
    name: "fraction",
    keyCommand: "fraction",
    buttonProps: {"aria-label": "Inserta una fracción", "title": "Inserta una fracción"},
    icon:  <svg width="3.4520421mm" height="4.5184016mm" viewBox="0 0 3.4520421 4.5184016" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-24.478272,-48.871321)"><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.282678,strokeLinecap:"round",strokeDasharray:"none"}} id="rect1" width="1.6168656" height="1.4600458" x="25.395861" y="49.012661"/><path style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.3,strokeLinecap:"square",strokeDasharray:"none"}} d="m 24.573386,51.106998 c 1.050681,0 2.101363,0 3.152042,0" id="path1" transform="translate(0.05488691)"/><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.282678,strokeLinecap:"round",strokeDasharray:"none"}} id="rect2" width="1.6168656" height="1.4600458" x="25.395861" y="51.788338"/></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`\\frac{}{ }`);
        const cursorPos = state.selection.start + "\\frac{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}

const insertSuperscript: ICommand = {
    name: "superscript",
    keyCommand: "superscript",
    buttonProps: {"aria-label": "Inserta un superíndice", "title": "Inserta un superíndice"},
    icon: <svg width="3.1749272mm" height="3.2322884mm" viewBox="0 0 3.1749272 3.2322884" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-29.614064,-49.124484)"><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.3,strokeLinecap:"round",strokeDasharray:"none"}} id="rect3" width="1.599544" height="1.6622695" x="29.764063" y="50.544502"/><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.274,strokeLinecap:"round",strokeDasharray:"none"}} id="rect4" width="0.92608219" height="0.96239805" x="31.725908" y="49.261486"/></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`_{}`);
        const cursorPos = state.selection.start + "_{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}

const insertSubscript: ICommand = {
    name: "subscript",
    keyCommand: "subscript",
    buttonProps: {"aria-label": "Inserta un subíndice", "title": "Inserta un subíndice"},
    icon: <svg width="3.3787928mm" height="2.7420607mm" viewBox="0 0 3.3787928 2.7420607" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-33.738377,-50.394503)"><rect id="rect5" width="1.599544" height="1.6622695" x="33.888378" y="50.544502" style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.3,strokeLinecap:"round",strokeDasharray:"none"}} /><rect id="rect6" width="0.92608219" height="0.96239805" x="36.054089" y="52.037163" style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.274,strokeLinecap:"round",strokeDasharray:"none"}} /></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`^{}`);
        const cursorPos = state.selection.start + "^{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}


const insertSqrt: ICommand = {
    name: "sqrt",
    keyCommand: "sqrt",
    buttonProps: {"aria-label": "Inserta un radical", "title": "Inserta un radical"},
    icon: <svg width="3.3560228mm" height="2.0005159mm" viewBox="0 0 3.3560228 2.0005159" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-27.375058,-54.779372)"><path id="path11" d="m 27.501949,55.566943 h 0.654233 l 0.350535,1.085794 0.191765,-5.4e-4 0.353364,-1.745934 h 1.552345" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.253781, strokeLinecap:"square", strokeDasharray:"none"}} /></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`\\sqrt{}`);
        const cursorPos = state.selection.start + "\\sqrt{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}


const insertNSqrt: ICommand = {
    name: "nsqrt",
    keyCommand: "nsqrt",
    buttonProps: {"aria-label": "Inserta una raíz", "title": "Inserta una sumatoria"},
    icon: <svg width="3.2540891mm" height="2.3277204mm" viewBox="0 0 3.2540891 2.3277204" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-32.192544,-55.228377)"><rect id="rect10" width="0.49016896" height="0.50939071" x="32.458534" y="55.300888" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.145026, strokeLinecap:"round", strokeDasharray:"none"}} /><path id="path12" d="m 32.319434,56.343153 h 0.654233 l 0.350535,1.085794 0.191765,-5.4e-4 0.353364,-1.745934 h 1.450413" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.253781, strokeLinecap:"square", strokeDasharray:"none"}} /></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`\\sqrt[]{ }`);
        const cursorPos = state.selection.start + "\\sqrt[".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}

const insertSum: ICommand = {
    name: "sum",
    keyCommand: "sum",
    buttonProps: {"aria-label": "Inserta una sumatoria", "title": "Inserta una sumatoria"},
    icon: <svg width="2.4939024mm" height="3.1093266mm" viewBox="0 0 2.4939024 3.1093266" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-25.065278,-57.283091)"><path id="path13" d="m 27.391573,57.752839 0.0098,-0.316748 h -2.033012 l 1.068513,1.447727 -0.973954,1.355598 h 1.900628 v -0.37497" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.306, strokeLinecap:"square", strokeDasharray:"none"}} /></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`\\sum_{}^{ }`);
        const cursorPos = state.selection.start + "\\sum_{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}


const insertProd: ICommand = {
    name: "product",
    keyCommand: "product",
    buttonProps: {"aria-label": "Inserta una productoria", "title": "Inserta una productoria"},
    icon: <svg width="2.7131157mm" height="3.0067973mm" viewBox="0 0 2.7131157 3.0067973" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-28.378773,-57.334379)"><path id="path14" d="m 28.954024,57.662904 -0.01558,2.530685 h 0.508453 -0.836135" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.295179, strokeLinecap:"square", strokeDasharray:"none"}} /><path id="path15" d="m 28.520784,57.47639 h 2.429094" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.284022, strokeLinecap:"square", strokeDasharray:"none"}} /><path id="path16" d="m 30.584594,57.662904 -0.01558,2.530685 h 0.508454 -0.836136" style={{fill:"#ffeab4", fillOpacity:0, stroke:"#000", strokeWidth:0.295179, strokeLinecap:"square", strokeDasharray:"none"}} /></g></svg>,
    execute: (state: TextState, api: TextAreaTextApi) => {
        api.replaceSelection(`\\prod_{}^{ }`);
        const cursorPos = state.selection.start + "\\prod_{".length;

        api.setSelectionRange({start: cursorPos, end: cursorPos});
    }
}


const insertGreekLetters: ICommand = {
  name: "greek",
  keyCommand: "greek",
  icon: <span style={{ fontWeight: "bold", fontSize: 14 }}>Ω</span>,
  buttonProps: { "aria-label": "Letras griegas", title: "Letras griegas" },
  execute: (state: TextState, api: TextAreaTextApi) => {
    const greekLetters = [
      { symbol: 'α', latex: '\\alpha' },
      { symbol: 'β', latex: '\\beta' },
      { symbol: 'γ', latex: '\\gamma' },
      { symbol: 'δ', latex: '\\delta' },
      { symbol: 'ε', latex: '\\epsilon' },
      { symbol: 'ζ', latex: '\\zeta' },
      { symbol: 'η', latex: '\\eta' },
      { symbol: 'θ', latex: '\\theta' },
      { symbol: 'ι', latex: '\\iota' },
      { symbol: 'κ', latex: '\\kappa' },
      { symbol: 'λ', latex: '\\lambda' },
      { symbol: 'μ', latex: '\\mu' },
      { symbol: 'ν', latex: '\\nu' },
      { symbol: 'ξ', latex: '\\xi' },
      { symbol: 'π', latex: '\\pi' },
      { symbol: 'ρ', latex: '\\rho' },
      { symbol: 'σ', latex: '\\sigma' },
      { symbol: 'τ', latex: '\\tau' },
      { symbol: 'υ', latex: '\\upsilon' },
      { symbol: 'φ', latex: '\\phi' },
      { symbol: 'χ', latex: '\\chi' },
      { symbol: 'ψ', latex: '\\psi' },
      { symbol: 'ω', latex: '\\omega' },
      { symbol: 'Γ', latex: '\\Gamma' },
      { symbol: 'Δ', latex: '\\Delta' },
      { symbol: 'Θ', latex: '\\Theta' },
      { symbol: 'Λ', latex: '\\Lambda' },
      { symbol: 'Ξ', latex: '\\Xi' },
      { symbol: 'Π', latex: '\\Pi' },
      { symbol: 'Σ', latex: '\\Sigma' },
      { symbol: 'Υ', latex: '\\Upsilon' },
      { symbol: 'Φ', latex: '\\Phi' },
      { symbol: 'Ψ', latex: '\\Psi' },
      { symbol: 'Ω', latex: '\\Omega' }
    ];

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = "9999";
    container.style.backgroundColor = "white";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "6px";
    container.style.padding = "8px";
    container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(6, 1fr)";
    container.style.gap = "4px";

    greekLetters.forEach(({ symbol, latex }) => {
      const btn = document.createElement("button");
      btn.textContent = symbol;
      btn.style.padding = "6px";
      btn.style.fontSize = "16px";
      btn.style.cursor = "pointer";
      btn.style.border = "1px solid #ddd";
      btn.style.borderRadius = "4px";
      btn.style.backgroundColor = "#f9f9f9";
      btn.title = latex

      btn.onclick = () => {
        api.replaceSelection(latex + " ");
        document.body.removeChild(container);
      };

      container.appendChild(btn);
    });

    const rect = document.activeElement?.getBoundingClientRect();
    if (rect) {
      container.style.top = `${rect.bottom + 5 + window.scrollY}px`;
      container.style.left = `${rect.left + window.scrollX}px`;
    } else {
      container.style.top = `100px`;
      container.style.left = `100px`;
    }

    document.body.appendChild(container);
  }
};


export default function MarkdownLaTexEditor({ ...rest }: MDEditorProps) {
  return (
    <MDEditor
      {...rest}
      previewOptions={{
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex],
      }}
      data-color-mode="light"
      commands={[
        ...commands.getCommands(),
        insertFraction,
        insertSuperscript,
        insertSubscript,
        insertSqrt,
        insertNSqrt,
        insertSum,
        insertProd,
        insertGreekLetters,

      ]}
    />
  );
}
