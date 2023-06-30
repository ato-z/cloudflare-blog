import { PageParamDto } from '@zerg/dto';
import { ModelException } from '@zerg/model/Exception';
import { ServicePage } from '@zerg/service/Page';

export class ServiceException {
  async list(page: PageParamDto) {
    const model = new ModelException();
    const servicePage = new ServicePage<any>(model, {});

    return servicePage.list(page, ['*']);
  }
}
