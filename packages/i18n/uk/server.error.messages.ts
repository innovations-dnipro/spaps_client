export const server_error_messages = {
  UNAUTHORIZED: 'Неавторизований запит.',
  NAME_ALREADY_EXISTS: 'Елемент із такою назвою вже існує.',
  PHONE_ALREADY_EXISTS: 'Елемент із цим телефоном уже існує.',
  EMAIL_ALREADY_EXISTS: 'Елемент із цією електронною адресою вже існує.',
  WRONG_ENUM: 'Неправильне значення enum',
  WRONG_CONFIRMATION_CODE:
    'Код підтвердження неправильний або термін дії минув.',
  WRONG_PASSWORD: 'Неправильний пароль.',
  IS_CONFIRMATION_CODE_TOO_SOON:
    'Запит на створення нового коду підтвердження надійшов зарано. Зачекайте одну хвилину з моменту останнього створення коду.',
  NO_REGISTER_TOKEN: 'Немає токена реєстрації.',
  NO_PASSWORD_RESTORATION_TOKEN: 'Немає токена відновлення пароля.',
  NO_TOKEN: 'У файлах cookie немає токена. Ніхто не авторизований.',
  USER_NOT_FOUND: 'Користувача не знайдено',
  EMAIL_NOT_FOUND: 'Електронна пошта не знайдена',
};
