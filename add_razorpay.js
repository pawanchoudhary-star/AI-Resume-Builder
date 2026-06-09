const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// 1. Remove the old useEffect for scanner auto-download
const oldUseEffect = `  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isScannerOpen) {
      // Simulate waiting for payment (e.g., 8 seconds)
      timeout = setTimeout(() => {
        triggerDownload(4);
      }, 8000);
    }
    return () => clearTimeout(timeout);
  }, [isScannerOpen]);`;

code = code.replace(oldUseEffect, '');

// 2. Add the Razorpay script loader
const rzpUseEffect = `  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);`;

code = code.replace(
  'const [isScannerOpen, setIsScannerOpen] = useState(false);',
  'const [isScannerOpen, setIsScannerOpen] = useState(false);\n' + rzpUseEffect
);

// 3. Add the handlePremiumClick function
const rzpHandler = `
  const handlePremiumClick = () => {
    setIsQualityModalOpen(false);
    
    const options = {
      key: "rzp_test_aNXXBmbgB2rKjG", // Demo Razorpay Test Key
      amount: 2100, // 21 INR
      currency: "INR",
      name: "Resume AI Pro",
      description: "Ultra HD (1080p) Resume Download",
      handler: function (response: any) {
        // Payment successful
        triggerDownload(4);
      },
      prefill: {
        name: resumeData.name || "Pawan Choudhary",
        email: "pawanchoudhary882455@gmail.com",
        contact: resumeData.phone || "9999999999"
      },
      theme: {
        color: "#9333ea"
      }
    };
    
    // @ts-ignore
    if (window.Razorpay) {
      // @ts-ignore
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Razorpay SDK failed to load. Are you online?");
    }
  };
`;

code = code.replace('const triggerDownload = async', rzpHandler + '\n  const triggerDownload = async');

// 4. Update the Premium Download button to call handlePremiumClick instead of opening scanner
code = code.replace(
  'onClick={() => { setIsQualityModalOpen(false); setIsScannerOpen(true); }}',
  'onClick={handlePremiumClick}'
);

// 5. Remove the old Scanner Modal completely
const scannerModalStart = '{/* Payment Scanner Modal */}';
const scannerModalEnd = `</button>
          </div>
        </div>
      )}`;

const scannerIndex = code.indexOf(scannerModalStart);
if (scannerIndex !== -1) {
  const endIdx = code.indexOf(scannerModalEnd, scannerIndex);
  if (endIdx !== -1) {
    code = code.substring(0, scannerIndex) + code.substring(endIdx + scannerModalEnd.length);
  }
}

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Razorpay integrated!');
