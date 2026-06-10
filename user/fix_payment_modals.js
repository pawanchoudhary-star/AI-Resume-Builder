const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

const modalsCode = `
      {/* Quality Selection Modal */}
      {isQualityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative text-center">
            <button onClick={() => setIsQualityModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h3 className="text-2xl font-bold text-white mb-2">Download Quality</h3>
            <p className="text-gray-400 text-sm mb-6">Choose the resolution for your resume PDF.</p>
            
            <div className="space-y-3">
              <button onClick={() => triggerDownload(1)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>Standard (360p)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={() => triggerDownload(1.5)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>Good (480p)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={() => triggerDownload(2)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>High (720p HD)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={() => { setIsQualityModalOpen(false); setIsScannerOpen(true); }} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-[0_0_15px_rgba(147,51,234,0.3)] flex justify-between items-center mt-4">
                <div className="flex items-center gap-2"><span>⭐</span><span>Ultra HD (1080p)</span></div><span className="text-sm bg-black/30 px-2 py-1 rounded">₹21</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Scanner Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#1a1a1a] border border-purple-500/30 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(147,51,234,0.15)] relative text-center">
            <button onClick={() => setIsScannerOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Download</h3>
            <p className="text-gray-400 text-sm mb-6">Scan the QR code to pay <strong className="text-purple-400 font-bold text-lg">₹21</strong> and unlock Ultra HD 1080p quality without watermarks.</p>
            
            <div className="bg-white p-2 rounded-xl mb-6 mx-auto inline-block shadow-lg">
              <img src="/qr_code.png" alt="Payment QR Code" className="w-48 h-48 object-contain" />
            </div>

            <button onClick={() => triggerDownload(4)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-[0_0_15px_rgba(22,163,74,0.3)] mb-3">
              Confirm Payment & Download
            </button>
            <button onClick={() => setIsScannerOpen(false)} className="w-full bg-transparent hover:bg-white/5 text-gray-400 py-2 px-4 rounded-xl transition text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}
`;

code = code.replace(
  '      </div>\n    </div>\n  );\n}',
  modalsCode + '\n      </div>\n    </div>\n  );\n}'
);

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed Modals');
