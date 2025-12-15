import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { generateMergedImage } from './services/geminiService';
import { Wand2, Download, RefreshCw, AlertCircle, Share2, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [adultImg, setAdultImg] = useState<string | null>(null);
  const [childImg, setChildImg] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!adultImg || !childImg) {
      setError("يا اسطى ركز! لازم ترفع الصورتين الأول عشان المكنة تشتغل.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Small delay to allow UI to update to loading state comfortably
      await new Promise(r => setTimeout(r, 500));
      
      const generatedImage = await generateMergedImage(adultImg, childImg, prompt);
      setResult(generatedImage);
      
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      setError(err.message || "حصلت مشكلة في السيستم. جرب تاني يا غالي.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = `hug-yourself-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetAll = () => {
    setAdultImg(null);
    setChildImg(null);
    setPrompt('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="container mx-auto px-4 max-w-5xl">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500 text-red-100 p-4 rounded-xl mb-8 flex items-center gap-3 animate-bounce">
            <AlertCircle size={24} />
            <span className="font-bold text-lg">{error}</span>
          </div>
        )}

        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <ImageUploader 
            id="adult-upload"
            label="صورتك وانت شحط"
            subLabel="اختار صورة ليك وانت كبير (يفضل تكون واضحة)"
            image={adultImg}
            onImageUpload={setAdultImg}
          />
          <ImageUploader 
            id="child-upload"
            label="صورتك وانت فسفوسة"
            subLabel="اختار صورة ليك وانت صغير (كيوت كده)"
            image={childImg}
            onImageUpload={setChildImg}
          />
        </div>

        {/* Controls Section */}
        <div className="bg-purple-900/50 p-8 rounded-3xl border border-purple-700/50 backdrop-blur-md shadow-2xl mb-12">
          <div className="mb-6">
            <label className="block text-pink-400 font-bold text-xl mb-2">
              عايز تضيف تاتش زيادة؟ (اختياري)
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب هنا لو عايز توصف المكان أو الجو العام للصورة... مثلاً: في جنينة، وقت الغروب، لابسين بدل..."
              className="w-full bg-purple-950/50 border-2 border-purple-600 rounded-xl p-4 text-white placeholder-purple-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all h-24 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`
              w-full py-5 rounded-xl text-2xl font-black shadow-lg transform transition-all
              flex items-center justify-center gap-3
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed opacity-80' 
                : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-800 text-white hover:scale-[1.02] hover:shadow-pink-500/50 active:scale-95'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={32} />
                <span>بنسخن المكنة... اصبر يا كبير</span>
              </>
            ) : (
              <>
                <Wand2 size={32} />
                <span>شقلب الزمن واحضن نفسك</span>
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div ref={resultRef} className="animate-fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-pink-400 mb-2">✨ يا ولااا! ايه الحلاوة دي ✨</h2>
              <p className="text-purple-200">الذكاء الاصطناعي بدّع معاك المرة دي</p>
            </div>

            <div className="bg-gradient-to-b from-purple-800 to-black p-2 rounded-3xl shadow-2xl inline-block w-full max-w-2xl mx-auto block overflow-hidden">
              <div className="relative group">
                <img 
                  src={result} 
                  alt="Merged Result" 
                  className="w-full h-auto rounded-2xl border-4 border-pink-400/30 shadow-inner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-8">
                  <p className="text-white font-bold text-lg">صورة للتاريخ يا فنان</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button 
                onClick={downloadImage}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <Download size={24} />
                حمل الصورة
              </button>
              
              <button 
                onClick={() => alert("خد سكرين شوت وابعتها، الخاصية دي جاية في التحديث الجاي 😉")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <Share2 size={24} />
                شير للصحاب
              </button>

              <button 
                onClick={resetAll}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <RefreshCw size={24} />
                جرب تاني
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-purple-400/60 mt-12 border-t border-purple-900/50">
        <p className="text-lg font-medium">صنع بكل حب و هزار بواسطة <span className="text-pink-400 font-bold">Yousef Sawan</span></p>
      </footer>
    </div>
  );
};

export default App;