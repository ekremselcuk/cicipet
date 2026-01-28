
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock Validation Logic:
    const name = file.name.toLowerCase();

    // 1. Check for NSFW (Simulation)
    // If filename contains 'nsfw', 'adult', 'explicit', reject.
    if (name.match(/(nsfw|adult|explicit|xxx)/)) {
        return { valid: false, reason: "Görsel güvenlik kurallarına uymuyor (NSFW Tespiti)." };
    }

    // 2. Check for Pet (Simulation)
    // If filename contains 'fail', 'car', 'building', reject.
    if (name.match(/(fail|car|building|object|man|woman|human)/)) {
        return { valid: false, reason: "Görselde evcil hayvan tespit edilemedi. Lütfen net bir hayvan fotoğrafı yükleyin." };
    }

    // Default Success
    return { valid: true };
}
