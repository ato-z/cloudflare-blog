/**
 * 文章&小计的标签
 */
export class ServiceTags {
  /**
   * 标签去重
   */
  static deDuplication(tags: string) {
    const tagLikeArray = new Set(tags.split(',').filter(i => i));
    const taglist = [...tagLikeArray];
    return `,${taglist.join(',')},`;
  }
}
