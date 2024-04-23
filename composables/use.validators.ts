import { isEmpty, isEmptyArray, isNullOrUndefined } from '@spaps/utils';

export const useValidators = () => {
  const $i18n: any = useI18n();

  // NOTE: Required Validator
  const requiredValidator = (value: unknown) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
      return $i18n.t('validation_error_messages.this_field_is_required');

    return (
      !!String(value).trim().length ||
      $i18n.t('validation_error_messages.this_field_is_required')
    );
  };

  // NOTE: Email Validator
  const emailValidator = (value: unknown) => {
    if (isEmpty(value)) return true;

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Array.isArray(value))
      return (
        value.every((val) => re.test(String(val))) ||
        $i18n.t('validation_error_messages.must_be_valid_email')
      );

    return (
      re.test(String(value)) ||
      $i18n.t('validation_error_messages.must_be_valid_email')
    );
  };

  // NOTE: Password Validator
  const passwordValidator = (password: string) => {
    const regExp = /^.{8,}$/;

    const validPassword = regExp.test(password);

    return (
      // eslint-disable-next-line operator-linebreak
      validPassword ||
      $i18n.t('validation_error_messages.password_requirements')
    );
  };

  // NOTE: Length Validator
  const minLengthValidator = (
    value: unknown,
    length: number,
    type = 'string'
  ) => {
    if (isEmpty(value)) return true;

    let check;
    if (type === 'string') check = String(value).length >= length;
    if (type === 'number') check = +value >= length;

    return (
      check ||
      $i18n.t('validation_error_messages.min_length_must_be', { length })
    );
  };

  // NOTE: Length Validator
  const maxLengthValidator = (
    value: unknown,
    length: number,
    type = 'string'
  ) => {
    if (isEmpty(value)) return true;
    let check;
    if (type === 'string') check = String(value).length <= length;
    if (type === 'number') check = +value <= length;
    return (
      check ||
      $i18n.t('validation_error_messages.max_length_must_be', { length })
    );
  };

  return {
    requiredValidator,
    emailValidator,
    passwordValidator,
    minLengthValidator,
    maxLengthValidator,
  };
};
