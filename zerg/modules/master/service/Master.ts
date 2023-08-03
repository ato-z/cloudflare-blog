import { Master, ModelMaster } from '@zerg/model/Master';
import { MasterEditDto } from '../dto/Edit';
import { MasterRePasswordDto } from '../dto/RePassword';
import { ExceptionParam } from '@zerg/exception';
import { ServiceSign } from '@zerg/service/Sign';
import { ExceptionMissMaster } from '@zerg/exception/accredit';

export class ServiceMaster {
  protected modelMaster = new ModelMaster();

  async one(id: string | number) {
    const master = await this.modelMaster.find(id);
    if (master === null) {
      throw new ExceptionMissMaster();
    }

    return master;
  }

  /**
   * 编辑管理员信息
   */
  async edit(post: MasterEditDto, id: string | number) {
    const { modelMaster } = this;
    await modelMaster.update(post, { where: { and: { id } } });
  }

  /**
   * 重置密码
   */
  async rePass(post: MasterRePasswordDto, master: Master) {
    const newMaster = (await this.modelMaster.find(master.id))!;
    if (post.password !== post.rePassword) {
      throw new ExceptionParam('两次密码不一致');
    }

    const codePassword = ServiceSign.codePassword(
      newMaster.name,
      post.oldPassword,
    );
    if (codePassword !== newMaster.password) {
      throw new ExceptionParam('旧密码不正确');
    }

    const { modelMaster } = this;
    const newPassword = ServiceSign.codePassword(newMaster.name, post.password);
    await modelMaster.update(
      {
        password: newPassword,
      },
      { where: { and: { id: newMaster.id } } },
    );
  }
}
