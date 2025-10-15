export function LandingPage({ onNavigate }) {
    // These are the HTML strings for the syntax-highlighted code blocks
    const beforeCode = `<span class="token keyword">def</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># gets user info</span>
        <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> item <span class="token keyword">in</span> <span class="token parameter">list</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> item<span class="token punctuation">[</span><span class="token string">'type'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">'user'</span><span class="token punctuation">:</span>
                    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'User name is'</span><span class="token punctuation">,</span> item<span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">None</span>`;

    const afterCode = `<span class="token keyword">def</span> <span class="token function">get_user_names</span><span class="token punctuation">(</span><span class="token parameter">records: list</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token function">list</span><span class="token punctuation">[</span><span class="token function">str</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token comment">"""Extracts user names from a list of records."""</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> records<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

        user_names <span class="token operator">=</span> <span class="token punctuation">[</span>
            record<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> record <span class="token keyword">in</span> records
            <span class="token keyword">if</span> record<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'type'</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">'user'</span>
        <span class="token punctuation">]</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>name <span class="token keyword">for</span> name <span class="token keyword">in</span> user_names <span class="token keyword">if</span> name<span class="token punctuation">]</span>`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-800">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
                                </svg>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">CodeGuardian AI</h1>
                            <p className="text-xs text-gray-500 -mt-1">Beta</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Features</a>
                        <a href="#demo" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Demo</a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Pricing</a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Docs</a>
                    </nav>
                    <button 
                        onClick={onNavigate}
                        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Launch App
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5"></div>
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                    
                    <div className="container mx-auto px-6 text-center relative">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-indigo-200">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            AI-Powered Code Review Assistant
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                            Ship
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> flawless </span>
                            code
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
                            CodeGuardian is your AI-powered code review assistant that catches bugs, security vulnerabilities, and style issues before they ever reach production.
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                onClick={onNavigate} 
                                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                            >
                                <span>Get Started for Free</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <a 
                                href="#demo" 
                                className="group bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl border border-gray-300 hover:border-indigo-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                            >
                                <span>View Live Demo</span>
                                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </a>
                        </div>
                        
                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                            {[
                                { number: '10x', label: 'Faster Reviews' },
                                { number: '99%', label: 'Bug Detection' },
                                { number: '50%', label: 'Less Technical Debt' },
                                { number: '24/7', label: 'AI Assistance' }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Code Demo Section */}
                <section id="demo" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                From <span className="text-red-500">Flawed</span> to <span className="text-green-600">Flawless</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                See how CodeGuardian AI transforms your code with clear, actionable improvements in seconds.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                            {/* Before */}
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                                <div className="relative border border-red-200 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-pink-50 rounded-t-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <h3 className="text-xl font-semibold text-red-700">Before: Problematic Code</h3>
                                        </div>
                                        <p className="text-red-600 mt-2 text-sm">Ambiguous naming, side effects, poor error handling</p>
                                    </div>
                                    <div className="p-6 bg-gray-900 rounded-b-2xl">
                                        <pre className="text-sm leading-relaxed overflow-x-auto text-gray-100 font-mono">
                                            <code dangerouslySetInnerHTML={{ __html: beforeCode }}></code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* After */}
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                                <div className="relative border-2 border-green-200 rounded-2xl bg-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                                    <div className="p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <h3 className="text-xl font-semibold text-green-700">After: Production Ready</h3>
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">AI Enhanced</span>
                                        </div>
                                        <p className="text-green-600 mt-2 text-sm">Clear purpose, type hints, proper returns, efficient</p>
                                    </div>
                                    <div className="p-6 bg-gray-900 rounded-b-2xl">
                                        <pre className="text-sm leading-relaxed overflow-x-auto text-gray-100 font-mono">
                                            <code dangerouslySetInnerHTML={{ __html: afterCode }}></code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '🔍',
                                    title: 'Deep Code Analysis',
                                    description: 'AI-powered static analysis that goes beyond syntax to understand intent and potential pitfalls.'
                                },
                                {
                                    icon: '⚡',
                                    title: 'Instant Feedback',
                                    description: 'Get comprehensive code reviews in seconds, not hours. Integrates seamlessly into your workflow.'
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Security First',
                                    description: 'Proactively identifies security vulnerabilities and suggests secure coding patterns.'
                                }
                            ].map((feature, index) => (
                                <div key={index} className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
                                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Code Quality?
                        </h2>
                        <p className="text-indigo-100 text-xl mb-8 max-w-2xl mx-auto">
                            Join thousands of developers shipping better code with AI assistance.
                        </p>
                        <button 
                            onClick={onNavigate}
                            className="bg-white text-indigo-600 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
                        >
                            <span>Start Reviewing for Free</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                        <p className="text-indigo-200 mt-4 text-sm">No credit card required • 14-day free trial</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="container mx-auto py-12 px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-6 lg:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">CodeGuardian AI</h2>
                                <p className="text-gray-600 text-sm">Intelligent Code Review</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">About</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">Documentation</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">Privacy</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">Terms</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">Contact</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                        <p className="text-gray-500">&copy; 2025 CodeGuardian AI. All rights reserved. Built with ❤️ for developers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}