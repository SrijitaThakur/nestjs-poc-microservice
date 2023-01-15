import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { catchError, Observable, tap } from 'rxjs';
  import { AUTH_SERVICE } from './services';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const authentication = this.getAuthentication(context);
      return this.authClient //send request to rmq service and wait for response back
        .send('validate_user', {
          Authentication: authentication,
        })
        .pipe(
          tap((res) => { //tap allows us to add sideeffects to our call
            this.addUser(res, context);
          }),
          catchError(() => {
            throw new UnauthorizedException();
          }),
        );
    }
  
    private getAuthentication(context: ExecutionContext) {
      let authentication: string;
      if (context.getType() === 'rpc') { //if we are communicating over rabbitmq
        authentication = context.switchToRpc().getData().Authentication;
      } else if (context.getType() === 'http') {
        authentication = context.switchToHttp().getRequest()
          .cookies?.Authentication;
      }
      if (!authentication) {
        throw new UnauthorizedException(
          'No value was provided for Authentication',
        );
      }
      return authentication;
    }
  
    private addUser(user: any, context: ExecutionContext) {
      if (context.getType() === 'rpc') {
        context.switchToRpc().getData().user = user;
      } else if (context.getType() === 'http') {
        context.switchToHttp().getRequest().user = user;
      }
    }
  }
  