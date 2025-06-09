interface HealthStatus {
    status: string;
 }
  
export class AppService {
 getHealth(): HealthStatus[] {
    return [{ status: 'pong' }];
    }
}