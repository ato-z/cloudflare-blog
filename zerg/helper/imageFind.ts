import { ModelImage, type Image } from '@zerg/model/Image';
const modelIamge = new ModelImage();

class ImageFind {
  static map = new Map<string, Image>();

  async getById(id: unknown) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      return Promise.resolve(null);
    }

    const strID = id.toString();
    if (!ImageFind.map.has(strID)) {
      const img = await modelIamge.find(strID);
      if (img === null) return null;
      ImageFind.map.set(strID, img);
    }

    return ImageFind.map.get(strID) ?? null;
  }
}

export const imageFind = new ImageFind();
