import * as tf from '@tensorflow/tfjs';
import * as nsfwjs from 'nsfwjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

// Models cache
let nsfwModel: nsfwjs.NSFWJS | null = null;
let cocoModel: cocoSsd.ObjectDetection | null = null;

const VALID_PETS = ['cat', 'dog', 'bird', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'];

export async function analyzeImage(file: File): Promise<{ valid: boolean; reason?: string }> {
    try {
        // Load models if not loaded
        if (!nsfwModel) {
            nsfwModel = await nsfwjs.load(); // Load from default CDN
        }
        if (!cocoModel) {
            cocoModel = await cocoSsd.load(); // Load from default CDN
        }

        // Create HTMLImageElement from file
        const img = document.createElement('img');
        const objectUrl = URL.createObjectURL(file);

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = objectUrl;
        });

        // 1. NSFW Check
        const predictions = await nsfwModel.classify(img);
        // Classes: 'Drawing', 'Hentai', 'Neutral', 'Porn', 'Sexy'
        const pornProb = predictions.find(p => p.className === 'Porn')?.probability || 0;
        const hentaiProb = predictions.find(p => p.className === 'Hentai')?.probability || 0;
        const sexyProb = predictions.find(p => p.className === 'Sexy')?.probability || 0;

        if (pornProb > 0.4 || hentaiProb > 0.4 || sexyProb > 0.6) {
            URL.revokeObjectURL(objectUrl);
            return { valid: false, reason: 'Görsel uygunsuz içerik (NSFW) barındırıyor olabilir. Lütfen başka bir fotoğraf seçin.' };
        }

        // 2. Pet Detection
        const detectedObjects = await cocoModel.detect(img);
        const hasPet = detectedObjects.some(obj => VALID_PETS.includes(obj.class));

        URL.revokeObjectURL(objectUrl);

        if (!hasPet) {
            return { valid: false, reason: 'Görselde belirgin bir evcil hayvan tespit edilemedi. Lütfen hayvanın net göründüğü bir fotoğraf yükleyin.' };
        }

        return { valid: true };

    } catch (error) {
        console.error('AI Analysis Error:', error);
        // Fail open to avoid blocking users on browser error
        return { valid: true };
    }
}
