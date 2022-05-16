interface ContactCommon {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

interface ContactAlvillantas extends ContactCommon {
  hostname?: string | null;
  issue?: string;
  status?: string;
  nationality?: string;
}
