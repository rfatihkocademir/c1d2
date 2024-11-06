// src/services/errorLogger.js
export const logError = (error) => {
    // Hata detaylarını konsola loglama
    console.error('Error Details:', error);

    // Daha gelişmiş loglama yapmak isterseniz, burada dosyaya yazma veya bir hataları izleme servisine gönderebilirsiniz.
};

export const displayErrorMessage = (error) => {
    // Anlamlı hata mesajları döndürme
    if (error.response) {
        // Sunucu yanıtı ile ilgili hata
        return `Server responded with status ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
        // İstek gönderildi ancak yanıt alınamadı
        return 'No response received from the server.';
    } else {
        // Başka tür bir hata
        return `Unexpected error: ${error.message}`;
    }
};
