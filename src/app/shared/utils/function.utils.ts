export class FunctionUtils {
  static generateFakeToken(username: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({ sub: username, exp: Date.now() + 1000 * 60 * 60 })
    );
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }
}
