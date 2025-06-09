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

function createSymbolPopup(
  symbols: { url: string; latex: string }[],
  state: TextState,
  api: TextAreaTextApi
) {
  const {text, selection} = state;
  const existing = document.querySelector('.symbol-popup-container');
  
  if (existing) {
    existing.remove();
  }
  
  const container = document.createElement("div");
  container.classList.add('symbol-popup-container');
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
  
  symbols.forEach(({ url, latex }) => {
    const btn = document.createElement("button");
    btn.style.padding = "6px";
    btn.style.cursor = "pointer";
    btn.style.border = "1px solid #ddd";
    btn.style.borderRadius = "4px";
    btn.style.backgroundColor = "#f9f9f9";
    btn.title = latex;
    
    const img = document.createElement("img");
    img.src = url;
    img.alt = latex;
    img.style.height = "20px";
    img.style.width = "20px";
    
    if(latex == "\\cdot"){
      img.style.height = "4px";
      img.style.width = "4px";
    }
    if(latex == "\\pm"){
      img.style.height = "12px";
      img.style.width = "12px";
    }
    img.style.display = "block";
    img.style.margin = "0 auto";
    
    btn.appendChild(img);
    
    btn.onclick = () => {
      const cursor = selection.start;
      const before = text.slice(0, cursor);
      const after = text.slice(cursor);
      
      const lastDollarOpen = before.lastIndexOf('$');
      const nextDollarClose = after.indexOf('$');
      
      const insideLatex= lastDollarOpen !== -1 && nextDollarClose !== -1;
      
      if(insideLatex){
        const selectionText = text.slice(selection.start, selection.end)
        if(latex == "()" || latex == "[]"){
          api.replaceSelection(`\\left${latex[0]} ${selectionText} \\right${latex[1]}`)
          const pos = cursor + latex.length;
          api.setSelectionRange({start: pos, end: pos});
        }
        else if(latex = "{}"){
          api.replaceSelection(`\\left\\{ ${selectionText} \\right\\}`)
          const pos = cursor + latex.length;
          api.setSelectionRange({start: pos, end: pos});
        }
        else if(latex == "floor" || latex == "ceil"){
          api.replaceSelection(`\\l${latex} ${selectionText} \\r${latex}`)
          const pos = cursor + latex.length + 3;
          api.setSelectionRange({start: pos, end: pos + selectionText.length});
        }
        else{
          api.replaceSelection(latex);
          const pos = cursor + latex.length;
          api.setSelectionRange({start: pos, end: pos});
        }
      }
      else {
        const selectionText = text.slice(selection.start, selection.end)
        if(latex == "()" || latex == "[]"){
          const block = `$\\left${latex[0]} ${selectionText} \\right${latex[1]}$`;
          api.replaceSelection(block);
        }
        else if(latex == "{}"){
          const block = `$\\left\\{ ${selectionText} \\right\\}$`;
          api.replaceSelection(block);
        }
        else if(latex == "floor" || latex == "ceil"){
          const block = `$\\l${latex} ${selectionText} \\r${latex}$`;
          api.replaceSelection(block);
          const pos = cursor + latex.length+ 3
          api.setSelectionRange({start: pos, end: pos+selectionText.length})
        }
        
        else {
          const block = `$${latex}$`;
          api.replaceSelection(block);
        }
        const blockStart = cursor + 2;
        const blockEnd = blockStart + latex.length;
        api.setSelectionRange({start: blockStart, end: blockEnd})
      }
      
      
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

const generalMathSymbols = [
  { latex: "\\frac{a}{b}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\frac{a}{b}" },
  { latex: "\\sqrt{a}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\sqrt{x}" },
  { latex: "\\sqrt[a]{b}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\sqrt[n]{x}" },
  { latex: "^{2}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large x^{2}" },
  { latex: "_{i}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large x_{i}" },
  { latex: "\\sum_{i=1}^n i", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\sum" },
  { latex: "\\prod_{i=1}^n i", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\prod" },
  { latex: "\\cdot", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cdot" },
  { latex: "\\cdots", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cdots" },
  { latex: "\\pm", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\pm" },
  { latex: "()", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\left( \\right)" },
  { latex: "[]", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\left[ \\right]" },
  { latex: "{}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\left\\{ \\right\\}" },
  { latex: "floor", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\lfloor \\cdot \\rfloor" },
  { latex: "ceil", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\lceil \\cdot \\rceil" }
];


  const geometrySymbols=[
    {latex:"\\angle",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\angle"},
    {latex:"\\triangle",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\triangle"},
    {latex:"\\square",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\square"},
    {latex:"\\perp",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\perp"},
    {latex:"\\parallel",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\parallel"},
    {latex:"\\overline{AB}",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\overline{AB}"},
    {latex:"\\widehat{AB}",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\widehat{AB}"},
    {latex:"\\sim",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\sim"},
    {latex:"\\cong",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cong"},
    {latex:"\\equiv",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\equiv"},
    {latex:"\\bot",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\bot"},
    {latex:"\\measuredangle",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\measuredangle"}
  ];


  const logicAndSetsSymbols = [
    {latex:"\\land",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\land"},
    {latex:"\\lor",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\lor"},
    {latex:"\\neg",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\neg"},
    {latex:"\\implies",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\implies"},
    {latex:"\\iff",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\iff"},
    {latex:"\\forall",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\forall"},
    {latex:"\\exists",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\exists"},
    {latex:"\\in",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\in"},
    {latex:"\\notin",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\notin"},
    {latex:"\\subset",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\subset"},
    {latex:"\\subseteq",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\subseteq"},
    {latex:"\\supset",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\supset"},
    {latex:"\\supseteq",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\supseteq"},
    {latex:"\\cup",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cup"},
    {latex:"\\cap",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cap"},
    {latex:"\\emptyset",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\emptyset"},
    {latex:"\\setminus",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\setminus"},
    {latex:"\\equiv",url:"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\equiv"}
  ];

  const arrowSymbols = [   
    { latex: "\\rightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\rightarrow" },
    { latex: "\\leftarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\leftarrow" },  
    { latex: "\\leftrightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\leftrightarrow" },
    { latex: "\\Rightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\Rightarrow" },
    { latex: "\\Leftarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\Leftarrow" },   
    { latex: "\\Leftrightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\Leftrightarrow" },
    { latex: "\\uparrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\uparrow" },     
    { latex: "\\downarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\downarrow" },  
    { latex: "\\mapsto", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mapsto" },        
    { latex: "\\longrightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\longrightarrow" }, 
    { latex: "\\longleftarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\longleftarrow" },   
    { latex: "\\Longrightarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\Longrightarrow" },  
    { latex: "\\Longleftarrow", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\Longleftarrow" },   
    { latex: "\\iff", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\iff" },                        
  ];

  const numberSetsSymbols = [
    { latex: "\\mathbb{Z}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mathbb{Z}" },
    { latex: "\\mathbb{N}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mathbb{N}" }, 
    { latex: "\\mathbb{Q}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mathbb{Q}" },
    { latex: "\\mathbb{R}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mathbb{R}" },
    { latex: "\\mathbb{C}", url: "https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\mathbb{C}" }, 
  ];

  const greekLetters = [
    { symbol: 'α', latex: '\\alpha', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\alpha' },
    { symbol: 'β', latex: '\\beta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\beta' },
    { symbol: 'γ', latex: '\\gamma', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\gamma' },
    { symbol: 'δ', latex: '\\delta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\delta' },
    { symbol: 'ε', latex: '\\epsilon', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\epsilon' },
    { symbol: 'ζ', latex: '\\zeta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\zeta' },
    { symbol: 'η', latex: '\\eta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\eta' },
    { symbol: 'θ', latex: '\\theta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\theta' },
    { symbol: 'ι', latex: '\\iota', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\iota' },
    { symbol: 'κ', latex: '\\kappa', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\kappa' },
    { symbol: 'λ', latex: '\\lambda', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\lambda' },
    { symbol: 'μ', latex: '\\mu', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\mu' },
    { symbol: 'ν', latex: '\\nu', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\nu' },
    { symbol: 'ξ', latex: '\\xi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\xi' },
    { symbol: 'π', latex: '\\pi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\pi' },
    { symbol: 'ρ', latex: '\\rho', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\rho' },
    { symbol: 'σ', latex: '\\sigma', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\sigma' },
    { symbol: 'τ', latex: '\\tau', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\tau' },
    { symbol: 'υ', latex: '\\upsilon', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\upsilon' },
    { symbol: 'φ', latex: '\\phi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\phi' },
    { symbol: 'χ', latex: '\\chi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\chi' },
    { symbol: 'ψ', latex: '\\psi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\psi' },
    { symbol: 'ω', latex: '\\omega', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\omega' },
    { symbol: 'Γ', latex: '\\Gamma', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Gamma' },
    { symbol: 'Δ', latex: '\\Delta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Delta' },
    { symbol: 'Θ', latex: '\\Theta', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Theta' },
    { symbol: 'Λ', latex: '\\Lambda', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Lambda' },
    { symbol: 'Ξ', latex: '\\Xi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Xi' },
    { symbol: 'Π', latex: '\\Pi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Pi' },
    { symbol: 'Σ', latex: '\\Sigma', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Sigma' },
    { symbol: 'Υ', latex: '\\Upsilon', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Upsilon' },
    { symbol: 'Φ', latex: '\\Phi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Phi' },
    { symbol: 'Ψ', latex: '\\Psi', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Psi' },
    { symbol: 'Ω', latex: '\\Omega', url: 'https://latex.codecogs.com/svg.image?\\dpi{150}\\Omega' }
  ];

  const insertInlineLatex: ICommand = {
    name: "inlineLatex",
    keyCommand: "inlineLatex",
    buttonProps: { "aria-label": "Insertar LaTeX inline", "title": "Insertar LaTeX inline" },
    icon: <img src="https://latex.codecogs.com/svg.image?\dpi{150}\$"></img>,
    execute: (state: TextState, api: TextAreaTextApi) => {
      const selectedText = state.selectedText || '';

      if (selectedText.search(/\$[^$]+\$|\$\$[^$]+\$\$/) != -1) {
        return;
      }
      
      const wrappedText = `$${selectedText}$`;

      api.replaceSelection(wrappedText);

      if (selectedText.length === 0) {
        const cursorPos = state.selection.start + 1;
        api.setSelectionRange({ start: cursorPos, end: cursorPos });
      }
    }
  };

const insertBlockLatex: ICommand = {
  name: "blockLatex",
  keyCommand: "blockLatex",
  buttonProps: { "aria-label": "Insertar LaTeX en bloque", "title": "Insertar LaTeX en bloque" },
  icon: <img src="https://latex.codecogs.com/svg.image?\dpi{150}\$\$"></img>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const selectedText = state.selectedText || '';
    const blockText = `$$\n${selectedText}\n$$\n`;
    api.replaceSelection(blockText);
    if (selectedText.length === 0) {
      const cursorPos = state.selection.start + 3; 
      api.setSelectionRange({ start: cursorPos, end: cursorPos });
    }
  }
};

  const insertGeneralSymbols: ICommand = {
    name: "generalSymbols",
    keyCommand: "generalSymbols",
    icon: <svg width="5.0059304mm" height="3.078244mm" viewBox="0 0 5.0059304 3.078244" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-21.619835,-49.783442)"><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.187399,strokeLinecap:"round",strokeDasharray:"none"}} id="rect1" width="1.0411799" height="0.99646878" x="24.993706" y="49.877144"/><path style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.3,strokeLinecap:"square",strokeDasharray:"none"}} d="m 24.573386,51.106998 c 1.050681,0 2.101363,0 3.152042,0" id="path1" transform="matrix(0.64394953,0,0,0.6824914,8.6753961,16.426425)"/><rect style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.187399,strokeLinecap:"round",strokeDasharray:"none"}} id="rect2" width="1.0411799" height="0.99646878" x="24.993706" y="51.771519"/><path style={{fill:"#ffeab4",fillOpacity:0,stroke:"#000",strokeWidth:0.253781,strokeLinecap:"square",strokeDasharray:"none"}} d="m 21.746726,51.162949 h 0.654233 l 0.350535,1.085794 0.191765,-0.00054 0.353364,-1.745934 h 0.768255" id="path11"/></g></svg>,
    buttonProps: { "aria-label": "Símbolos Generales", title: "General" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(generalMathSymbols, state, api)
    }
  };


  const insertNumberSets: ICommand = {
    name: "numberSets",
    keyCommand: "numberSets",
    icon: <img src={"https://latex.codecogs.com/svg.image?\\dpi{150}\\mathbb{Z}"}></img>,
    buttonProps: { "aria-label": "Símbolos de Conjuntos de Números", title: "Conjuntos de números" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(numberSetsSymbols, state, api)
    }
  };

  const insertArrowSymbols: ICommand = {
    name: "arrowSymbols",
    keyCommand: "arrowSymbols",
    icon: <img src={"https://latex.codecogs.com/svg.image?\\dpi{150}\\Rightarrow"}></img>,
    buttonProps: { "aria-label": "Símbolos de Flechas", title: "Flechas" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(arrowSymbols, state, api)
    }
  };

  const insertLogicSets: ICommand = {
    name: "logicAndSets",
    keyCommand: "logicAndSets",
    icon: <img src={"https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\cup"}></img>,
    buttonProps: { "aria-label": "Símbolos de Lógica y conjuntos", title: "Lógica y conjuntos" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(logicAndSetsSymbols, state, api)
    }
  };

  const insertGeometrySymbols: ICommand = {
    name: "geometrySymbols",
    keyCommand: "geometrySymbols",
    icon: <img src={"https://latex.codecogs.com/svg.image?\\dpi{150}\\triangle"}></img>,
    buttonProps: { "aria-label": "Símbolos de Geometría", title: "Geometría" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(geometrySymbols, state, api)
    }
  };

  const insertGreekLetters: ICommand = {
    name: "greekLetters",
    keyCommand: "greekLetters",
    icon: <img src={'https://latex.codecogs.com/svg.image?\\dpi{150}\\large\\pi'}></img>,
    buttonProps: { "aria-label": "Letras griegas", title: "Letras griegas" },
    execute: (state: TextState, api: TextAreaTextApi) => {
      createSymbolPopup(greekLetters, state, api)
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
      insertInlineLatex,
      insertBlockLatex,
      insertGeneralSymbols,
      insertArrowSymbols,
      insertLogicSets,
      insertGeometrySymbols,
      insertNumberSets,
      insertGreekLetters,
    ]}
    />
  );
}
