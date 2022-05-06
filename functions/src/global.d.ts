interface ContactCommon {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

interface ContactAlvillantas extends ContactCommon {
  nationality?: string;
}
