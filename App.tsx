import React, { useState, useCallback } from 'react';
import { DEFAULT_SYSTEM_PROMPT } from './constants';
import { generateResponse } from './services/geminiService';
import TextArea from './components/TextArea';
import GenerateButton from './components/GenerateButton';
import ResponseDisplay from './components/ResponseDisplay';
import GalaxyBackground from './components/GalaxyBackground';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';
import InfoModals from './components/InfoModals';

const App: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);
  const [userQuery, setUserQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userQuery.trim()) {
      setError('User Query cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await generateResponse(systemPrompt, userQuery);
      setResponse(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate response: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [systemPrompt, userQuery]);

  return (
    <div className="min-h-screen text-gray-100 font-sans relative">
      <GalaxyBackground />
      <InfoModals />
      
      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
            <div className="bg-black rounded-full px-6 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-bold tracking-widest text-xs uppercase">
                    Advanced AI Simulation
                </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4">
            LLM Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Simulator</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Craft perfect system contexts, test logic via Gemini API, and simulate local <span className="text-indigo-400 font-semibold">Ollama</span> environments in a secure, high-fidelity sandbox.
          </p>
        </header>

        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl ring-1 ring-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="space-y-6 flex flex-col h-full">
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-inner">
                <TextArea
                  label="System Context (Persona)"
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={10}
                  className="bg-gray-900/80 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-inner flex-grow flex flex-col">
                <TextArea
                  label="User Query"
                  id="user-query"
                  placeholder="e.g., Explain the theory of relativity in simple terms."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  rows={4}
                  className="bg-gray-900/80 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/50 transition-all"
                />
                <div className="mt-6">
                  <GenerateButton
                    onClick={handleGenerate}
                    isLoading={isLoading}
                    disabled={isLoading || !userQuery.trim()}
                  />
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex flex-col h-full min-h-[500px]">
              <ResponseDisplay
                response={response}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
        
        <SEOContent />
      </main>

      <Footer />
    </div>
  );
};

export default App;
