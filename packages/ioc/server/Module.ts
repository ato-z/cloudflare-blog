/* eslint-disable @typescript-eslint/naming-convention */
import { type Context } from './Context';
type RouteFn = (ctx?: Context) => unknown;
type Methods =
  | 'GET'
  | 'POST'
  | 'HEAD'
  | 'OPTIONS'
  | 'DELETE'
  | 'PUT'
  | 'TRACE'
  | 'PATCH';
type RuleList = Array<readonly [Methods, string, RouteFn]>;
/** 装饰器方法  */
const groupName = '__Group@prefix';
const ruleName = '__Rule@any';

const vers =
  (method: Methods) =>
  (route: string) =>
  <T extends object>(target: T, propertyKey: keyof T) => {
    const routeString = route.replace(/^\/+|\/+$/g, '');
    const handle = target[propertyKey] as RouteFn;
    const ruleList = Reflect.get(target, ruleName) as RuleList | undefined;
    if (ruleList) {
      ruleList.push([method, routeString, handle]);
    } else {
      Reflect.set(target, ruleName, [[method, routeString, handle]]);
    }
  };

export const Controller =
  (prefix: string) =>
  <T extends new () => unknown>(target: T) => {
    const prefixString = prefix.replace(/^\/+|\/+$/g, '');
    Reflect.set(target, groupName, prefixString);
  };

export const GET = vers('GET');
export const POST = vers('POST');
export const PUT = vers('PUT');
export const TRACE = vers('TRACE');
export const DELETE = vers('DELETE');
export const HEAD = vers('HEAD');
export const OPTIONS = vers('OPTIONS');
export const PATCH = vers('PATCH');

export class Module<T extends new () => unknown> {
  protected prefix: string;
  protected controller: T[] = [];
  protected routerMap = new Map<string, RouteFn>();
  constructor(
    option: { prefix?: string; controller?: T[] } = { controller: [] },
  ) {
    const { prefix, controller } = option;
    this.prefix = (prefix ?? '').replace(/^\/+|\/+$/g, '');
    this.controller = controller!;
    this.instancLoader();
  }

  install() {
    const { routerMap } = this;
    return async (ctx: Context, next: () => unknown) => {
      const { url, method } = await ctx.toProp();
      const fullRoute = `${method}@${url}`;
      if (routerMap.has(fullRoute)) {
        const handle = routerMap.get(fullRoute)!;
        const result = await handle(ctx);
        return result;
      }

      const result = await next();
      return result;
    };
  }

  private instancLoader() {
    const { controller, prefix, routerMap } = this;
    controller.forEach(_class => {
      this.loaderEach(prefix, _class, routerMap);
    });
  }

  private loaderEach(
    prefix: string,
    constructor: T,
    routerMap: Map<string, RouteFn>,
  ) {
    const groupPrefix = Reflect.get(constructor, groupName) as string;
    const instanc = new constructor();
    const ruleList = (Reflect.get(
      instanc as Record<string, unknown>,
      ruleName,
    ) ?? []) as RuleList;
    ruleList.forEach(rule => {
      const [method, route, handle] = rule;
      const fullRoute = `${method}@/${prefix}/${groupPrefix}/${route}`;
      routerMap.set(fullRoute, handle);
    });
  }
}
