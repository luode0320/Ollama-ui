export function getSelectedModel(): string {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('selectedModel');
      return storedModel || '没有可用的型号';
    } else {
      // Default model
      return '没有可用的型号';
    }
  }