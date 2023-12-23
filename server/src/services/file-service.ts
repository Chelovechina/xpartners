import fs from "fs/promises";
import path from "path";

class FileService {
  async saveFile(buffer: Buffer | undefined): Promise<string> {
    try {
      if (!buffer) {
        return "default-avatar.png";
      }

      const fileName = `avatar_${Date.now()}.jpeg`;
      const filePath = path.join(__dirname, "..", "static", fileName);
      await fs.writeFile(filePath, buffer);

      return fileName;
    } catch (error) {
      console.error("Ошибка при сохранении файла:", error);
      throw error;
    }
  }

  async replaceFile(
    buffer: Buffer | undefined,
    fileName: string
  ): Promise<string> {
    try {
      if (!buffer) return fileName;

      await fs.rm(path.join(__dirname, "..", "static", fileName));

      fileName = `avatar_${Date.now()}.jpeg`;
      const filePath = path.join(__dirname, "..", "static", fileName);
      await fs.writeFile(filePath, buffer);

      return fileName;
    } catch (error) {
      console.error("Ошибка при сохранении файла:", error);
      throw error;
    }
  }
}

export default new FileService();
