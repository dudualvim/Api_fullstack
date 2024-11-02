interface DecodedToken {
    role: string;
    email: string;
    exp: number;
  }
  
  export function decodeJWT(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Formato de Token Invalido');
      }
  
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
  
      const decoded = JSON.parse(jsonPayload);
      console.log('Decoded payload:', decoded); // Debug
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar o Token", error);
      return null;
    }
  }