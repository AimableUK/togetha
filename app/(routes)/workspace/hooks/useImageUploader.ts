import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderConfig {
    fileId: string;
    teamId: string;
    userEmail: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const RECOMMENDED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const useImageUploader = (config: UploaderConfig) => {
    const getDimensions = async (source: string | File): Promise<{ width: number; height: number }> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = () => {
                resolve({ width: 0, height: 0 });
            };

            if (source instanceof File) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(source);
            } else {
                img.src = source;
            }
        });
    };

    return {
        uploadByFile: async (file: File) => {
            try {
                // Validate file size only
                if (file.size > MAX_FILE_SIZE) {
                    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                    return {
                        success: 0,
                        error: `Image size must be less than 1MB. Your image is ${sizeMB}MB`,
                    };
                }

                // Warn about file type but allow it
                if (!RECOMMENDED_TYPES.includes(file.type)) {
                    // Show toast warning (we'll handle this in the component)
                    toast.warning(`Warning: ${file.type} files may not be downloadable in DOCX format. Use JPEG or PNG for best results.`);
                }

                // Convert file to base64 data URL
                const reader = new FileReader();
                const base64Promise = new Promise<string>((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => reject(reader.error);
                });
                reader.readAsDataURL(file);
                const base64Url = await base64Promise;

                // Get dimensions
                const { width, height } = await getDimensions(base64Url);

                // Generate a unique ID for this image
                const imageId = uuidv4();

                return {
                    success: 1,
                    file: {
                        url: base64Url,
                        width,
                        height,
                        imageId,
                        fileType: file.type, // Include file type for later use
                    },
                };
            } catch (error) {
                console.error("File upload error:", error);
                return {
                    success: 0,
                    error: "Failed to upload image",
                };
            }
        },

        uploadByUrl: async (url: string) => {
            try {
                // Get dimensions
                const { width, height } = await getDimensions(url);

                // Generate a unique ID for this image
                const imageId = uuidv4();

                return {
                    success: 1,
                    file: {
                        url,
                        width,
                        height,
                        imageId,
                    },
                };
            } catch (error) {
                console.error("URL upload error:", error);
                return {
                    success: 0,
                    error: "Failed to process URL",
                };
            }
        },
    };
};
