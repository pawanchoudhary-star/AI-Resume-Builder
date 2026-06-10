const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// We need to inject a useEffect for the scanner auto-download
// Find where useEffect is used, or just inject it near the top of the component
// The component is "export default function BuilderPage() {"
const useEffectCode = `
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isScannerOpen) {
      // Simulate waiting for payment (e.g., 8 seconds)
      timeout = setTimeout(() => {
        triggerDownload(4);
      }, 8000);
    }
    return () => clearTimeout(timeout);
  }, [isScannerOpen]);
`;

// Insert the useEffect inside BuilderPage just after "const [isScannerOpen, setIsScannerOpen] = useState(false);"
code = code.replace(
  'const [isScannerOpen, setIsScannerOpen] = useState(false);',
  'const [isScannerOpen, setIsScannerOpen] = useState(false);\n' + useEffectCode
);

// Now update the Scanner Modal UI to remove the Confirm button and show a "waiting for payment" loader text.
const oldModalPart = `<button onClick={() => triggerDownload(4)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-[0_0_15px_rgba(22,163,74,0.3)] mb-3">
              Confirm Payment & Download
            </button>`;

const newModalPart = `<div className="flex flex-col items-center justify-center space-y-3 mb-4">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-purple-400 text-sm font-medium animate-pulse">Waiting for payment...</p>
            </div>`;

code = code.replace(oldModalPart, newModalPart);

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Scanner auto-download implemented');
