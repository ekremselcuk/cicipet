
/**
 * Simulates an AI Image Analysis service.
 * In a real application, you would replace this with calls to:
 * - Google Cloud Vision API
 * - AWS Rekognition
 * - Azure Computer Vision
 * 
 * Checks for:
 * 1. Is it an animal? (Detect labels)
 * 2. Is it safe? (SafeSearch detection)
 */
export async function analyzeImage(file: File): Promise<{ valid: boolean; reason?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock Validation Logic:
    // For demo purposes, we accept everything unless the filename contains 'fail'
    // or 'nsfw'.

    const name = file.name.toLowerCase();

    if (name.includes('nsfw')) {
        return { valid: false, reason: "Görsel uygunsuz içerik barındırıyor olabilir. (NSFW)" };
    }

    if (name.includes('fail')) {
        return { valid: false, reason: "Görselde bir evcil hayvan tespit edilemedi." };
    }

    // Default Success
    return { valid: true };
}
