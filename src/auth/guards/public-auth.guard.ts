import {
  Injectable,
  Scope,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable({ scope: Scope.REQUEST })
export class PublicAuthGuard implements CanActivate {
  private static _this: PublicAuthGuard

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    return this.validateRequest(request)
  }

  private storeToken: string

  public static getStoreToken(): string {
    return PublicAuthGuard._this.storeToken
  }

  async validateRequest(request: any): Promise<boolean> {
    const storeToken = request.params.storeToken
    PublicAuthGuard._this.storeToken = storeToken
    try {
      return true
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
