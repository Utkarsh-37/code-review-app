import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';

const API_URL = 'http://localhost:8000/api/v1';

const initialCode = `def processdata(data):
    # this function processes data
    if len(data) > 0:
        print("Processing...")
        for item in data:
            if item["type"] == 'user':
                print(item["name"])
    else:
        return None`;

export function ReviewTool() {
  const [code, setCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewResultHtml, setReviewResultHtml] = useState('');

  const pollForResult = (jobId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/review/${jobId}`);
        const data = await response.json();

        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          const rawHtml = await marked.parse(data.report.result || '');
          setReviewResultHtml(rawHtml);
          setIsLoading(false);
          toast.success('🎉 Review Complete!', { 
            description: 'Your code analysis is ready.' 
          });
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setIsLoading(false);
          toast.error('Review Failed', { 
            description: data.report.error 
          });
        }
      } catch (error) {
        clearInterval(interval);
        setIsLoading(false);
        toast.error('Error', { 
          description: 'Could not fetch review status.' 
        });
      }
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Empty Code', { 
        description: 'Please enter some code to review.' 
      });
      return;
    }

    setIsLoading(true);
    setReviewResultHtml('');
    toast('🚀 Starting AI Code Review...', { 
      description: 'Your code has been sent for analysis.' 
    });

    const blob = new Blob([code], { type: 'text/plain' });
    const file = new File([blob], 'code.py', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/review`, { 
        method: 'POST', 
        body: formData 
      });
      if (!response.ok) throw new Error('Failed to start review process.');
      
      const data = await response.json();
      pollForResult(data.job_id);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error', { 
        description: error.message 
      });
    }
  };

  const clearCode = () => {
    setCode('');
    toast.info('Editor Cleared', {
      description: 'Ready for new code input.'
    });
  };

  const insertSampleCode = () => {
    setCode(initialCode);
    toast.info('Sample Code Loaded', {
      description: 'Sample Python code has been inserted.'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground font-sans p-4 sm:p-8">
      <Toaster position="top-center" richColors closeButton />
      
      <div className="max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <header className="text-center mb-12">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  AI Code Review
                </h1>
                <p className="text-lg text-blue-200 mt-2 font-medium">Intelligent Code Analysis</p>
              </div>
            </div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              Get instant, intelligent code analysis with AI-powered insights. 
              Paste your Python code and receive detailed feedback on <span className="text-blue-300">best practices</span>, 
              <span className="text-green-300"> potential issues</span>, and <span className="text-purple-300">optimization suggestions</span>.
            </p>
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="flex flex-col space-y-6">
            <Card className="flex-grow border-0 shadow-2xl bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-700/50">
              <CardHeader className="pb-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Python Code Editor
                    </CardTitle>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={insertSampleCode}
                      className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Sample
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearCode}
                      className="border-red-500/50 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear
                    </Button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Write or paste your Python code. The AI will analyze it for improvements.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col h-full pt-6">
                <div className="border border-slate-600/50 rounded-2xl overflow-hidden flex-grow shadow-2xl bg-slate-900/70 backdrop-blur-sm">
                  <Editor
                    height="55vh"
                    defaultLanguage="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{ 
                      minimap: { enabled: false },
                      fontSize: 15,
                      lineHeight: 1.6,
                      fontFamily: 'JetBrains Mono, "Fira Code", Monaco, "Courier New", monospace',
                      padding: { top: 20, bottom: 20 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      renderLineHighlight: 'all',
                      selectionHighlight: true,
                      occurrencesHighlight: true,
                      matchBrackets: 'always',
                      wordWrap: 'on',
                      smoothScrolling: true,
                    }}
                    loading={
                      <div className="flex items-center justify-center h-full bg-slate-900">
                        <div className="text-center">
                          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                          <p className="text-gray-400">Loading advanced code editor...</p>
                        </div>
                      </div>
                    }
                  />
                </div>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="w-full mt-8 text-lg py-7 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 border-0 font-bold shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-3xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {isLoading ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        AI is Analyzing Your Code...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🔍</span>
                      </div>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Review My Code with AI
                      </span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="flex flex-col">
            {isLoading && !reviewResultHtml && (
              <Card className="flex-grow border-0 shadow-2xl bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-700/50">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[500px] p-8">
                  <div className="text-center">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-500"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-1000"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">🤖</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                      AI Deep Analysis in Progress
                    </h3>
                    <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                      Our advanced AI is meticulously reviewing your code for 
                      <span className="text-blue-300"> best practices</span>, 
                      <span className="text-green-300"> potential bugs</span>, and 
                      <span className="text-yellow-300"> optimization opportunities</span>.
                    </p>
                    <div className="mt-8 flex gap-2 justify-center">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <div className="mt-6 text-sm text-gray-400">
                      This usually takes 10-30 seconds...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
{reviewResultHtml && (
  <Card className="flex-grow border-0 shadow-2xl bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-700/50">
    <CardHeader className="pb-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <CardTitle className="text-2xl font-bold text-white">
            AI Review Analysis
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-sm font-medium">Analysis Complete</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-6">
      <div 
        className="prose prose-invert max-w-none 
          /* Reset all text colors to ensure visibility */
          prose-headings:text-white prose-headings:font-bold
          prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-white prose-h1:border-b prose-h1:border-slate-700 prose-h1:pb-3 prose-h1:mt-8
          prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h2:border-b prose-h2:border-slate-700 prose-h2:pb-2 prose-h2:mt-6
          prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-200 prose-h3:mt-6
          prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-white prose-strong:font-bold
          prose-em:text-gray-300 prose-em:italic
          prose-blockquote:text-gray-300 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-700/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-2xl
          prose-ul:text-gray-200 prose-ol:text-gray-200
          prose-li:text-gray-200 prose-li:leading-relaxed
          prose-code:bg-slate-700 prose-code:text-orange-300 prose-code:rounded-lg prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-slate-600
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
          prose-table:text-gray-200 prose-th:bg-slate-700 prose-td:bg-slate-800 prose-td:border prose-td:border-slate-700
          prose-img:rounded-lg prose-img:border prose-img:border-slate-600
          
          /* Force all text to be visible */
          !text-gray-200
          
          scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 max-h-[65vh] overflow-y-auto p-4"
        dangerouslySetInnerHTML={{ __html: reviewResultHtml }}
      />
    </CardContent>
  </Card>
)}

            {!isLoading && !reviewResultHtml && (
              <Card className="flex-grow border-0 shadow-2xl bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-700/50">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl mb-4">
                      <span className="text-3xl">💡</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Ready for AI Code Review
                  </h3>
                  <p className="text-gray-300 text-lg max-w-sm mx-auto leading-relaxed mb-8">
                    Enter your Python code in the editor and click "Review My Code" 
                    to get comprehensive AI-powered analysis and improvement suggestions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 w-full max-w-xs">
                    {[
                      { icon: '🛡️', label: 'Security', color: 'green' },
                      { icon: '⚡', label: 'Performance', color: 'yellow' },
                      { icon: '🎯', label: 'Best Practices', color: 'blue' },
                      { icon: '🔧', label: 'Code Style', color: 'purple' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl border border-slate-600/50">
                        <span className="text-lg">{item.icon}</span>
                        <div className="text-left">
                          <div className="font-medium text-white">{item.label}</div>
                          <div className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 bg-${item.color}-400 rounded-full`}></div>
                            <div className="text-xs text-gray-400">AI Checked</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-xs text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Supports Python, JavaScript, TypeScript, and more
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by advanced AI • Secure and private • Real-time analysis
          </p>
        </footer>
      </div>
    </div>
  );
}