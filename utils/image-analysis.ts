export const analyzeImage = async (file: File) => {
    return new Promise<{ valid: boolean; reason?: string }>((resolve) => {
        setTimeout(() => {
            // Mock Checking Logic
            // In a real app, this would call Google Cloud Vision, AWS Rekognition, or OpenAI Vision API

            const fileName = file.name.toLowerCase();

            // Simulate NSFW Rejection
            if (fileName.includes('nsfw') || fileName.includes('uygunsuz')) {
                resolve({ valid: false, reason: 'Görsel topluluk kurallarına aykırı veya uygunsuz içerik barındırıyor olabilir.' });
                return;
            }

            // Simulate "No Pet" Rejection (e.g. if the file is named "landscape")
            if (fileName.includes('manzara') || fileName.includes('araba') || fileName.includes('ev')) {
                resolve({ valid: false, reason: 'Görselde belirgin bir evcil hayvan tespit edilemedi. Lütfen petinizin net göründüğü bir fotoğraf yükleyiniz.' });
                return;
            }

            // Success
            resolve({ valid: true });
        }, 2500); // 2.5s simulated delay
    });
};
