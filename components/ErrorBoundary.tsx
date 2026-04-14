import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Activity, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Standard React ErrorBoundary implementation.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Update state when an error is caught in the subtree.
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  // Lifecycle method to handle side effects of an error (e.g. logging).
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] h-full flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden animate-in fade-in zoom-in duration-300 my-8 hover-card">
            {/* Header */}
            <div className="bg-red-50 p-6 flex flex-col items-center border-b border-red-200">
              <div className="p-3 bg-red-50 text-fintech-coral rounded-full mb-4 shadow-sm">
                <AlertTriangle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-fintech-charcoal text-center">Beklenmeyen Bir Hata Oluştu</h2>
              <p className="text-fintech-coral text-sm mt-2 text-center">
                Sistem bir sorunla karşılaştı ve işlemi tamamlayamadı.
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
                   <Activity size={16} /> Teknik Detay
                </div>
                <code className="text-xs text-gray-500 font-mono break-words block bg-white p-2 rounded border border-gray-200 max-h-32 overflow-y-auto">
                  {this.state.error?.message || 'Bilinmeyen Hata'}
                </code>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={this.handleReload}
                  className="w-full py-3 px-4 bg-fintech-coral hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw size={18} />
                  Sayfayı Yenile
                </button>
                
                <button
                  onClick={this.handleHome}
                  className="w-full py-3 px-4 bg-white hover:bg-white text-gray-700 border border-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Ana Sayfaya Dön
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-400">
                Sorun devam ederse lütfen sistem yöneticisi ile iletişime geçin.
                <br/>
                Hata Kodu: SEGRİ-RUNTIME-ERR
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
