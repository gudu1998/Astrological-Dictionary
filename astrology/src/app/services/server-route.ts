// LOCAL
const BASE_URL = 'http://localhost:5001/api/v1';

export const ROUTES = {
  ASTROLOGICAL_TERM: `${BASE_URL}` + '/astrology/{letter}',
  DREAM_TERM: `${BASE_URL}` + '/dream/{letter}',
  ASTROLOGICAL_DICTIONARY: `${BASE_URL}` + '/admin/astrological-dictionary',
  ADD_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/save',
  DELETE_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/delete',
  EDIT_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/edit',
  DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary',
  ADD_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/save',
  DELETE_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/delete',
  EDIT_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/edit',
  ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign',
  ADD_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/save',
  DELETE_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/delete',
  EDIT_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/edit',
  SIGNIN: `${BASE_URL}` + '/signin',
};
