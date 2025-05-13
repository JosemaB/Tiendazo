export class FunctionUtils {
  static login(usuario: any) {
    localStorage.setItem("accessToken", usuario.accessToken);
    localStorage.setItem("refreshToken", usuario.refreshToken);
    localStorage.setItem("user", JSON.stringify({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      gender: usuario.gender,
      image: usuario.image
    }));
  }
  static generateFakeToken(username: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({ sub: username, exp: Date.now() + 1000 * 60 * 60 })
    );
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }
}
