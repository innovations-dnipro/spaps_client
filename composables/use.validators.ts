import { isValidPhoneNumber } from 'libphonenumber-js';
import { isEmpty, isEmptyArray, isNullOrUndefined } from '@spaps/utils';

export const useValidators = () => {
  const $i18n: any = useI18n();

  // NOTE: Alpha Validator
  const alphaValidator = (value: unknown) => {
    if (isEmpty(value)) return true;

    return (
      /^[A-Z]*$/i.test(String(value)) ||
      $i18n.t('validation_error_messages.only_alphabetic_characters')
    );
  };

  // NOTE: Confirm Password Validator
  const confirmedValidator = (value: string, target: string) =>
    value === target ||
    $i18n.t('validation_error_messages.password_confirmation_not_match');

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

  //NOTE: File size validator
  const fileSizeValidator = (fileData: File | File[], size: number) => {
    const isArray = Array.isArray(fileData);
    const mbSize = size / 1000000;

    if (isArray) {
      const wrongSizeFile: File | undefined = (fileData as File[]).find(
        (item: File) => {
          return item?.size > size;
        }
      );

      return (
        !wrongSizeFile ||
        $i18n.t('validation_error_messages.fileSizeMaxInArray', {
          size: mbSize,
          name: wrongSizeFile.name,
        })
      );
    }

    const fileSize: number = fileData?.size;

    return (
      size >= fileSize ||
      $i18n.t('validation_error_messages.fileSizeMax', { size: mbSize })
    );
  };

  //NOTE: File type validator
  const fileTypeValidator = (fileData: File | File[], types: string[]) => {
    const isArray = Array.isArray(fileData);
    const typesString: string = types.join(', ');

    if (isArray) {
      const wrongTypeFile: File | undefined = (fileData as File[]).find(
        (item: File) => {
          return !(types || []).includes(item.type);
        }
      );

      return (
        !wrongTypeFile ||
        $i18n.t('validation_error_messages.fileTypeInArray', {
          types: typesString,
          name: wrongTypeFile.name,
        })
      );
    }

    return (
      (types || []).includes(fileData?.type) ||
      $i18n.t('validation_error_messages.fileType', { types: typesString })
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

  // NOTE: Name Validator
  const nameValidator = (value: unknown) => {
    if (isEmpty(value)) return true;

    return (
      /^[A-ZАБВГҐДЕЁЄЭЖЗІЇИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЮЯ'-]*$/i.test(String(value)) ||
      $i18n.t('validation_error_messages.only_alphabetic_characters')
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

  // NOTE: Phone Validator
  const phoneValidator = (phoneNumber: string) => {
    return (
      isValidPhoneNumber(`+380${phoneNumber}`, 'UA') ||
      $i18n.t('validation_error_messages.must_be_valid_phone_number')
    );
  };

  // NOTE: Required Validator
  const requiredValidator = (value: unknown) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
      return $i18n.t('validation_error_messages.this_field_is_required');

    return (
      !!String(value).trim().length ||
      $i18n.t('validation_error_messages.this_field_is_required')
    );
  };

  const minValidator = (count: number) => {
    return (value: number) => {
      if (value === undefined || value === null) return;
      return (
        Number(value) >= count ||
        $i18n.t('validation_error_messages.min', { count })
      );
    };
  };

  const maxValidator = (count: number) => {
    return (value: number) => {
      if (value === undefined || value === null) return;
      return (
        Number(value) <= count ||
        $i18n.t('validation_error_messages.max', { count })
      );
    };
  };

  return {
    alphaValidator,
    confirmedValidator,
    emailValidator,
    fileSizeValidator,
    fileTypeValidator,
    minLengthValidator,
    maxLengthValidator,
    nameValidator,
    passwordValidator,
    phoneValidator,
    requiredValidator,
    minValidator,
    maxValidator,
  };
};
