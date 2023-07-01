import { ModelPasserby, Passerby } from '@zerg/model/passerby';
import { PasserbyPageDto } from '../dto/PasserbyPage';
import { ServicePage } from '@zerg/service/Page';
import { PasserbyIpPageDto } from '../dto/PasserbyIpPage';
import { ModelPasserbyIp, PasserbyIp } from '@zerg/model/passerbyIp';

export class ServicePasserby {
  async list(page: PasserbyPageDto) {
    const model = new ModelPasserby();

    const query = {};
    if (page.lastIp) {
      Reflect.set(query, 'lastIp', page.lastIp);
    }
    if (page.nickname) {
      Reflect.set(query, 'nickname', [
        'LIKE',
        `%${decodeURIComponent(page.nickname)}%`,
      ]);
    }
    if (page.email) {
      Reflect.set(query, 'email', [
        'LIKE',
        `%${decodeURIComponent(page.email)}%`,
      ]);
    }

    const whereAnd = Object.keys(query).length ? query : undefined;
    const servicePage = new ServicePage<Passerby>(model, { and: whereAnd });
    return servicePage.list(page);
  }

  async ips(page: PasserbyIpPageDto) {
    const model = new ModelPasserbyIp();

    const query = {};
    if (page.ip) {
      Reflect.set(query, 'ip', page.ip);
    }
    if (page.from) {
      Reflect.set(query, 'from', page.from);
    }
    if (page.total) {
      Reflect.set(query, 'total', ['>=', page.total]);
    }

    const whereAnd = Object.keys(query).length ? query : undefined;
    const servicePage = new ServicePage<PasserbyIp>(model, { and: whereAnd });
    return servicePage.list(page);
  }
}
