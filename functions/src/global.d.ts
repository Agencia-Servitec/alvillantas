interface ContactCommon {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

interface ContactAlvillantas extends ContactCommon {
  issue?: string;
  status?: string;
  nationality?: string;
}
