type ServerErrorDictionary = { [key: string]: number };

export const ServerErrorDictionary: ServerErrorDictionary = {
  NAME_ALREADY_EXISTS: 1001,
  PHONE_ALREADY_EXISTS: 1002,
  EMAIL_ALREADY_EXISTS: 1003,

  WRONG_ENUM: 1020,
  WRONG_CONFIRMATION_CODE: 1021,
  WRONG_PASSWORD: 1022,

  IS_CONFIRMATION_CODE_TOO_SOON: 1040,

  NO_REGISTER_TOKEN: 1060,
  NO_PASSWORD_RESTORATION_TOKEN: 1061,
  NO_TOKEN: 1062,

  USER_NOT_FOUND: 1080,
  EMAIL_NOT_FOUND: 1081,
};

const errorValues: Array<number> = Object.values(ServerErrorDictionary);
const errorKeys: Array<string> = Object.keys(ServerErrorDictionary);

export const detectError = (error: any) => {
  if (typeof error?.message === 'string') {
    const foundError = errorValues.find((i) => error.message.includes(i));
    const key =
      foundError &&
      errorKeys.find((i: string) => {
        return ServerErrorDictionary[i] === foundError;
      });
    const { $i18n } = useNuxtApp();

    return foundError ? $i18n.t(`server_error_messages.${key}`) : error.message;
  }

  if (Array.isArray(error?.message)) {
    return error?.message[0];
  }

  return error;
};
