import { useState } from 'react'
import { VercelV0Chat } from './components/ui/v0-ai-chat'
import { SplineScene } from './components/ui/spline'
import { Spotlight } from './components/ui/spotlight'
import { Card } from './components/ui/card'
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from './components/ui/chat-input'
import { toast, Toaster } from 'sonner'

function App() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])

  const handleSubmit = async () => {
    if (!value.trim()) return

    const userMessage = value
    setValue("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          chat_history: []
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error(error)
      toast.error("Failed to connect to the Ads Assistant backend.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <Toaster position="top-center" richColors />
      
      {/* Hero Section with Spline and Spotlight */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center border-b border-white/10">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              Google Ads <br /> Assistant Agent
            </h1>
            <p className="text-xl text-neutral-400 max-w-xl">
              Your senior digital marketing strategist. Analyze data, generate copy, 
              and optimize performance with the power of Mistral AI.
            </p>
          </div>

          <div className="flex-1 w-full h-[400px] md:h-[500px] relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-neutral-900/50 border-neutral-800 p-6 min-h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                    <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center">
                      <PlusIcon className="w-6 h-6" />
                    </div>
                    <p>Start a conversation to get marketing insights.</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-neutral-800 text-neutral-200 border border-neutral-700 whitespace-pre-wrap'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 flex items-center gap-2">
                       <span className="loader scale-50"></span>
                       <span className="text-neutral-400">Strategizing...</span>
                    </div>
                  </div>
                )}
              </div>

              <ChatInput
                variant="default"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSubmit={handleSubmit}
                loading={isLoading}
                onStop={() => setIsLoading(false)}
                className="bg-neutral-950 border-neutral-800"
              >
                <ChatInputTextArea 
                  placeholder="Ask about your ROAS, CPC, or generate new ad copy..." 
                  className="text-white"
                />
                <ChatInputSubmit />
              </ChatInput>
            </Card>
          </div>

          {/* Features / Identity Panel */}
          <div className="space-y-6">
            <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CircleUserRound className="w-5 h-5 text-neutral-400" />
                Senior Strategist
              </h3>
              <p className="text-sm text-neutral-400">
                8+ years experience in performance marketing. Following strict Google Ads best practices.
              </p>
              <hr className="border-neutral-800" />
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Core Capabilities</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    Account Performance Audit
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    RSA Compliant Ad Copy
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    Search Term Optimization
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    Weekly Performance Reports
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-neutral-900 to-black border-neutral-800 p-6">
              <VercelV0Chat />
            </Card>
          </div>

        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-neutral-600 text-sm">
        Built with LangChain, Mistral AI, and Interactive 3D.
      </footer>
    </div>
  )
}

// Minimal icons for the demo
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  )
}

function CircleUserRound({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
  )
}

export default App
