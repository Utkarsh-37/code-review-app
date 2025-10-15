import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { ReviewTool } from './pages/ReviewPage';
import { Toaster } from 'sonner';
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.page) {
        navigateToPage(event.state.page, false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initialize history state
    if (!window.history.state) {
      window.history.replaceState({ page: 'landing' }, '', '/');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToPage = (page, pushState = true) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      if (pushState) {
        window.history.pushState({ page }, '', page === 'landing' ? '/' : '/review');
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }, 300);
  };

  const navigateToReview = () => navigateToPage('reviewTool');
  const navigateToLanding = () => navigateToPage('landing');

  // Add keyboard shortcut support
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (currentPage === 'landing') {
          navigateToReview();
        } else {
          navigateToLanding();
        }
      }
      
      // Escape key to go back to landing from review tool
      if (event.key === 'Escape' && currentPage === 'reviewTool') {
        navigateToLanding();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  // Render transition overlay
  const renderTransitionOverlay = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900 transition-opacity duration-300 ${
      isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
          </div>
        </div>
        <p className="text-white mt-4 text-lg font-medium">
          {currentPage === 'landing' ? 'Loading Code Review Tool...' : 'Returning Home...'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Global Toaster */}
      <Toaster 
        position="top-center" 
        richColors 
        closeButton
        toastOptions={{
          className: 'font-sans',
          duration: 4000,
        }}
      />
      
      {/* Navigation Bar - Shows on Review Tool page */}
      {currentPage === 'reviewTool' && (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="max-w-8xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🤖</span>
                </div>
                <span className="text-white font-semibold">CodeGuardian AI</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={navigateToLanding}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 hover:bg-slate-700/50 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
                
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                  <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600">Esc</kbd>
                  <span>to home</span>
                  <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600">⌘K</kbd>
                  <span>to toggle</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Main Content */}
      <div className={currentPage === 'reviewTool' ? 'pt-16' : ''}>
        {currentPage === 'landing' ? (
          <LandingPage onNavigate={navigateToReview} />
        ) : (
          <ReviewTool />
        )}
      </div>
      
      {/* Transition Overlay */}
      {renderTransitionOverlay()}
      
      {/* Floating Action Button on Landing Page */}
      {currentPage === 'landing' && (
        <div className="fixed bottom-8 right-8 z-30">
          <button
            onClick={navigateToReview}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 font-semibold"
          >
            <span>🚀</span>
            <span className="hidden sm:block">Try Code Review</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

export default App;