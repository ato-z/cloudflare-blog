import { ModelImage, type Image } from '@zerg/model/Image';
const modelIamge = new ModelImage();

class ImageFind {
  protected waitResult = new Map<number, (img: Image) => void>();
  protected inquireTime: NodeJS.Timeout;

  getById(id: unknown) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      return Promise.resolve(null);
    }

    const { waitResult } = this;
    const result = new Promise(resolve => {
      const queryId = typeof id === 'string' ? parseInt(id) : id;
      waitResult.set(queryId, resolve);
    });

    this.inquire();

    return result;
  }

  private inquire() {
    const { waitResult } = this;
    clearTimeout(this.inquireTime);
    this.inquireTime = setTimeout(async () => {
      const ids: Array<string | number> = [];
      const keys = waitResult.keys();
      for (const key of keys) {
        ids.push(key);
      }

      const codeList = await modelIamge.select({
        where: { and: { id: ['IN', ids] } },
      });
      const list = codeList.list;
      list.forEach(img => {
        const resolve = waitResult.get(img.id);
        if (resolve !== undefined) {
          resolve(img);
        }
      });
    }, 3);
  }
}

export const imageFind = new ImageFind();
