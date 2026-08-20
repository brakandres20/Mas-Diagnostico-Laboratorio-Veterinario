import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-navy text-white p-6">
          <div className="text-center max-w-md">
            <h1 className="text-xl font-bold mb-2">Algo salió mal</h1>
            <p className="text-sm text-gray-mid mb-6">
              Ocurrió un error inesperado. Recarga la página o intenta de nuevo.
            </p>
            <a
              href="/"
              className="inline-flex px-6 py-3 rounded-full font-semibold text-navy bg-gradient-to-br from-teal to-green"
            >
              Recargar página
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}